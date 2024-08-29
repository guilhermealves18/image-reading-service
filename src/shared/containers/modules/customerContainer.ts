import { CustomerRepository } from '@modules/customer/core/repositories/customerRepository'
import { PrismaCustomerRepository } from '@modules/customer/infra/database/repositories/prismaCustomerRepository'
import { container } from 'tsyringe'

container.registerSingleton<CustomerRepository>(
  'PrismaCustomerRepository',
  PrismaCustomerRepository
)
