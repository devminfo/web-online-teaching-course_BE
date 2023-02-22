import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ConversationDocument } from './schemas/conversation.schema';

@Injectable()
export default class ConversationRepository extends BaseRepository<ConversationDocument> {
  constructor(
    @InjectModel('Conversation') model: PaginateModel<ConversationDocument>,
  ) {
    super(model);
  }
}
