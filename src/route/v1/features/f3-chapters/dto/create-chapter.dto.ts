import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export default class CreateChapterDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly idCourse: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly position: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly lectures: string[];
}
