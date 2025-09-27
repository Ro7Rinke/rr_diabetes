import { GlucoseRecord } from 'src/glucose/glucose-record.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  resetPasswordToken?: string;

  @Column({ nullable: true, type: 'timestamp' })
  resetPasswordExpires?: Date;

  @OneToMany(() => GlucoseRecord, (record) => record.user)
  glucoseRecords: GlucoseRecord[];
}