import * as admin from 'firebase-admin';
import { MessagingPayload, MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import path from 'path';

import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FcmService {
  constructor(private logger: CustomLoggerService) {
    this.init();
  }

  init() {
    const fileService = path.join(__dirname, './firebase-project-service.json');

    if (ShareFunction.isFileExist(fileService)) {
      const serviceAccount = ShareFunction.readFileSync(fileService).toString();

      try {
        const serviceAccountObj = JSON.parse(serviceAccount);

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccountObj),
        });

        this.logger.log('FcmModule init success');
      } catch (e) {
        this.logger.error((e as any).toString());
      }
    } else {
      this.logger.warn(
        `${__dirname}/firebase-project-service.json was not found, FcmModule was not init`,
      );
    }
  }

  public async pushFCMToUser(fcmTokens: MulticastMessage) {
    try {
      return await admin.messaging().sendMulticast(fcmTokens);
    } catch (e) {
      this.logger.log('FcmService pushFCMToUser', (e as any).toString());
    }
  }

  public async pushFCMToTopic(topic: string, fcmTokens: MessagingPayload) {
    try {
      return await admin.messaging().sendToTopic(topic, fcmTokens);
    } catch (e) {
      this.logger.log('FcmService pushFCMToTopic', (e as any).toString());
    }
  }
}
