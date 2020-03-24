import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';


@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
    /**
     * Error Validation for typing for mongoose ID Format.
     * @param value String
     * @param metadata Argument
     */
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = Types.ObjectId.isValid(value);
        if (!isValid) {
            throw new BadRequestException('Invalid ObjectID');
        }
        return value;
    }
}
