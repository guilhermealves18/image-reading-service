import HttpExceptions from '@shared/errors/HttpExceptions'
import { inject, injectable } from 'tsyringe'

import { CustomerProps } from '../../entities/Customer'
import { CustomerRepository } from '../../repositories/customerRepository'

@injectable()
export class ListCustomersUseCase {
  constructor(
    @inject('PrismaCustomerRepository')
    private customerRepository: CustomerRepository
  ) {}

  async execute(): Promise<CustomerProps[]> {
    try {
      const list = await this.customerRepository.list()

      if (!list) {
        throw new HttpExceptions('No customers found.', 404)
      }

      return list
    } catch (error) {
      if (error instanceof HttpExceptions) {
        throw new HttpExceptions(error.message, error.code)
      }

      throw new HttpExceptions('An unexpected error occurred.', 500)
    }
  }
}
