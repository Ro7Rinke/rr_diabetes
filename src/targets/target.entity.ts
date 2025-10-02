import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('targets')
export class Target {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { default: 100 })
    value: number

    @Column('decimal', { default: 10 })
    tolerance: number;

    @Column('int', { default: 7 })
    interval: number;

    @OneToOne(() => User, (user) => user.target, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}