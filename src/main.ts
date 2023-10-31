import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as express from 'express'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: false, cors: true })

  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ limit: '50mb' }))
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  await app.listen(3000)
}
bootstrap()
