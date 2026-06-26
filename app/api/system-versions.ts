export interface SystemVersionDto {
  id: string
  customerName: string
  systemClass: 'ISMS' | 'QMS'
  validFrom: string
}

export interface RiskAreaDto {
  id: string
  code: string
  name: string
  description: string
}

export interface ProbabilityClassDto {
  id: string
  code: string
  name: string
  description: string
}

export interface ImpactClassDto {
  id: string
  code: string
  name: string
  description: string
}

export interface RiskLevelDto {
  id: string
  probabilityClass: ProbabilityClassDto
  impactClass: ImpactClassDto
  level: number
}