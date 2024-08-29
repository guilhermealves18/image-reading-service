import { UploadMeasureController } from '@modules/customerMeasure/infra/http/controllers/uploadMeasureController'
import { Router } from 'express'
import multer from 'multer'

const upload = multer()
const customerMeasureRoutes = Router()

const uploadMeasureController = new UploadMeasureController()

customerMeasureRoutes.post(
  '/upload',
  upload.single('image'),
  uploadMeasureController.handle
)

export { customerMeasureRoutes }
