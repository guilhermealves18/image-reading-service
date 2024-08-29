import { ConfirmMeasureDTO } from '@modules/measures/infra/http/dtos/confirmMeasureDTO'

import { MeasureProps } from '../entities/Measure'
import { MeasureType } from '../useCases/listMeasureByCustomer/listMeasureByCustomerUseCase'

export type CustomerMeasurementWithImage = {
  id: string
  measure_datetime: Date
  measure_type: MeasureType
  customer_code: string
  image_url: string
  confirmed_value: boolean | null
}

export abstract class MeasureRepository {
  abstract create(data: ConfirmMeasureDTO): Promise<MeasureProps>
  abstract update(data: ConfirmMeasureDTO): Promise<MeasureProps>
  abstract findById(id: string): Promise<MeasureProps>
  abstract findByCustomer(code: string): Promise<MeasureProps>
  abstract findByCustomerCodeAndType(
    data: ConfirmMeasureDTO,
    measureType: MeasureType
  ): Promise<CustomerMeasurementWithImage[]>
}
