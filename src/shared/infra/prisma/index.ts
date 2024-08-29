import localLogger from '@lib/logger/local'
import { PrismaClient } from '@prisma/client'

const databaseUrl = process.env.DATABASE_URL || ''

const getDatabaseName = (url: string): string => {
  const match = url.match(/\/([^\/?]+)(?:\?|$)/)
  return match ? match[1] : 'Unknown database'
}

const prisma = new PrismaClient()

export async function initializeDatabase() {
  try {
    await prisma.$connect()
    localLogger.log({
      label: 'SYSTEM',
      level: 'verbose',
      message: `Connected to the default database: ${getDatabaseName(databaseUrl)}.`
    })
  } catch (error) {
    localLogger.log({
      label: 'SYSTEM',
      level: 'error',
      message: 'Failed to connect to the database, terminating application.'
    })
    process.exit(1)
  }
}

export default prisma
