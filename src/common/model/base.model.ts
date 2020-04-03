import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';


export class BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}