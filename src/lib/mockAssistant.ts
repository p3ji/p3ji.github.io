import { lifeEventCategories, mockServices, provinces, type CategoryId, type ProvinceCode } from "@/data/mockServices";
import { filterServices, type HouseholdProfile } from "@/lib/serviceFilters";

export interface MockAssistantReply {
  text: string;
  serviceIds: string[];
  profilePatch: Partial<HouseholdProfile>;
}

/** Scripted demo logic. Replace with reviewed retrieval and citation checks in a later phase. */
export function getMockAssistantReply(question: string, profile: HouseholdProfile): MockAssistantReply {
  const normalized = question.toLowerCase();
  const province = provinces.find((item) => normalized.includes(item.name.toLowerCase()) || new RegExp(`\\b${item.code.toLowerCase()}\\b`).test(normalized));
  const city = normalized.includes("ottawa") ? "Ottawa" : normalized.includes("toronto") ? "Toronto" : normalized.includes("calgary") ? "Calgary" : undefined;
  const inferredProvince: ProvinceCode | undefined = city === "Ottawa" || city === "Toronto" ? "ON" : city === "Calgary" ? "AB" : province?.code;
  const provinceChanged = inferredProvince && inferredProvince !== profile.province;
  const profilePatch: Partial<HouseholdProfile> = {
    ...(inferredProvince ? { province: inferredProvince } : {}),
    ...(city ? { municipality: city } : provinceChanged ? { municipality: "" } : {}),
    ...(normalized.includes("low income") || normalized.includes("lower income") ? { incomeTier: "low" as const } : {}),
    ...(normalized.includes("middle income") ? { incomeTier: "middle" as const } : {}),
    ...(normalized.includes("high income") || normalized.includes("higher income") ? { incomeTier: "high" as const } : {}),
    ...(normalized.includes("first child") || normalized.includes("first baby") ? { children: 1 } : {}),
  };

  const category: CategoryId = normalized.includes("job") || normalized.includes("laid off") || normalized.includes("retrain")
    ? "job-loss"
    : normalized.includes("business") || normalized.includes("company")
      ? "starting-a-business"
      : "having-a-baby";
  const effectiveProfile = { ...profile, ...profilePatch };
  const services = filterServices(mockServices, effectiveProfile, category).slice(0, 5);
  const eventName = lifeEventCategories.find((event) => event.id === category)?.title.toLowerCase() ?? "this life event";
  const place = city ?? province?.name ?? provinces.find((item) => item.code === effectiveProfile.province)?.name ?? "your area";

  if (services.length === 0) {
    return {
      text: `I couldn't find a match for ${eventName} with the selected filters in ${place}. Try another province, income range, or government level. This demo only includes a small set of programs.`,
      serviceIds: [],
      profilePatch,
    };
  }

  const followUp = " Income and other details may affect eligibility; review each program's criteria on its official page.";

  return {
    text: `For ${eventName} in ${place}, these ${services.length} listed services may be relevant.${followUp} This is a scripted guide, not an eligibility decision.`,
    serviceIds: services.map((service) => service.id),
    profilePatch,
  };
}
