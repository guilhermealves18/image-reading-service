import { CustomerMeasurementProps } from '@modules/customerMeasure/core/entities/CustomerMeasurement'
import { CustomerMeasureRepository } from '@modules/customerMeasure/core/repositories/customerMeasureRepository'
import { PrismaClient } from '@prisma/client'
import prisma from '@shared/infra/prisma'

import { CustomerMeasureDTO } from '../../http/dtos/customerMeasureDTO'

export class PrismaCustomerMeasureRepository
  implements CustomerMeasureRepository
{
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  async create(data: CustomerMeasureDTO): Promise<CustomerMeasurementProps> {
    return await this.prisma.customerMeasurement.create({
      data: {
        image_url: data.image_url,
        measure_datetime: data.measure_datetime,
        measure_type: data.measure_type,
        customer_code: data.customer_code
      }
    })
  }

  async findByMonth(
    customerCode: string,
    month: number,
    measureType: 'WATER' | 'GAS'
  ): Promise<CustomerMeasurementProps> {
    return await this.prisma.customerMeasurement.findFirst({
      where: {
        customer_code: customerCode,
        measure_type: measureType,
        measure_datetime: {
          gte: new Date(new Date().getFullYear(), month - 1, 1),
          lt: new Date(new Date().getFullYear(), month, 1)
        }
      }
    })
  }
}
