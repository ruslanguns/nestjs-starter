import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateContactAddressDto } from './create-contact-address.dto';

export class UpdateContactAddressDto extends PartialType(CreateContactAddressDto) {
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
