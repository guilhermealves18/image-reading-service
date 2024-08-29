import 'dotenv/config'

import localLogger from '@lib/logger/local'
import { initializeDatabase } from '@shared/infra/prisma'

import server from './main'

localLogger.log({
  label: 'SYSTEM',
  level: 'verbose',
  message: 'Starting the application...'
})

server.listen(process.env.APP_PORT, () => {
  localLogger.log({
    label: 'SYSTEM',
    level: 'verbose',
    message: `Application successfully started on port ${process.env.APP_PORT}`
  })
})

initializeDatabase()

process.on('SIGINT', () => {
  localLogger.log({
    label: 'SYSTEM',
    level: 'verbose',
    message: 'Application interrupted by customer. Shutting down...'
  })

  process.exit()
})
