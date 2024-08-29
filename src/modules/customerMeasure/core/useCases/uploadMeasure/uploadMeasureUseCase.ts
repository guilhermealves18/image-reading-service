import { GoogleGenerativeAI } from '@google/generative-ai'
import {
  FileMetadataResponse,
  GoogleAIFileManager
} from '@google/generative-ai/server'
import localLogger from '@lib/logger/local'
import { CustomerMeasureDTO } from '@modules/customerMeasure/infra/http/dtos/customerMeasureDTO'
import { MeasureRepository } from '@modules/measures/core/repositories/measureRepository'
import HttpExceptions from '@shared/errors/HttpExceptions'
import { randomUUID } from 'crypto'
import fs from 'fs'
import sharp from 'sharp'
import tmp from 'tmp'
import { inject, injectable } from 'tsyringe'

import { CustomerMeasureRepository } from '../../repositories/customerMeasureRepository'

interface FileReturnProps {
  imagem_url: string
  measure_value: number
  measure_uuid: string
}

@injectable()
export class UploadMeasureUseCase {
  constructor(
    @inject('PrismaCustomerMeasureRepository')
    private customerMeasureRepository: CustomerMeasureRepository,

    @inject('PrismaMeasureRepository')
    private measureRepository: MeasureRepository
  ) {}

  private async compressImage(imageBuffer: Buffer): Promise<Buffer> {
    return sharp(imageBuffer)
      .resize({ width: 800 })
      .jpeg({ quality: 80 })
      .toBuffer()
  }

  private async uploadAndRetrieveFile(
    imageBuffer: Buffer
  ): Promise<FileMetadataResponse> {
    const compressedImage = await this.compressImage(imageBuffer)

    const tmpFile = tmp.fileSync({ postfix: '.jpg' })
    fs.writeFileSync(tmpFile.name, compressedImage)

    const googleAIFileManager = new GoogleAIFileManager(
      process.env.GEMINI_API_KEY
    )
    const uploadResponse = await googleAIFileManager.uploadFile(tmpFile.name, {
      mimeType: 'image/jpeg',
      displayName: tmpFile.name
    })

    localLogger.log({
      label: 'GEMINI',
      level: 'info',
      message: `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
    })

    const getResponseUploaded = await googleAIFileManager.getFile(
      uploadResponse.file.name
    )

    localLogger.log({
      label: 'GEMINI',
      level: 'info',
      message: `Retrieved file ${getResponseUploaded.displayName} as ${getResponseUploaded.uri}`
    })

    tmpFile.removeCallback()

    return getResponseUploaded
  }

  async execute(
    data: CustomerMeasureDTO,
    image: string
  ): Promise<FileReturnProps> {
    try {
      if (!['WATER', 'GAS'].includes(data.measure_type)) {
        throw new HttpExceptions(
          'Invalid measure type. Must be WATER or GAS.',
          400
        )
      }

      const date = new Date(data.measure_datetime)
      if (isNaN(date.getTime())) {
        throw new HttpExceptions('Invalid date format.', 400)
      }

      const existingMeasurement =
        await this.customerMeasureRepository.findByMonth(
          data.customer_code,
          date.getMonth() + 1,
          data.measure_type
        )

      if (existingMeasurement) {
        throw new HttpExceptions(
          'Já existe uma leitura para este mês e tipo.',
          409
        )
      }

      const file = await this.uploadAndRetrieveFile(
        Buffer.from(image, 'base64')
      )

      const googleGenerativeAI = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
      )

      const model = googleGenerativeAI.getGenerativeModel({
        model: 'gemini-1.5-flash'
      })

      const result = await model.generateContent([
        {
          fileData: {
            mimeType: 'image/jpeg',
            fileUri: file.uri
          }
        },
        {
          text:
            data.measure_type === 'WATER'
              ? 'Retorne apenas o número da coluna "Consumo" que está de baixo da coluna UF e CEP na imagem'
              : 'Retorne apenas o número "Dias de Consumo" na imagem, "sem asteriscos"'
        }
      ])

      localLogger.log({
        label: 'GEMINI',
        level: 'info',
        message: result.response.text()
      })

      const createCustomerMeasure = await this.customerMeasureRepository.create(
        {
          ...data,
          image_url: file.uri
        }
      )

      const uuid = randomUUID()

      await this.measureRepository.create({
        measure_uuid: uuid,
        customer_measurement_id: createCustomerMeasure.id,
        customer_code: data.customer_code,
        confirmed_value: null
      })

      return {
        imagem_url: file.uri,
        measure_uuid: uuid,
        measure_value: Number(result.response.text())
      }
    } catch (error) {
      console.log(error)
      if (error instanceof HttpExceptions) {
        throw new HttpExceptions(error.message, error.code)
      }

      throw new HttpExceptions(error.statusText, error.status)
    }
  }
}
