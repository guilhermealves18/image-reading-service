import { Replace } from '@helpers/Replace'
import { randomUUID } from 'crypto'

export interface CustomerMeasurementProps {
  id: string
  customer_code: string
  measure_datetime: Date
  measure_type: string
  image_url: string
  created_at: Date
  updated_at: Date | null | undefined
  deleted_at: Date | null | undefined
}

export class CustomerMeasurement implements CustomerMeasurementProps {
  private properties: CustomerMeasurementProps

  constructor(
    customerMeasurement: Replace<
      CustomerMeasurementProps,
      {
        id?: string
      }
    >
  ) {
    this.properties = {
      ...customerMeasurement,
      id: customerMeasurement?.id || randomUUID()
    }
  }

  public get id(): string {
    return this.properties.id
  }

  public set id(value: string) {
    this.properties.id = value
  }

  public get customer_code(): string {
    return this.properties.customer_code
  }

  public set customer_code(value: string) {
    this.properties.customer_code = value
  }

  public get measure_datetime(): Date {
    return this.properties.measure_datetime
  }

  public set measure_datetime(value: Date) {
    this.properties.measure_datetime = value
  }

  public get measure_type(): string {
    return this.properties.measure_type
  }

  public set measure_type(value: string) {
    this.properties.measure_type = value
  }

  public get image_url(): string {
    return this.properties.image_url
  }

  public set image_url(value: string) {
    this.properties.image_url = value
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
