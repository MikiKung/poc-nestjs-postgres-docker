import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'animals' })
export class Animals {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column({ type: 'varchar', length: 300, unique: true, nullable: true })
  uniqueName: string

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string

  @Column({ type: 'float8', nullable: true })
  legs: number
}

export type AnimalsDocument = Animals
