import dayjs from 'dayjs';

import BaseService from '@base-inherit/base.service';
import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import MailerService from '@lazy-module/mailer/mailer.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import {
  SendOtpByEmailDto, SendOtpByPhoneDto, VerifyOtpEmailDto, VerifyOtpPhoneDto
} from './dto';
import OtpRepository from './otp.repository';
import { Otp, OtpDocument } from './schemas/otp.schema';

@Injectable()
export default class OtpService extends BaseService<OtpDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly otpRepository: OtpRepository,
    readonly mailerService: MailerService,
  ) {
    super(logger, otpRepository);
  }

  /**
   * Send otp by phone
   * @param data CreateOtpDto
   * @returns OtpDocument
   */
  public async sendOtpByPhone(
    data: SendOtpByPhoneDto,
  ): Promise<OtpDocument | string> {
    // Check can refresh otp
    const otpRefresh = await this.refreshOtpByPhone(data.phone);
    if (otpRefresh) return otpRefresh;

    // send otp to phone number
    const otpCode = this.generateOTPCode();
    await this.sendPhoneVerify(data.phone, otpCode);

    // create new otp doc
    // FIXME [PRODUCTION]: Remove comment
    // return this.otpRepository.create({ ...data, otpCode });

    // FIXME [DEVELOPMENT]: comment
    await this.otpRepository.create({ ...data, otpCode });
    return otpCode;
  }

  /**
   * Send opt by email
   * @param email: string
   * @returns OtpDocument
   */
  public async sendOtpEmail({
    email,
  }: SendOtpByEmailDto): Promise<OtpDocument | string> {
    // check email exist
    const otpDoc = await this.refreshOtpByEmail(email);
    if (otpDoc) return otpDoc;

    // send otp to email
    const otpCode = this.generateOTPCode();
    await this.sendEmailVerify(email, otpCode);

    // create new otp doc
    // FIXME [PRODUCTION]: Remove comment
    // return this.otpRepository.create({ email, otpCode });

    // FIXME [DEVELOPMENT]: comment
    await this.otpRepository.create({ email, otpCode });
    return otpCode;
  }

  /**
   * Refresh otp by phone
   * @param phone: string
   * @returns OtpDocument
   */

  public async refreshOtpByPhone(
    phone: string,
  ): Promise<OtpDocument | null | string> {
    const otpDoc = await this.otpRepository.findByPhone(phone);
    if (!otpDoc) return null;

    // check time send otp
    const MAXIMUN_SECOND_SEND_OTP = 10;
    this.validateTimeSendOtp((<any>otpDoc).updatedAt, MAXIMUN_SECOND_SEND_OTP);

    // update otpCode
    const otpCode = this.generateOTPCode();

    // Send otp to phone
    await this.sendPhoneVerify(phone, otpCode);

    // save
    // FIXME [PRODUCTION]: Remove comment
    otpDoc.otpCode = otpCode;
    // return otpDoc.save();

    // FIXME [DEVELOPMENT]: Comment
    await otpDoc.save();
    return otpCode;
  }

  /**
   * Refresh otp by email
   * @param email: email
   * @returns OtpDocument
   */
  public async refreshOtpByEmail(
    email: string,
  ): Promise<OtpDocument | null | string> {
    const otpDoc = await this.otpRepository.findByEmail(email);
    if (!otpDoc) return null;

    // check time send otp
    // const MAXIMUN_SECOND_SEND_OTP = 1;
    // this.validateTimeSendOtp((<any>otpDoc).updatedAt, MAXIMUN_SECOND_SEND_OTP);

    // generate otpCode
    const otpCode = this.generateOTPCode();

    // send otp to email
    await this.sendEmailVerify(email, otpCode);

    // save
    // FIXME [PRODUCTION]: remove comment
    otpDoc.otpCode = otpCode;
    // return otpDoc.save();

    // FIXME [DEVELOPMENT]: comment
    await otpDoc.save();
    return otpCode;
  }

  /**
   * Send otp to phone
   * @param phone: string
   * @param otp: string
   * @returns Promise<Otp>
   */
  private async sendPhoneVerify(
    phone: string,
    otp: string,
  ): Promise<Otp | null> {
    // TODO: Implement send OTP service
    // call api sent otp to phone

    return null;
  }

  /**
   * Send otp to email
   * @param email: string
   * @param otp: string
   * @returns Promise<Otp>
   */
  private async sendEmailVerify(email: string, otp: string): Promise<Boolean> {
    // TODO: Implement send OTP service
    // call api sent otp to phone
    await this.mailerService.sendOTP(otp, email, 'Verify OTP');

    return true;
  }

  /**
   * Verify otp by phone
   * @param data VerifyOtpPhoneDto
   * @returns Promise<OtpDocument>
   */
  public async verifyOtpPhone(data: VerifyOtpPhoneDto): Promise<OtpDocument> {
    const { otpCode, phone } = data;

    const otpDoc = await this.otpRepository.findByPhone(phone);

    // check expired otp
    if (!otpDoc) throw new BadRequestException('Phone does not exist or OTP has expired!');

    // Check is valid otpCode
    const isValidOtpCode = await otpDoc.compareOtpCode(otpCode);
    if (!isValidOtpCode) throw new BadRequestException('Invalid otp code.');

    // delete otp doc
    const deletedOpt = await this.otpRepository.deleteOneHardBy({
      phone: otpDoc.phone,
    });

    return deletedOpt;
  }

  /**
   * Verify otp by email
   * @param data VerifyOtpEmailDto
   * @returns Promise<OtpDocument>
   */
  public async verifyOtpEmail(data: VerifyOtpEmailDto): Promise<OtpDocument> {
    const { email, otpCode } = data;
    const otpDoc = await this.otpRepository.findByEmail(email);

    // check expired otp
    if (!otpDoc) throw new BadRequestException('Email does not exist or OTP has expired!');

    // check is valid otpCode
    const isValidOtpCode = await otpDoc.compareOtpCode(otpCode);
    if (!isValidOtpCode) throw new BadRequestException('Invalid otp code.');

    // delete otp doc
    const deletedOpt = await this.otpRepository.deleteOneHardBy({
      email: otpDoc.email,
    });
    return deletedOpt;
  }

  /**
   * generate otp code
   * @returns String
   */
  private generateOTPCode() {
    return ShareFunction.makeOTP(4);
  }

  /**
   * Validate time send otp
   * @param updatedAt datetime
   * @param maximunSecond number
   * @returns Boolean
   */
  private validateTimeSendOtp(updatedAt: string, maximunSecond = 30) {
    const secondsLeft = dayjs().diff(dayjs(updatedAt), 'second');
    const isValidTime = secondsLeft < maximunSecond;

    if (isValidTime) {
      throw new BadRequestException(
        `Please try again in ${maximunSecond - secondsLeft} seconds`,
      );
    }

    return isValidTime;
  }

  /**
   * validate phone number
   * @param zipCode string
   * @param phone string
   * @param country string
   * @returns Boolean
   */
  public validatePhone(
    phone: string,
    zipCode: string = '+84',
    country: string = 'VN',
  ) {
    const isPhoneValid = ShareFunction.isPhoneValid(zipCode, phone, country);
    if (!isPhoneValid) throw new BadRequestException('Invalid phone.');

    return isPhoneValid;
  }
}
