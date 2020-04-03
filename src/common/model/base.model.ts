import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';


export class BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: number;
}