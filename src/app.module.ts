import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AnimalController } from './models/animal/animal.controller'
import { CountryController } from './models/country/country.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Animals } from './models/animal/entity/animal.entity'
import { RoleGuardService } from './auth/role-guard/role-guard.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      entities: [Animals],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Animals]),
  ],
  controllers: [AppController, AnimalController, CountryController],
  providers: [AppService, RoleGuardService, JwtService],
})
export class AppModule {}
