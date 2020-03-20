

export interface IUser {
    id: string;
    name?: string;
    lastname?: string;
    email: string;
    password: string;
    fusionpbx_token?: string;
    roles?: string[],
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    lastLoginAt?: Date;
    stats?: { // Projections
        login: {
            attempts: number;
        },
        calls: {
            total: number;
        }
    }
}