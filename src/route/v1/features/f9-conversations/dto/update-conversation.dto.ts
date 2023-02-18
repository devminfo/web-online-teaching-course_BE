import { PartialType } from '@nestjs/mapped-types';

import CreateConversationDto from './create-conversation.dto';

export default class UpdateConversationDto extends PartialType(
  CreateConversationDto,
) {}
