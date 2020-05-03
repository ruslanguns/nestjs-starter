import { PartialType } from '@nestjs/swagger';
import { CreateUserMetadataDto } from '.';

export class UpdateUserMetadataDto extends PartialType(CreateUserMetadataDto) {}
