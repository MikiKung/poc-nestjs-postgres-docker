import { AuthGuards } from '@/auth/role-guard/role-guard.guard'
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Animals } from './entity/animal.entity'

@Controller('animal')
@UseGuards(AuthGuards)
export class AnimalController {
  constructor(
    @InjectRepository(Animals)
    private readonly animalsRepository: Repository<Animals>,
  ) {}

  @Get()
  async getListAnimal() {
    const data = await this.animalsRepository.find({ select: ['id', 'name', 'description', 'legs'] })
    return { data }
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const data = await this.animalsRepository.find({ where: { id }, select: ['id', 'name', 'description', 'legs'] })
    return { data }
  }

  @Post()
  async createAnimal(@Body() item: { name: string; description?: string; legs: number }) {
    try {
      await this.animalsRepository.save(item)

      return { status: 'work' }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Put(':id')
  async updateAnimal(@Param('id') id: number, @Body() item: { name: string; description?: string; legs: number }) {
    try {
      const data = await this.animalsRepository.findOne({ where: { id } })
      const payload = { ...data, ...item }

      await this.animalsRepository.save(data)
      return { status: 'work', payload }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    try {
      await this.animalsRepository.delete(id)
      return { status: 'work' }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
