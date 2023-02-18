import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  RequestChat,
  RequestChatDocument,
} from './schemas/request-chat.schema';

@Injectable()
export default class RequestChatRepository extends BaseRepository<RequestChatDocument> {
  constructor(
    @InjectModel(RequestChat.name) model: PaginateModel<RequestChatDocument>,
  ) {
    super(model);
  }
}
