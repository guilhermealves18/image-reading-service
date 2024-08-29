import HttpExceptions from '@shared/errors/HttpExceptions'
import { inject, injectable } from 'tsyringe'

import { MeasureRepository } from '../../repositories/measureRepository'

export type MeasureType = 'WATER' | 'GAS'

@injectable()
export class ListMeasureByCustomerUseCase {
  constructor(
    @inject('PrismaMeasureRepository')
    private measureRepository: MeasureRepository
  ) {}

  async execute(
    customerCode: string,
    measureType?: string
  ): Promise<{
    customer_code: string
    measures: {
      measure_uuid: string
      measure_datetime: Date
      measure_type: string
      has_confirmed: boolean
      image_url: string
    }[]
  }> {
    try {
      const type = measureType?.toUpperCase() as MeasureType | undefined

      if (
        measureType &&
        !['WATER', 'GAS'].includes(measureType.toString().toUpperCase())
      ) {
        throw new HttpExceptions('Tipo de medição não permitida', 400)
      }

      const customerMeasurements =
        await this.measureRepository.findByCustomerCodeAndType(
          { customer_code: customerCode },
          type
        )

      if (!customerMeasurements.length) {
        throw new HttpExceptions('Nenhuma leitura encontrada', 404)
      }

      const measures = customerMeasurements.map((measure) => ({
        measure_uuid: measure.id,
        measure_datetime: measure.measure_datetime,
        measure_type: measure.measure_type,
        has_confirmed: measure?.confirmed_value,
        image_url: measure.image_url
      }))

      return {
        customer_code: customerCode,
        measures
      }
    } catch (error) {
      console.log(error)
      if (error instanceof HttpExceptions) {
        throw new HttpExceptions(error.message, error.code)
      }

      throw new HttpExceptions(error.statusText, error.status)
    }
  }
}
