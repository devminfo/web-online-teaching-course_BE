import { PartialType } from '@nestjs/mapped-types';

import CreatePlayQuizDto from './create-play-quiz.dto';

export default class UpdatePlayQuizDto extends PartialType(CreatePlayQuizDto) {}
