import {
  IsString,
  IsInt,
  IsNotEmpty,
  NotEquals,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @NotEquals('')
  @Min(1)
  @Max(10)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Max(50)
  readonly desc: string;
}
