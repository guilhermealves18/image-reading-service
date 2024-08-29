export interface CustomerMeasureDTO {
  id?: string
  customer_code: string
  measure_datetime?: string
  measure_type: 'WATER' | 'GAS'
  image_url?: string
}
