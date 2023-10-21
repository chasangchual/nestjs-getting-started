import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { NotIn } from 'src/transform/not-in.decorator';

export class CreateUserDto {
  @Transform((params) => {
    console.log(params);
    return params.value.trim();
  })
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @NotIn('password', {
    message: 'password is not allowed to include user name',
  })
  userName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  password: string;

  @IsEmail()
  email: string;
}
