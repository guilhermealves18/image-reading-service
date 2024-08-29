import { Router } from 'express'

import { customerMeasureRoutes } from './customerMeasureRoutes'
import { customerRoutes } from './customerRoutes'
import { measureRoutes } from './measureRoutes'

const router = Router()

router.use('/customers', customerRoutes)
router.use('/customer-measures', customerMeasureRoutes)
router.use('/measures', measureRoutes)

export { router }
