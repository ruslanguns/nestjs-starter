import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from 'src/modules/users/entities';

@ValidatorConstraint({ async: true })
export class IsUsernameAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(username: any, args: ValidationArguments) {
    const query = getRepository<User>(User)
      .createQueryBuilder()
      .where('username = :username', { username });
    const result = await query.getOne(); // return true if user exists
    if (result) return false;
    return true;
  }
}

export function IsUsernameAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAlreadyExistConstraint,
    });
  };
}
