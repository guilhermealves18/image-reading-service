import { Replace } from '@helpers/Replace'
import { randomUUID } from 'crypto'

export interface CustomerProps {
  id: string
  code: string
  email: string
  name: string
  created_at: Date
  updated_at: Date | null | undefined
  deleted_at: Date | null | undefined
}

export class Customer implements CustomerProps {
  private properties: CustomerProps

  constructor(
    customer: Replace<
      CustomerProps,
      {
        id?: string
      }
    >
  ) {
    this.properties = {
      ...customer,
      id: customer?.id || randomUUID()
    }
  }

  public get id(): string {
    return this.properties.id
  }

  public set id(value: string) {
    this.properties.id = value
  }

  public get code(): string {
    return this.properties.code
  }

  public set code(value: string) {
    this.properties.code = value
  }

  public get email(): string {
    return this.properties.email
  }

  public set email(value: string) {
    this.properties.email = value
  }

  public get name(): string {
    return this.properties.name
  }

  public set name(value: string) {
    this.properties.name = value
  }

  public get created_at(): Date {
    return this.properties.created_at
  }

  public set created_at(value: Date) {
    this.properties.created_at = value
  }

  public get updated_at(): Date | null | undefined {
    return this.properties.updated_at
  }

  public set updated_at(value: Date | null | undefined) {
    this.properties.updated_at = value
  }

  public get deleted_at(): Date | null | undefined {
    return this.properties.deleted_at
  }

  public set deleted_at(value: Date | null | undefined) {
    this.properties.deleted_at = value
  }
}
