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
  municipality: "Ottawa",
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
    // A coarse income tier cannot establish an official threshold. Keep the service visible.
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
