import { CustomerDTO } from '@modules/customer/infra/http/dtos/customerDTO'
import HttpExceptions from '@shared/errors/HttpExceptions'
import { inject, injectable } from 'tsyringe'

import { CustomerProps } from '../../entities/Customer'
import { CustomerRepository } from '../../repositories/customerRepository'

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject('PrismaCustomerRepository')
    private customerRepository: CustomerRepository
  ) {}

  async execute(data: CustomerDTO): Promise<CustomerProps> {
    try {
      const existingCustomer = await this.customerRepository.findByEmailOrCode(
        data.email,
        data.code
      )

      if (existingCustomer) {
        throw new HttpExceptions(
          'The provided email or customer code is already in use. Please choose a different one.',
          409
        )
      }

      return await this.customerRepository.create(data)
    } catch (error) {
      if (error instanceof HttpExceptions) {
        throw new HttpExceptions(error.message, error.code)
      }

      throw new HttpExceptions('An unexpected error occurred.', 500)
    }
  }
}
