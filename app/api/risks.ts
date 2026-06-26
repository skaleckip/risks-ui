import type { ImpactClassDto, ProbabilityClassDto } from "~/api/system-versions";

export interface RiskWideDto {
  id: string
  name: string,
  description: string,
  ownerName: string,
  ownerUsername: string,
  probabilityClass?: ProbabilityClassDto,
  impactClassDto?: ImpactClassDto,
}