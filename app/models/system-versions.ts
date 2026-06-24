export interface SystemVersionDto {
  id: string
  customerName: string
  systemClass: 'ISMS' | 'QMS'
  validFrom: string
}