import { ConfirmMeasureController } from '@modules/measures/infra/http/controllers/confirmMeasureController'
import { ListMeasuresByCustomerController } from '@modules/measures/infra/http/controllers/listMeasuresByCustomerController'
import { Router } from 'express'

const measureRoutes = Router()

const confirmMeasureController = new ConfirmMeasureController()
const listMeasuresByCustomerController = new ListMeasuresByCustomerController()

measureRoutes.patch('/confirm', confirmMeasureController.handle)
measureRoutes.get('/:customer/list', listMeasuresByCustomerController.handle)

export { measureRoutes }
