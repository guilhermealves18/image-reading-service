import { CreateCustomerController } from '@modules/customer/infra/http/controllers/createCustomerController'
import { ListCustomersController } from '@modules/customer/infra/http/controllers/listCustomersControllers'
import { Router } from 'express'

const customerRoutes = Router()

const createCustomerController = new CreateCustomerController()
const listCustomersUseCase = new ListCustomersController()

customerRoutes.get('/', listCustomersUseCase.handle)
customerRoutes.post('/', createCustomerController.handle)

export { customerRoutes }
