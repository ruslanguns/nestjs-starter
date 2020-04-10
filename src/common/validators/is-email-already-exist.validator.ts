import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from "class-validator";
import { getRepository } from "typeorm";
import { User } from "src/modules/users/entities";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {

  async validate(email: any, args: ValidationArguments) {
    const query = getRepository<User>(User)
      .createQueryBuilder()
      .where('email = :email', { email })
    const result = await query.getOne(); // return true if user exists
    if (result) return false;
    return true;
  }

}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint
    });
  };
}