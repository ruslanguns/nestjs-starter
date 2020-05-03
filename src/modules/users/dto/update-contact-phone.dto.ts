import { PartialType } from '@nestjs/swagger';
import { CreateContactPhoneDto } from '.';

export class UpdateContactPhoneDto extends PartialType(CreateContactPhoneDto) {
  phone: string;
}
