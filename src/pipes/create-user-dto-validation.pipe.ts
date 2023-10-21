import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class CreateUserRequestValidator
  implements PipeTransform<CreateUserDto>
{
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata || !(metadata.metatype === CreateUserDto)) {
      return value;
    }

    const user: CreateUserDto = plainToClass(metadata.metatype, value);
    if (user.userName.length <= 4 || user.userName.length > 16) {
      throw new BadRequestException(
        'length of userName should be between 4 and 16',
      );
    }

    if (user.password.length <= 4 || user.password.length > 16) {
      throw new BadRequestException(
        'length of userName should be between 4 and 16',
      );
    }

    return value;
  }
}
