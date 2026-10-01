import {
  type CategoryId,
  type GovernmentService,
  type IncomeTier,
  type Jurisdiction,
  type ProvinceCode,
} from "@/data/mockServices";

export interface HouseholdProfile {
  province: ProvinceCode;
  municipality: string;
  incomeTier: IncomeTier;
  children: number;
  jurisdictions: Jurisdiction[];
}

export const defaultProfile: HouseholdProfile = {
  province: "ON",
  municipality: "",
  incomeTier: "all",
  children: 1,
  jurisdictions: ["FEDERAL", "PROVINCIAL", "MUNICIPAL"],
};

export function filterServices(
  services: GovernmentService[],
  profile: HouseholdProfile,
  category?: CategoryId,
  search = "",
): GovernmentService[] {
  const query = search.trim().toLowerCase();

  return services.filter((service) => {
    if (category && service.category !== category) return false;
    if (!profile.jurisdictions.includes(service.jurisdiction)) return false;
    if (service.jurisdiction === "PROVINCIAL" && service.regionCode !== profile.province) return false;
    if (service.jurisdiction === "MUNICIPAL" && service.regionCode !== profile.municipality) return false;
    if (profile.incomeTier !== "all" && service.incomeTiers && !service.incomeTiers.includes(profile.incomeTier)) return false;
    if (service.minChildren && profile.children < service.minChildren) return false;
    if (!query) return true;
    return [service.title, service.summary, service.regionCode, ...service.eligibilityCriteria]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });
}

export const jurisdictionLabel: Record<Jurisdiction, string> = {
  FEDERAL: "Federal",
  PROVINCIAL: "Provincial",
  MUNICIPAL: "Municipal",
};
