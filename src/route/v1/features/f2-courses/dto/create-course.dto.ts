import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateCourseDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly idCategories: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly instructors: {
    position: number;
    idUser: string;
    fullName: string;
  }[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly title: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly target: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly targetDetails: { position: number; text: string; icon: string }[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly totalChapter: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly totalLectures: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly totalTime: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly requirements: { position: number; text: string; icon: string }[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly desc: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly isFree: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly price: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly promotionPrice: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly thumbnail: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly totalViews: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly totalLikes: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly totalDislikes: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly tags: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly isPrivate: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly usersJoined: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly classesJoined: string[];
}
