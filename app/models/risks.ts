export interface ProbabilityClassDto {
  code: string;
  name: string;
  description: string;
}

export interface ImpactClassDto {
  code: string;
  name: string;
  description: string;
}

export interface RiskWideDto {
  id: string
  name: string,
  description: string,
  ownerName: string,
  ownerUsername: string,
  probabilityClass?: ProbabilityClassDto,
  impactClassDto?: ImpactClassDto,
}