import { CreateCustomerUseCase } from '@modules/customer/core/useCases/createCustomer/createCustomerUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createCustomerUseCase = container.resolve(CreateCustomerUseCase)

      const data = request.body

      const result = await createCustomerUseCase.execute(data)

      return response.status(201).json(result)
    } catch (error) {
      return response.status(error.code).json({ message: error.message })
    }
  }
}
