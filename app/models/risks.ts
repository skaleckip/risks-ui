import type { ImpactClassDto, ProbabilityClassDto } from "~/models/system-versions";

export interface RiskWideDto {
  id: string
  name: string,
  description: string,
  ownerName: string,
  ownerUsername: string,
  probabilityClass?: ProbabilityClassDto,
  impactClassDto?: ImpactClassDto,
}