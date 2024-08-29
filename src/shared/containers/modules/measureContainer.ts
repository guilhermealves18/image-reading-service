import { MeasureRepository } from '@modules/measures/core/repositories/measureRepository'
import { PrismaMeasureRepository } from '@modules/measures/infra/database/repositories/prismaMeasureRepository'
import { container } from 'tsyringe'

container.registerSingleton<MeasureRepository>(
  'PrismaMeasureRepository',
  PrismaMeasureRepository
)
