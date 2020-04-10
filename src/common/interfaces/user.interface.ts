
export interface IUser {
  id?: number;
  email: string;
  username: string;
  password: string;
  enabled?: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}