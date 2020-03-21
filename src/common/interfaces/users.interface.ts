export interface IUser {
    id: string;
    name?: string;
    lastname?: string;
    email: string;
    password: string;
    roles?: string[],
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    auth?: {
        email: {
            valid: boolean;
        }
    };
    secrets?: {
        fusionpbx: string;
    };
    stats?: { // Projections
        login: {
            attempts: number;
            lastLogin: Date;
        },
        calls: {
            total: number;
        }
    }
}