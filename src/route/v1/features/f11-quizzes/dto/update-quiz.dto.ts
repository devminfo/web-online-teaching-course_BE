import { PartialType } from '@nestjs/mapped-types';

import CreateQuizDto from './create-quiz.dto';

export default class UpdateQuizDto extends PartialType(CreateQuizDto) {}
