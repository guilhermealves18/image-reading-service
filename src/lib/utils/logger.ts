import { Format } from 'logform'
import { format } from 'winston'

export function filterByLelvel(level: string, showAll: boolean): Format {
  return format((log) => {
    if (showAll) {
      if (log.level === level) {
        return log
      }
    }

    return log
  })()
}

export function formatForConsole(): Format {
  const colorizer = format.colorize()

  return format.printf((log) => {
    return `[${colorizer.colorize(log.level, log.label ? log.label : log.metadata.label)}] ${log.timestamp} - ${log.message}`
  })
}

export function formatForLocalTransport(showAll?: boolean): Format {
  return format.combine(
    filterByLelvel('verbose', showAll || false),
    format.timestamp(),
    formatForConsole()
  )
}
