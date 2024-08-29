import { CustomerProps } from '@modules/customer/core/entities/Customer'
import { CustomerRepository } from '@modules/customer/core/repositories/customerRepository'
import { PrismaClient } from '@prisma/client'
import prisma from '@shared/infra/prisma'

import { CustomerDTO } from '../../http/dtos/customerDTO'

export class PrismaCustomerRepository implements CustomerRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  async create(data: CustomerDTO): Promise<CustomerProps> {
    return await this.prisma.customer.create({
      data
    })
  }

  async list(): Promise<CustomerProps[]> {
    return await this.prisma.customer.findMany({
      where: {
        deleted_at: null
      }
    })
  }

  async findByEmailOrCode(email: string, code: string): Promise<CustomerProps> {
    return await this.prisma.customer.findFirst({
      where: {
        deleted_at: null,
        OR: [
          {
            email,
            code
          }
        ]
      }
    })
  }
}
