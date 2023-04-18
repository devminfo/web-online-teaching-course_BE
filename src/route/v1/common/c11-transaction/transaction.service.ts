import UserRepository from '@authorization/a1-user/user.repository';
import UserService from '@authorization/a1-user/user.service';
import BaseService from '@base-inherit/base.service';
import NotificationRepository from '@common/c12-notification/notification.repository';
import { TransactionStatusEnum } from '@enum/3.transaction-status.enum';
import { NotificationEntityTypeEnum } from '@enum/6.notification-entity-type.enum';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import MailerService from '@lazy-module/mailer/mailer.service';
import CreateTransactionDto from './dto/create-transaction.dto';

import { TransactionDocument } from './schemas/transaction.schema';
import TransactionRepository from './transaction.repository';
import { ShareFunction } from '@helper/static-function';
import UpdateTransactionDto from './dto/update-transaction.dto';

@Injectable()
export default class TransactionService extends BaseService<TransactionDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly transactionRepository: TransactionRepository,
    readonly notificationRepository: NotificationRepository,
    readonly userService: UserService,
    readonly mailerService: MailerService,
  ) {
    super(logger, transactionRepository);
  }

  /**
   * Confirm transaction
   *
   * @param id
   * @returns
   */
  async confirm(id: ObjectId, body: UpdateTransactionDto) {
    const [transaction, admin] = await Promise.all([
      this.transactionRepository.findOneBy(
        {
          _id: id,
          status: TransactionStatusEnum.CHECKING,
        },
        {
          populate: [
            {
              path: 'idUser',
            },
            {
              path: 'idCourse',
              populate: {
                path: 'instructor',
              },
            },
          ],
        },
      ),
      this.userService.getAdmin(),
    ]);

    const CLIENT_URL = ShareFunction.env().CLIENT_URL;
    const linkVerify = `${CLIENT_URL}/verify/${transaction._id}/${body.type}`;

    if (!transaction) throw new BadRequestException('Transaction not found.');

    const to = transaction.email;
    const from = transaction.dCourse.instructor?.email || 'noreply@gmail.com';

    if (body.status === TransactionStatusEnum.SUCCESS) {
      // send transaction email success
      await this.mailerService.sendLinkVerify(
        linkVerify,
        to,
        body.title!,
        from,
      );
    }

    // Create notification
    const itemNotification = {
      createdBy: admin?._id,
      usersReceived: [transaction.idUser],
      entityType: NotificationEntityTypeEnum.TRANSACTION,
      idEntity: transaction._id,
      title: body.title,
      content: body.content,
    };

    const [notification, transactionUpdated] = await Promise.all([
      this.notificationRepository.create(itemNotification),
      this.transactionRepository.updateOneById(id, body),
    ]);

    return transactionUpdated;
  }

  /**
   * upgrade to teacher
   *
   * @param body
   * @returns
   */
  async upgradeToTeacher(body: CreateTransactionDto): Promise<any> {
    const result = await this.create(body);

    return result;
  }
}
