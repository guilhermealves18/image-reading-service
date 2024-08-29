import { CustomerMeasureRepository } from '@modules/customerMeasure/core/repositories/customerMeasureRepository'
import { PrismaCustomerMeasureRepository } from '@modules/customerMeasure/infra/database/repositories/prismaCustomerMeasureRepository'
import { container } from 'tsyringe'

container.registerSingleton<CustomerMeasureRepository>(
  'PrismaCustomerMeasureRepository',
  PrismaCustomerMeasureRepository
)
