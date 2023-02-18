import { PartialType } from '@nestjs/mapped-types';

import CreateRequestChatDto from './create-request-chat.dto';

export default class UpdateRequestChatDto extends PartialType(
  CreateRequestChatDto,
) {}
