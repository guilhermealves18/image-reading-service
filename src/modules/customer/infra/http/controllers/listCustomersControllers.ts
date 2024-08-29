import { ListCustomersUseCase } from '@modules/customer/core/useCases/listCustomers/listCustomersUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListCustomersController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listCustomersUseCase = container.resolve(ListCustomersUseCase)

      const execute = await listCustomersUseCase.execute()
      return response.status(200).json(execute)
    } catch (error) {
      return response.status(error.code).json({ message: error.message })
    }
  }
}
