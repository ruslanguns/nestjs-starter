import { GenderEnum } from '../enums';

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

export interface IContactInfo {
  name: string;
  middleName: string;
  lastName: string;
  birthday: Date;
  gender: GenderEnum;
  address: IAddress[];
}

interface IAddress {
  street: string;
  street2: string;
  city: string;
}
