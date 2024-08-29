import { MeasureProps } from '@modules/measures/core/entities/Measure'
import {
  CustomerMeasurementWithImage,
  MeasureRepository
} from '@modules/measures/core/repositories/measureRepository'
import { MeasureType, Prisma, PrismaClient } from '@prisma/client'
import prisma from '@shared/infra/prisma'

import { ConfirmMeasureDTO } from '../../http/dtos/confirmMeasureDTO'

export class PrismaMeasureRepository implements MeasureRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  async create(data: ConfirmMeasureDTO): Promise<MeasureProps> {
    return await this.prisma.measure.create({
      data: {
        id: data.measure_uuid,
        customer_measurement_id: data.customer_measurement_id,
        confirmed_value: data.confirmed_value,
        customer_code: data.customer_code
      }
    })
  }

  async update(data: ConfirmMeasureDTO): Promise<MeasureProps> {
    return await this.prisma.measure.update({
      where: {
        id: data.measure_uuid
      },
      data: {
        confirmed_value: data.confirmed_value,
        updated_at: new Date().toISOString()
      }
    })
  }

  async findById(id: string): Promise<MeasureProps> {
    return await this.prisma.measure.findFirst({
      where: {
        id
      }
    })
  }

  async findByCustomer(code: string): Promise<MeasureProps> {
    return await this.prisma.measure.findFirst({
      where: {
        customer_code: code
      }
    })
  }

  async findByCustomerCodeAndType(
    data: ConfirmMeasureDTO,
    measureType?: MeasureType
  ): Promise<CustomerMeasurementWithImage[]> {
    const whereClause: Prisma.CustomerMeasurementWhereInput = {
      customer_code: data.customer_code,
      ...(measureType ? { measure_type: measureType } : {})
    }

    const results = await this.prisma.customerMeasurement.findMany({
      where: whereClause,
      include: {
        Measure: {
          select: {
            confirmed_value: true
          }
        }
      }
    })

    return results.map((item) => ({
      id: item.id,
      measure_datetime: item.measure_datetime,
      measure_type: item.measure_type,
      customer_code: item.customer_code,
      image_url: item.image_url,
      confirmed_value:
        item.Measure &&
        item.Measure.some((measure) =>
          measure.confirmed_value === null ? false : true
        )
    }))
  }
}
