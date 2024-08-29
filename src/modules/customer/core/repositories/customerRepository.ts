import { CustomerDTO } from '@modules/customer/infra/http/dtos/customerDTO'

import { CustomerProps } from '../entities/Customer'

export abstract class CustomerRepository {
  abstract create(data: CustomerDTO): Promise<CustomerProps>
  abstract list(): Promise<CustomerProps[]>
  abstract findByEmailOrCode(
    email: string,
    code: string
  ): Promise<CustomerProps>
}
