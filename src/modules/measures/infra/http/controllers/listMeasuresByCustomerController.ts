import { ListMeasureByCustomerUseCase } from '@modules/measures/core/useCases/listMeasureByCustomer/listMeasureByCustomerUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListMeasuresByCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { customer: customerCode } = request.params

      const { measure_type: measureType } = request.query

      const listMeasureByCustomerUseCase = container.resolve(
        ListMeasureByCustomerUseCase
      )

      const data = await listMeasureByCustomerUseCase.execute(
        customerCode,
        String(measureType)
      )

      return response.status(200).json(data)
    } catch (error) {
      return response.status(error.code).json({
        error_code:
          error.code === 400
            ? 'INVALID_TYPE'
            : error.code === 409
              ? 'DOUBLE_REPORT'
              : error.code === 404
                ? 'MEASURES_NOT_FOUND'
                : 'UNDEFINED',
        error_description: error.message
      })
    }
  }
}
