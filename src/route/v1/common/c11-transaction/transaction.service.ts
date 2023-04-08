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
  async confirm(
    id: ObjectId,
    item: {
      status: TransactionStatusEnum;
      title: string;
      content: string;
      type: string;
    },
  ) {
    const [transaction, admin] = await Promise.all([
      this.transactionRepository.findOneBy(
        {
          _id: id,
          status: TransactionStatusEnum.CHECKING,
        },
        {
          populate: 'idUser',
        },
      ),
      this.userService.getAdmin(),
    ]);

    const linkVerify = `http://localhost:3000/verify/${transaction._id}/${item.type}`;

    if (!transaction) throw new BadRequestException('Transaction not found.');

    if (item.type === TransactionStatusEnum.SUCCESS) {
      // send transaction email success
      await this.mailerService.sendLinkVerify(
        linkVerify,
        transaction.idUser?.email,
        item.title,
        admin?.email,
      );
    }

    // Create notification
    const itemNotification = {
      createdBy: admin?._id,
      usersReceived: [transaction.idUser],
      entityType: NotificationEntityTypeEnum.TRANSACTION,
      idEntity: transaction._id,
      title: item.title,
      content: item.content,
    };

    const [notification, transactionUpdated] = await Promise.all([
      this.notificationRepository.create(itemNotification),
      this.transactionRepository.updateOneById(id, item.status),
    ]);

    return transactionUpdated;
  }

  /**
   * Buy Course
   *
   * @param body
   * @returns
   */
  async buyCourse(body: CreateTransactionDto): Promise<any> {
    const result = await this.create(body);

    return result;
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
