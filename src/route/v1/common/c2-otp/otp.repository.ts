import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Otp, OtpDocument } from './schemas/otp.schema';

@Injectable()
export default class OtpRepository extends BaseRepository<OtpDocument> {
  private otpModel: PaginateModel<OtpDocument>;

  constructor(@InjectModel(Otp.name) model: PaginateModel<OtpDocument>) {
    super(model);
    this.otpModel = model;
  }

  public async findByPhone(phone: string) {
    return this.otpModel.findOne({ phone });
  }

  public async findByEmail(email: string) {
    return this.otpModel.findOne({ email });
  }
}
