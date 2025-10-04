import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

export enum RecordContext {
    FASTING = 'fasting', // jejum
    POST_MEAL = 'post_meal', // pós refeição
    PRE_MEAL = 'pre_meal', // pré refeição
    RANDOM = 'random', // qualquer momento
}

@Entity('glucose_records')
export class GlucoseRecord {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', {
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        }
    })
    value: number;

    @Column({ type: 'timestamptz' })
    measuredAt: Date;

    @Column({ type: 'text', nullable: true })
    obs?: string;

    @Column({ type: 'enum', enum: RecordContext, default: RecordContext.RANDOM })
    context: RecordContext;

    @ManyToOne(() => User, (user) => user.glucoseRecords, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}