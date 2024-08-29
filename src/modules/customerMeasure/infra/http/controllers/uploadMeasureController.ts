import { UploadMeasureUseCase } from '@modules/customerMeasure/core/useCases/uploadMeasure/uploadMeasureUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UploadMeasureController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const image = request.file?.buffer.toString('base64')
      const uploadMeasureUseCase = container.resolve(UploadMeasureUseCase)

      const execute = await uploadMeasureUseCase.execute(request.body, image)

      return response.status(200).json(execute)
    } catch (error) {
      return response.status(error.code).json({
        error_code:
          error.code === 400
            ? 'INVALID_DATA'
            : error.code === 409
              ? 'DOUBLE_REPORT'
              : 'UNDEFINED',
        error_description: error.message
      })
    }
  }
}
