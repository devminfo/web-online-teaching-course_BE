import { QueryOptions, Types } from 'mongoose';

import { UserDocument } from '@authorization/a1-user/schemas/user.schema';
import GroupService from '@authorization/a5-group/group.service';
import GroupDetailService from '@authorization/a6-group-detail/group-detail.service';
import GroupApiService from '@authorization/a7-group-api/group-api.service';
import BaseService from '@base-inherit/base.service';
import OtpService from '@common/c2-otp/otp.service';
import { adminConstants } from '@constant/admin.constants';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import CreateUserDto from './dto/create-user.dto';
import { UpdatePasswordByEmailDto } from './dto/update-password-by-email.dto';
import { UpdatePasswordByPhoneDto } from './dto/update-password-by-phone.dto';
import { updateRolesDto } from './dto/update-roles.dto';
import UpdateUserDto from './dto/update-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import UserRepository from './user.repository';

@Injectable()
export default class UserService extends BaseService<UserDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly userRepository: UserRepository,
    readonly otpService: OtpService,
    readonly groupDetailService: GroupDetailService,
    readonly groupService: GroupService,
    readonly groupApiService: GroupApiService,
  ) {
    super(logger, userRepository);
  }

  /**
   * Validate user
   * @param data
   * @returns
   */
  public async validateUser(data: ValidateUserDto) {
    const {
      phone, tokenLogin, email, username
    } = data;
    // Check phone exist
    if (phone) {
      const userExists = await this.userRepository.findByPhone(phone);
      if (userExists) return userExists;
    }

    // check tokenLogin exist
    if (tokenLogin) {
      const userExists = await this.userRepository.findByTokenLogin(tokenLogin);

      if (userExists) return userExists;
    }

    // check email exist
    if (email) {
      const userExists = await this.userRepository.findOneBy({ email });

      if (userExists) return userExists;
    }

    // check username exist
    if (username) {
      const userExists = await this.userRepository.findOneBy({ username });

      if (userExists) return userExists;
    }

    return null;
  }

  /**
   * Create user
   * @param user
   * @returns
   */
  public async create(user: CreateUserDto): Promise<UserDocument> {
    const { phone, tokenLogin, email } = user;
    // validate user
    const userExist = await this.validateUser({ phone, tokenLogin, email });

    if (userExist && !userExist.isDeleted) {
      throw new BadRequestException(
        'The account already exists in the system.',
      );
    }

    if (userExist && userExist.isDeleted) {
      const userUpdated = this.userRepository.updateOneById(userExist._id, {
        deleted: false,
      });

      return (<unknown>userUpdated) as UserDocument;
    }

    return this.userRepository.create(user);
  }

  /**
   * Update password by phone
   * @param _id
   * @param password
   * @returns
   */
  public async updatePasswordById(
    _id: Types.ObjectId,
    data: { newPassword: string; password: string },
  ) {
    // compare password
    const isValidPassword = await this.userRepository.comparePasswordById(
      _id,
      data.password,
    );

    // Check valid password
    if (!isValidPassword) throw new BadRequestException('Incorrect password.');

    return this.userRepository.updatePassword({ _id }, data.newPassword);
  }

  /**
   * Update password by phone
   * @param data
   * @returns
   */
  public async updatePasswordByPhone(data: UpdatePasswordByPhoneDto) {
    const { phone, otpCode, password } = data;
    await this.otpService.verifyOtpPhone({ phone, otpCode });

    return this.userRepository.updatePassword({ phone }, password);
  }

  /**
   * Update password by email
   * @param data
   * @returns
   */
  public async updatePasswordByEmail(data: UpdatePasswordByEmailDto) {
    const { email, otpCode, password } = data;

    await this.otpService.verifyOtpEmail({ email, otpCode });

    return this.userRepository.updatePassword({ email }, password);
  }

  /**
   * Update one by id
   * @param id
   * @param data
   * @param options
   * @returns
   */
  public async updateRolesById(
    id: Types.ObjectId,
    data: updateRolesDto,
    options = <any>{ new: true },
  ): Promise<UserDocument> {
    const user = await this.userRepository.updateOneById(id, data, options);

    if (!user) throw new NotFoundException('User not found.');

    return user;
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
    data: UpdateUserDto,
    options = { new: true },
  ): Promise<UserDocument> {
    const { phone, tokenLogin, email } = data;

    // validate user
    const userExist = await this.validateUser({ phone, tokenLogin, email });

    if (userExist) throw new BadRequestException('phone/email/tokenLogin already exist.');

    const user = await this.userRepository.updateOneById(id, data, options);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  /**
   * Update one by id
   * @param id
   * @param groupId
   * @returns
   */
  public async updateGroup(
    id: Types.ObjectId,
    groupId: Types.ObjectId,
    options: '$addToSet' | '$pull',
  ) {
    return this.userRepository.updateOneById(
      id,
      {
        [options]: { groups: groupId },
      },
      { new: true },
    );
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
    return this.userRepository.findOneById(id, options);
  }

  /**
   * Add device ID
   * @param id
   * @param deviceID
   * @returns
   */
  public async addDeviceID(
    id: Types.ObjectId,
    deviceID: string,
  ): Promise<UserDocument | null> {
    const updateData = { deviceID, $addToSet: { fcmTokens: deviceID } };

    return this.userRepository.updateOneById(id, updateData);
  }

  /**
   * Remove device ID
   * @param id
   * @param deviceID
   * @returns
   */
  public async removeDeviceID(id: Types.ObjectId, deviceID: string) {
    const updateData = { deviceID: '', $pull: { fcmTokens: deviceID } };

    const user = await this.userRepository.updateOneById(id, updateData);

    // if fcmTokens includes "DeviceID" => update: deviceID = user.fcmTokens[0]
    if (user?.fcmTokens.includes(deviceID)) {
      await this.userRepository.updateOneById(user._id, {
        deviceID: user.fcmTokens[0] || '',
      });
    }

    return user;
  }

  /**
   * With draw money
   * @param id
   * @param money
   * @returns
   */
  public async withdrawMoney(id: Types.ObjectId, money: Number): Promise<any> {
    const user = await this.userRepository.findOneById(id);

    // check user and money
    // if (!user || user.defaultAccount < money) {
    //   throw new NotFoundException(
    //     'User does not exist or has insufficient funds.',
    //   );
    // }

    // deduct money
    // user.defaultAccount -= +money;

    // save
    return user;
  }

  /**
   * Recharge money
   * @param id
   * @param money
   * @returns
   */
  public async rechargeMoney(
    id: Types.ObjectId,
    money: Number,
  ): Promise<UserDocument> {
    const user = await this.userRepository.findOneById(id);

    // check user
    if (!user) throw new NotFoundException('User does not exist.');

    // plus money
    // user.defaultAccount += +money;

    // save
    return user.save();
  }

  /**
   * Rest authorization
   *
   * @param router
   * @returns
   */
  async resetAuthorization(router: any) {
    // Reset all authorizations
    await Promise.all([
      this._resetGroupApis(router),
      this._resetGroupDetails(router),
    ]);

    // Create admin have all permissions
    return this._createAdmin();
  }

  /**
   * Create admin account
   * @returns
   */
  private async _createAdmin() {
    const adminItem = {
      email: adminConstants.email,
      password: adminConstants.password,
      role: adminConstants.role,
    };

    // Update account admin
    const [groupDetailsDoc, adminUser] = await Promise.all([
      this.groupDetailService.findManyBy({}),
      this.userRepository.findOneBy({ email: adminItem.email }),
    ]);

    // get groupDetails items
    const groupDetails = groupDetailsDoc.map((groupDetail: any) => {
      return {
        idGroupDetail: groupDetail._id,
        accessMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      };
    });

    // If admin exist => update
    if (adminUser) {
      return this.userRepository.updateOneById(adminUser._id, {
        groupDetails,
      });
    }

    // create new
    return this.userRepository.create({ ...adminItem, groupDetails });
  }

  /**
   * Reset group details
   * @param router
   */
  private async _resetGroupDetails(router: any) {
    // reset group details
    await this.groupDetailService.resetGroupDetails(router);

    // update groupDetails of user and groups.
    await Promise.all([
      this.userRepository.updateManyBy({}, { groupDetails: [] }),
      this.groupService.updateManyBy({}, { groupDetails: [] }),
    ]);
  }

  /**
   * Reset group apis
   * @param router
   */
  private async _resetGroupApis(router: any) {
    await this.groupApiService.resetGroupApis(router);

    const updateItems = { groupAPIAccesses: [], groupAPIDenines: [] };

    await Promise.all([
      this.userRepository.updateManyBy({}, updateItems),
      this.groupService.updateManyBy({}, updateItems),
    ]);
  }

  /**
   * Auto reset authorization and seed an account
   */
  async seedAdminAndResetAuthorization(router: any) {
    await this._resetGroupDetails(router);
    const admin = await this._createAdmin();
    this.logger.log('CREATE ACCOUNT ADMIN SUCCESSFULLY!');
    this.logger.log('Account admin: ', { email: admin?.email });
    this.logger.log('Total collections: ', admin?.groupDetails?.length);
  }
}
