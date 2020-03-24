import { Schema } from 'mongoose';
import { prop, buildSchema } from '@typegoose/typegoose';
export abstract class BaseModel {
    @prop()
    createdDate?: Date;
    @prop()
    updatedDate?: Date;
    id?: string;
    notes?: string;


    static get schema(): Schema {
        return buildSchema(this as any, {
            timestamps: true,
            toJSON: {
                getters: true,
                virtuals: true,
            },
        });
    }

    static get modelName(): string {
        return this.name;
    }
}
