import { ObjectId } from 'mongodb';

import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export default class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
  public transform(value: string): ObjectId {
    try {
      return ObjectId.createFromHexString(value);
    } catch (error) {
      throw new BadRequestException('Validation failed (ObjectId is expected)');
    }
  }
}
