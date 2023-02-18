import nodemailer from 'nodemailer';

import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import SendGridMail from '@sendgrid/mail';

import MailerTemplate from './template';

@Injectable()
export default class MailerService {
  private typeTransport: string | undefined;

  private nodeMailerInstance: any;

  constructor(private logger: CustomLoggerService) {
    this.init();
  }

  init() {
    if (ShareFunction.isConfigMailerSendgrid()) {
      this.initSendGridMail();
      return;
    }

    if (ShareFunction.isConfigMailerGmail()) {
      this.initNodeMailer();
      return;
    }

    this.logger.log(
      'MAIL_SERVER env was not found, MailerModule module was not init',
    );
  }

  private initSendGridMail() {
    this.typeTransport = 'sendgrid';
    SendGridMail.setApiKey(ShareFunction.env().MAILER_SENDGRID_API_KEY);
    this.logger.log('MailerModule SENDGRID init');
  }

  private initNodeMailer() {
    this.typeTransport = 'gmail';
    this.nodeMailerInstance = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ShareFunction.env().MAILER_GMAIL_USERNAME,
        pass: ShareFunction.env().MAILER_GMAIL_PASSWORD,
      },
    });

    this.logger.log('MailerModule GMAIL init');
  }

  public sendEmail(params: any) {
    if (this.typeTransport === 'sendgrid') return SendGridMail?.send(params);

    if (this.typeTransport === 'gmail') return this.nodeMailerInstance?.sendMail(params);

    return null;
  }

  public async sendOTP(
    verificationCode: string,
    to: string,
    subject: string,
    from?: string,
  ) {
    try {
      const nameFromEnv = ShareFunction.env().MAILER_FROM_NAME;
      const mailFromEnv = ShareFunction.env().MAILER_FROM_EMAIL;

      const params = {
        from: from ?? `"${nameFromEnv} ⭐" <${mailFromEnv}>`,
        to, // list of receivers like "bar@example.com, baz@example.com"
        subject, // Subject line
        html: MailerTemplate.templateOTP.render({
          VERIFICATION_CODE: verificationCode,
        }),
      };
      await this.sendEmail(params);
      this.logger.log('Send email success');
    } catch (e) {
      this.logger.log('MailerModule sendOTP', (e as any).toString());
    }
  }

  public async sendVerify(
    verificationLink: string,
    to: string,
    subject: string,
    from?: string,
  ) {
    try {
      const nameFromEnv = ShareFunction.env().MAILER_FROM_NAME;
      const mailFromEnv = ShareFunction.env().MAILER_FROM_EMAIL;

      const params = {
        from: from ?? `"${nameFromEnv} ⭐" <${mailFromEnv}>`,
        to, // list of receivers like "bar@example.com, baz@example.com"
        subject, // Subject line
        html: MailerTemplate.templateVerify.render({
          VERIFICATION_LINK: verificationLink,
        }),
      };

      await this.sendEmail(params);

      this.logger.log('Send email success');
    } catch (e) {
      this.logger.log('MailerModule sendOTP', (e as any).toString());
    }
  }
}
