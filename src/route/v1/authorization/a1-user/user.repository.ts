import bcrypt from 'bcryptjs';
import {
  PaginateModel, QueryOptions, Types, UpdateQuery
} from 'mongoose';

import { User, UserDocument } from '@authorization/a1-user/schemas/user.schema';
import BaseRepository from '@base-inherit/base.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UserRepository extends BaseRepository<UserDocument> {
  private userModel: PaginateModel<UserDocument>;

  constructor(@InjectModel(User.name) userModel: PaginateModel<UserDocument>) {
    super(userModel);
    this.userModel = userModel;
  }

  /**
   * Create
   * @param user
   * @returns
   */
  public async create(user: any): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  /**
   * Update password
   * @param data
   * @returns
   */

  public async updatePassword(filter = {}, password: string) {
    const user = await this.userModel.findOne(filter);

    if (!user) throw new NotFoundException('User not found.');

    user.password = password;
    return user.save();
  }

  /**
   * Find one by id
   * @param id
   * @param options
   * @returns
   */
  public async findOneById(
    id: Types.ObjectId,
    options: QueryOptions = {},
  ): Promise<UserDocument | null> {
    return this.userModel.findById(id, options.projection, options);
  }

  /**
   * Find one by
   * @param query
   * @param options
   * @returns
   */
  public async findOneBy(
    query = {},
    options = {},
  ): Promise<UserDocument | null> {
    return this.userModel.findOne(query, options);
  }

  /**
   * Find one by ids
   * @param ids
   * @returns
   */
  public async findOneByIds(ids: Types.ObjectId[]): Promise<UserDocument[]> {
    return this.userModel.find({ _id: { $in: ids } }).lean();
  }

  /**
   * Find by phone
   * @param phone
   * @returns
   */
  public async findByPhone(phone: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ phone });
  }

  /**
   * Find by tokenLogin
   * @param tokenLogin
   * @returns
   */
  public async findByTokenLogin(
    tokenLogin: string,
  ): Promise<UserDocument | null> {
    return this.userModel.findOne({ tokenLogin }).lean();
  }

  /**
   * Update by phone
   * @param phone
   * @param data
   * @returns
   */
  public async updateByPhone(
    phone: string,
    data: UpdateUserDto,
  ): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(
      { phone },
      data as UpdateQuery<UserDocument>,
      { new: true },
    );
  }

  /**
   * Update fcmTokes
   * @param id
   * @param fcmTokens
   * @returns
   */
  public async updateFcmTokensById(id: Types.ObjectId, fcmTokens: string[]) {
    return this.userModel.findByIdAndUpdate(id, { fcmTokens }, { new: true });
  }

  /**
   * Update one by id
   * @param id
   * @param data
   * @param options
   * @returns
   */
  public async updateOneById(
    id: Types.ObjectId,
    data: any,
    options: any = { new: true },
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      data as UpdateQuery<UserDocument>,
      options,
    );
  }

  /**
   * Compare password by id
   * @param id
   * @param password
   * @returns
   */
  public async comparePasswordById(id: Types.ObjectId, password: string) {
    const user = await this.userModel.findById(id).select('password').lean();
    if (!user) throw new NotFoundException('User not found.');

    return bcrypt.compareSync(password, user.password);
  }
}
