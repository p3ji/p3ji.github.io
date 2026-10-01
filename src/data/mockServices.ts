export type Jurisdiction = "FEDERAL" | "PROVINCIAL" | "MUNICIPAL";
export type IncomeTier = "all" | "low" | "middle" | "high";
export type CategoryId = "having-a-baby" | "job-loss" | "starting-a-business";
export type ProvinceCode = "ON" | "AB" | "BC" | "QC" | "NS" | "NB" | "MB" | "SK" | "NL" | "PE" | "YT" | "NT" | "NU";

export interface GovernmentService {
  id: string;
  title: string;
  jurisdiction: Jurisdiction;
  regionCode: string;
  category: CategoryId;
  summary: string;
  estimatedBenefit: string;
  officialUrl: string;
  eligibilityCriteria: string[];
  /** Local demo matching only; final eligibility is decided by the program administrator. */
  incomeTiers?: Exclude<IncomeTier, "all">[];
  minChildren?: number;
  applicationNote?: string;
}

export interface LifeEventCategory {
  id: CategoryId;
  title: string;
  description: string;
  icon: "baby" | "briefcase" | "store";
  accent: string;
}

export const lifeEventCategories: LifeEventCategory[] = [
  {
    id: "having-a-baby",
    title: "Having a baby",
    description: "Benefits, leave and local family support in one place.",
    icon: "baby",
    accent: "peach",
  },
  {
    id: "job-loss",
    title: "Job loss & retraining",
    description: "Income support and a path toward your next role.",
    icon: "briefcase",
    accent: "blue",
  },
  {
    id: "starting-a-business",
    title: "Starting a business",
    description: "Registration and programs to help you get started.",
    icon: "store",
    accent: "mint",
  },
];

export const provinces: { code: ProvinceCode; name: string }[] = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon" },
];

export const municipalitiesByProvince: Partial<Record<ProvinceCode, string[]>> = {
  AB: ["Calgary"],
  ON: ["Toronto"],
};

/** Curated demo entries. Recheck all descriptions and links before a production release. */
export const mockServices: GovernmentService[] = [
  {
    id: "ccb",
    title: "Canada Child Benefit",
    jurisdiction: "FEDERAL",
    regionCode: "CA",
    category: "having-a-baby",
    summary: "A monthly payment that helps eligible families with the cost of raising children under 18.",
    estimatedBenefit: "Amount varies by family income and children",
    officialUrl: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-apply.html",
    eligibilityCriteria: ["Care for a child under 18", "Meet residence and status rules", "Family income affects payment amount"],
    minChildren: 1,
    applicationNote: "Apply through birth registration, your CRA account, or by mail.",
  },
  {
    id: "ei-parental",
    title: "EI maternity & parental benefits",
    jurisdiction: "FEDERAL",
    regionCode: "CA",
    category: "having-a-baby",
    summary: "Temporary income support for eligible parents who are away from work to welcome a child.",
    estimatedBenefit: "Payment depends on earnings and benefit option",
    officialUrl: "https://www.canada.ca/en/services/benefits/ei/ei-maternity-parental/apply.html",
    eligibilityCriteria: ["Have qualifying insurable employment", "Meet program work and earnings rules", "Quebec residents generally use the provincial parental plan"],
    applicationNote: "Apply directly through Service Canada after you stop working.",
  },
  {
    id: "ocb",
    title: "Ontario Child Benefit",
    jurisdiction: "PROVINCIAL",
    regionCode: "ON",
    category: "having-a-baby",
    summary: "An income-tested monthly benefit for Ontario families with children under 18.",
    estimatedBenefit: "Amount varies by family income and children",
    officialUrl: "https://www.ontario.ca/page/ontario-child-benefit",
    eligibilityCriteria: ["Live in Ontario", "Care for a child under 18", "File annual tax returns"],
    incomeTiers: ["low", "middle"],
    minChildren: 1,
    applicationNote: "Assessment is automatic when you apply for the Canada Child Benefit.",
  },
  {
    id: "acfb",
    title: "Alberta Child and Family Benefit",
    jurisdiction: "PROVINCIAL",
    regionCode: "AB",
    category: "having-a-baby",
    summary: "Financial assistance for lower and middle-income Alberta families with children.",
    estimatedBenefit: "Amount varies by family income and children",
    officialUrl: "https://www.alberta.ca/alberta-child-and-family-benefit",
    eligibilityCriteria: ["Live in Alberta", "Care for a child under 18", "File a tax return and meet income criteria"],
    incomeTiers: ["low", "middle"],
    minChildren: 1,
    applicationNote: "Assessment is automatic when you file taxes and qualify for the Canada Child Benefit.",
  },
  {
    id: "toronto-child-care",
    title: "Toronto Child Care Fee Subsidy",
    jurisdiction: "MUNICIPAL",
    regionCode: "Toronto",
    category: "having-a-baby",
    summary: "Help with the cost of licensed child care for eligible Toronto families.",
    estimatedBenefit: "Subsidy varies by family circumstances",
    officialUrl: "https://www.toronto.ca/community-people/employment-social-support/child-family-support/child-care-support/",
    eligibilityCriteria: ["Meet Toronto program requirements", "Have or expect a child needing care", "Financial assessment applies"],
    incomeTiers: ["low", "middle"],
    applicationNote: "Toronto allows applications while expecting a child; a waitlist applies.",
  },
  {
    id: "calgary-fair-entry",
    title: "Calgary Fair Entry",
    jurisdiction: "MUNICIPAL",
    regionCode: "Calgary",
    category: "having-a-baby",
    summary: "A single application for reduced-cost City programs, including transit and recreation.",
    estimatedBenefit: "Reduced fees depend on the program",
    officialUrl: "https://www.calgary.ca/social-services/low-income/fair-entry-subsidy/how-to-apply.html",
    eligibilityCriteria: ["Live in Calgary", "Meet the program income threshold", "Provide required income documents"],
    incomeTiers: ["low"],
    applicationNote: "Apply through the City of Calgary Fair Entry program.",
  },
  {
    id: "ei-regular",
    title: "EI regular benefits",
    jurisdiction: "FEDERAL",
    regionCode: "CA",
    category: "job-loss",
    summary: "Temporary income support if you lose your job through no fault of your own and qualify.",
    estimatedBenefit: "Payment depends on insurable earnings",
    officialUrl: "https://www.canada.ca/en/services/benefits/ei/ei-regular-benefit/apply.html",
    eligibilityCriteria: ["Have enough insurable hours", "Be available for and actively seeking work", "Meet Service Canada requirements"],
  },
  {
    id: "employment-ontario",
    title: "Employment Ontario",
    jurisdiction: "PROVINCIAL",
    regionCode: "ON",
    category: "job-loss",
    summary: "Free career counselling, job search help and training support across Ontario.",
    estimatedBenefit: "Free employment services",
    officialUrl: "https://www.ontario.ca/page/employment-ontario",
    eligibilityCriteria: ["Live in Ontario", "Contact a local service provider to discuss programs"],
  },
  {
    id: "business-registration",
    title: "Register your business",
    jurisdiction: "FEDERAL",
    regionCode: "CA",
    category: "starting-a-business",
    summary: "Find the government registration steps that fit your planned business type.",
    estimatedBenefit: "Registration service, not a cash benefit",
    officialUrl: "https://www.canada.ca/en/services/business/start/register-with-gov.html",
    eligibilityCriteria: ["Choose a business structure", "Check federal and provincial registration requirements"],
  },
];

export function getService(id: string): GovernmentService | undefined {
  return mockServices.find((service) => service.id === id);
}
