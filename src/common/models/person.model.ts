import { prop } from '@typegoose/typegoose';

import { BaseModel } from './base.model';
import { PhoneEnum, GenderEnum } from '../enums';


class Profile {
    @prop()
    avatar?: string;

    @prop()
    bio?: string;
}

class Phone {
    @prop()
    number?: string;

    @prop()
    description?: string;

    @prop({ enum: PhoneEnum, type: String })
    type?: PhoneEnum;

    @prop()
    sms?: boolean;

    @prop()
    default?: boolean
}

class Address {
    @prop()
    line1?: string;

    @prop()
    line2?: string;

    @prop()
    city?: string;

    @prop()
    state?: string;

    @prop()
    zip?: number;

    @prop()
    country?: string;
}

export abstract class Person extends BaseModel {
    @prop({ lowercase: true, trim: true })
    name?: string;

    @prop({ lowercase: true, trim: true })
    middlename?: string;

    @prop({ lowercase: true, trim: true })
    lastname?: string;

    @prop()
    contactPhone?: Phone[];

    @prop()
    address?: Address;

    @prop()
    birthday?: Date;

    @prop({ enum: GenderEnum, default: GenderEnum.UNDEFINED, type: String })
    gender?: GenderEnum;

    @prop()
    profile?: Profile

    @prop({ default: true })
    status?: boolean;
}