import {
  IsArray, IsEnum, IsNotEmpty, IsString
} from 'class-validator';

export class AddUsersDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  users: [];

  @IsNotEmpty()
  @IsEnum(['add', 'delete'])
  options: 'add' | 'delete';
}
