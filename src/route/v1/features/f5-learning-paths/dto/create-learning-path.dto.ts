import { Type } from 'class-transformer';
import {
  IsArray, IsNotEmpty, IsString, ValidateNested
} from 'class-validator';
import { LearningPathGroupDto } from 'src/util/types/dto/learning-path-group.dto';

export default class CreateLearningPathDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly desc: string;

  @IsNotEmpty()
  @IsString()
  readonly thumbnail: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LearningPathGroupDto)
  readonly learningPathGroups: LearningPathGroupDto[];
}
