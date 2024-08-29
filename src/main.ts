import 'dotenv/config'
import 'reflect-metadata'
import '@shared/containers'

import { router } from '@shared/infra/http/routes'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'

const server = express()

server.get('/', (request, response) => {
  response.status(200).json({
    code: 'SERVICE_AVAILABLE',
    service: 'image-reading',
    message: 'The service is running and available.'
  })
})

if (process.env.NODE_ENV === 'production') {
  server.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin'
      }
    })
  )

  server.use(hpp())
}

server.use(cors())
server.use(express.json({ limit: '50mb' }))
server.use('/', router)

export default server
