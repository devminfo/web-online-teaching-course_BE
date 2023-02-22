import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import PostController from './post.controller';
import PostRepository from './post.repository';
import PostService from './post.service';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService, PostRepository],
})
export default class PostModule {}
