import { GlucoseRecord } from 'src/glucose/glucose-record.entity';
import { Target } from 'src/targets/target.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: "USER"})
  role: string

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable: true})
  phone?: string;

  @OneToMany(() => GlucoseRecord, (record) => record.user)
  glucoseRecords: GlucoseRecord[];

  @OneToOne(() => Target, (target) => target.user, { cascade: true })
  target: Target
}