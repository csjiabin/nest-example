import { IsNotEmpty } from 'class-validator';
export interface UserInterface {
  readonly name: string;
  readonly desc: string;
  readonly page: [string, number];
  readonly pagesize: [string, number];
}
