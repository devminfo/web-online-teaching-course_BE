import {
  MessagingPayload, MulticastMessage, SendResponse,
} from 'firebase-admin/lib/messaging/messaging-api';
import { Types } from 'mongoose';

import FcmService from '@lazy-module/fcm/fcm.service';
import { UserFcmMessageInterface } from '@lazy-module/fcm/interfaces/user-fcm-message.interface';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { UserDocument } from '../schemas/user.schema';
import UserRepository from '../user.repository';

@Injectable()
export default class FcmUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fcmService: FcmService,
    private readonly logger: CustomLoggerService,
  ) {}

  /**
   * Create multicast message
   * @param tokens
   * @param message
   * @return
   */
  private createMulticastMessage(
    tokens: string[],
    message: UserFcmMessageInterface,
  ): MulticastMessage {
    const messages = {
      notification: {
        title: message.title,
        body: message.body,
        // image:
        //   'https://cdn.jobhopin.com/avatars/752bfbf6-e814-4c0e-af9b-1d29e6a5afe7.png',
      },
      data: message.data || {},
      android: {
        notification: {
          sound: 'default',
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
        },
      },
      apns: {
        payload: {
          aps: {
            badge: 1,
            sound: 'default',
          },
        },
      },
      tokens,
    } as MulticastMessage;

    return messages;
  }

  /**
   * push FCMToUsers
   * @param ids
   * @param message
   * @returns
   */
  public async pushFCMToUsers(
    ids: Types.ObjectId[],
    message: UserFcmMessageInterface,
  ): Promise<void> {
    const users = await this.userRepository.findOneByIds(ids);

    const tokens: string[] = [];
    const updateUsers: UserDocument[] = [];

    users.forEach((user) => {
      const { fcmTokens } = user;
      // check enableFCM == true and  fcmTokens.lenght > 0
      if (user.isEnableFCM && fcmTokens.length > 0) {
        // get valid fcmTokens
        const validFcmTokens = this.filterTokenValid(fcmTokens);
        // add fcmTokens to tokens
        tokens.unshift(...validFcmTokens);

        // update fcmTokens in user
        // eslint-disable-next-line no-param-reassign
        user.fcmTokens = validFcmTokens;
        updateUsers.push(user);
      }
    });

    // if tokens empty => return
    if (tokens.length === 0) return;

    // create messages
    const messages = this.createMulticastMessage(tokens, message);

    // push FCM to user
    const resultSend = await this.fcmService.pushFCMToUser(messages);

    // check result send and update fcmTokenValid in user
    if (resultSend && resultSend.responses) await this.updateFCMTokenValid(updateUsers, tokens, resultSend.responses);
  }

  /**
   * Update FCM token valid
   * @param users
   * @param tokens
   * @param sendResponses
   */
  private async updateFCMTokenValid(
    users: UserDocument[],
    tokens: string[],
    sendResponses: SendResponse[],
  ) {
    let usersWillUpdate: UserDocument[] = [];

    // loop send response and check, if error => update fcmTokens
    sendResponses.forEach((fcmResponse, index) => {
      if (!fcmResponse.success) {
        const tokenError = tokens[index];

        usersWillUpdate = this.updateUserFCMTokensInValid(users, tokenError);

        this.logger.error('updateFCMTokenValid', fcmResponse.error);
      }
    });

    await this.saveUsersFCMTokenValid(usersWillUpdate);
  }

  /**
   * Save users FCM token valid
   * @param users
   * @returns
   */
  private async saveUsersFCMTokenValid(users: UserDocument[]) {
    const updatedUsersPromise = users.map((user) => this.userRepository.updateFcmTokensById(user._id, user.fcmTokens));

    return Promise.all(updatedUsersPromise);
  }

  /**
   * Update user fcm tokens valid
   * @param users
   * @param token
   * @returns
   */
  private updateUserFCMTokensInValid(
    users: UserDocument[],
    token: string,
  ): UserDocument[] {
    users.forEach((user) => {
      // update fcmTokens valid
      // eslint-disable-next-line no-param-reassign
      user.fcmTokens = user.fcmTokens.filter((fcmToken) => fcmToken !== token);
    });

    return users;
  }

  /**
   * Filter token invalid
   * @param fcmTokens
   * @returns
   */
  public filterTokenValid(fcmTokens: string[]) {
    return fcmTokens.filter((token) => token);
  }

  /**
   * Push fcm to topic
   * @param topic
   * @param message
   */
  public async pushFCMToTopic(
    topic: string,
    message: UserFcmMessageInterface,
  ): Promise<void> {
    const messages = {
      notification: {
        title: message.title,
        body: message.body,
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
      data: message.data || {},
    } as MessagingPayload;

    const resultSend = await this.fcmService.pushFCMToTopic(topic, messages);

    this.logger.log(FcmUserService.name, resultSend);
  }
}
