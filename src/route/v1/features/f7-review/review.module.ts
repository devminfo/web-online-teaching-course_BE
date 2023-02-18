import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Review, ReviewSchema } from './schemas/review.schema';
import ReviewController from './review.controller';
import ReviewRepository from './review.repository';
import ReviewService from './review.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewService, ReviewRepository],
})
export default class ReviewModule {}
