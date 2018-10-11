import {
  IsString,
  IsInt,
  IsNotEmpty,
  NotEquals,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

export class TagDto {
  readonly id: number;
  readonly name: string;
  readonly index: number;
  readonly articles: any[];
  readonly user: object;
}

export class CreateTagDto {
  readonly id: number;
  readonly name: string;
  readonly index: number;
  readonly userId: number;
}
