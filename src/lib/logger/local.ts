import { formatForLocalTransport } from '@lib/utils/logger'
import { createLogger, transports } from 'winston'

export function localTransporter(
  showAll?: boolean
): transports.ConsoleTransportInstance {
  return new transports.Console({
    level: 'verbose',
    format: formatForLocalTransport(showAll)
  })
}

const localLogger = createLogger({
  transports: [localTransporter()]
})

export default localLogger
