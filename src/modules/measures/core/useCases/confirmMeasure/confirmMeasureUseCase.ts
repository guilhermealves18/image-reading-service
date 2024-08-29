import { ConfirmMeasureDTO } from '@modules/measures/infra/http/dtos/confirmMeasureDTO'
import HttpExceptions from '@shared/errors/HttpExceptions'
import { inject, injectable } from 'tsyringe'

import { MeasureRepository } from '../../repositories/measureRepository'

@injectable()
export class ConfirmMeasureUseCase {
  constructor(
    @inject('PrismaMeasureRepository')
    private measureRepository: MeasureRepository
  ) {}

  async execute(data: ConfirmMeasureDTO): Promise<void> {
    try {
      if (!data.measure_uuid || typeof data.confirmed_value !== 'number') {
        throw new HttpExceptions('Dados inválidos fornecidos.', 400)
      }

      const measureExists = await this.measureRepository.findById(
        data.measure_uuid
      )

      if (!measureExists) {
        throw new HttpExceptions('Leitura não encontrada', 404)
      }

      if (measureExists.confirmed_value !== null) {
        throw new HttpExceptions('Leitura já confirmada', 409)
      }

      await this.measureRepository.update(data)
    } catch (error) {
      console.log(error)
      if (error instanceof HttpExceptions) {
        throw new HttpExceptions(error.message, error.code)
      }

      throw new HttpExceptions('An unexpected error occurred.', 500)
    }
  }
}
