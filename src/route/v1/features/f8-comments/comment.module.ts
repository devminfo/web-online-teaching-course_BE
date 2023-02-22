import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import CommentController from './comment.controller';
import CommentRepository from './comment.repository';
import CommentService from './comment.service';
import { Comment, CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService, CommentRepository],
})
export default class CommentModule {}
