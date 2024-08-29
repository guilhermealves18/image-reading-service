import { CustomerMeasureDTO } from '@modules/customerMeasure/infra/http/dtos/customerMeasureDTO'

import { CustomerMeasurementProps } from '../entities/CustomerMeasurement'

export abstract class CustomerMeasureRepository {
  abstract create(data: CustomerMeasureDTO): Promise<CustomerMeasurementProps>
  abstract findByMonth(
    customerCode: string,
    month: number,
    measureType: 'WATER' | 'GAS'
  ): Promise<CustomerMeasurementProps>
}
