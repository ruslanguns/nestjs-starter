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
export class IsUsernameAlreadyExistConstraint implements ValidatorConstraintInterface {

  async validate(username: any, args: ValidationArguments) {

    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    if (relatedValue === undefined || relatedValue === null)
      return true;

    const query = getRepository<User>(User)
      .createQueryBuilder()
      .where('username = :username', { username })
    const user = await query.getOne(); // return true if user exists
    console.log(user);
    return !user;
  }

}

export function IsUsernameAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAlreadyExistConstraint
    });
  };
}