import { prop, pre } from '@typegoose/typegoose';
import { Person } from '../../common/models';
import { hashSync, genSaltSync } from 'bcrypt';

class GoogleAuth {
    @prop()
    userId?: string;
};

class EmailAuth {
    @prop()
    valid?: boolean
}

class Social {
    @prop()
    google?: GoogleAuth;
};

class Auth {
    @prop()
    email: EmailAuth;

    @prop()
    lastLoginAt?: Date;

    @prop()
    loginAttempts?: number;

    @prop()
    social?: Social;
}

@pre<User>('save', async function () {
    let user = this;
    const salt = genSaltSync(10);
    if (user.isModified('password')) {
        user.password = await hashSync(user.password, salt);
    }
})

export class User extends Person {
    @prop({ trim: true, lowercase: true, required: true })
    username!: string;

    @prop({ trim: true, lowercase: true, required: true, unique: true })
    email!: string;

    @prop({ required: true, select: false, format: 'password', type: String })
    password!: string;

    @prop()
    auth?: Auth;

    @prop()
    roles?: string[];

    @prop()
    status?: boolean;
}




