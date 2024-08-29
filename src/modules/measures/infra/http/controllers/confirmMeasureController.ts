import { ConfirmMeasureUseCase } from '@modules/measures/core/useCases/confirmMeasure/confirmMeasureUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ConfirmMeasureController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const confirmMeasureUseCase = container.resolve(ConfirmMeasureUseCase)

      await confirmMeasureUseCase.execute(request.body)

      return response.status(200).json({
        success: true
      })
    } catch (error) {
      return response.status(error.code).json({
        error_code:
          error.code === 400
            ? 'INVALID_DATA'
            : error.code === 409
              ? 'DOUBLE_REPORT'
              : error.code === 404
                ? 'MEASURE_NOT_FOUND'
                : 'UNDEFINED',
        error_description: error.message
      })
    }
  }
}
