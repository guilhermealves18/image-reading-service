import { Replace } from '@helpers/Replace'
import { randomUUID } from 'crypto'

export interface MeasureProps {
  id: string
  customer_measurement_id: string
  customer_code: string
  confirmed_value: number | null
  created_at: Date
  updated_at: Date | null | undefined
  deleted_at: Date | null | undefined
}

export class Measure implements MeasureProps {
  private properties: MeasureProps

  constructor(
    measure: Replace<
      MeasureProps,
      {
        id?: string
      }
    >
  ) {
    this.properties = {
      ...measure,
      id: measure?.id || randomUUID()
    }
  }

  public set id(value: string) {
    this.properties.id = value
  }

  public get id() {
    return this.properties.id
  }

  public set customer_measurement_id(value: string) {
    this.properties.customer_measurement_id = value
  }

  public get customer_measurement_id() {
    return this.properties.customer_measurement_id
  }

  public get customer_code(): string {
    return this.properties.customer_code
  }

  public set customer_code(value: string) {
    this.properties.customer_code = value
  }

  public get confirmed_value(): number | null {
    return this.properties.confirmed_value
  }

  public set confirmed_value(value: number | null) {
    this.properties.confirmed_value = value
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
