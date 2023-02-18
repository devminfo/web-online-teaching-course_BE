import fs from 'fs';

import { ShareFunction } from '@helper/static-function';
import { ConsoleLogger, Injectable } from '@nestjs/common';

import getLogLevels from './logger.level';

@Injectable()
export default class CustomLoggerService {
  constructor(private readonly logger: ConsoleLogger) {
    this.logger = new ConsoleLogger();
    this.setLogLevels();
    this.log('CustomLoggerModule init success');
  }

  /**
   * Set log levels
   */
  setLogLevels() {
    const logLevels = getLogLevels(
      ShareFunction.env().NODE_ENV === 'production',
    );
    this.logger.setLogLevels(logLevels);
  }

  /**
   * Log info
   * @param context
   * @param messages
   */
  log = (context?: string, ...messages: any) => {
    const _names = messages.map((item: any) => JSON.stringify(item, null, '\t'));
    const messageFinal = `\n${_names.join('\n')}`;

    this.appendFileLog(context, messages);

    this.logger.log([context, messageFinal]);
  };

  /**
   * Log error
   * @param context
   * @param messages
   */
  error = (context?: string, ...messages: any) => {
    const _names = messages.map((item: any) => JSON.stringify(item, null, '\t'));

    const messageFinal = `\n${_names.join('\n')}`;

    this.appendFileError(context, messages);

    this.logger.error([context, messageFinal]);
  };

  /**
   * Log warn
   * @param context
   * @param messages
   */
  warn = (context?: string, ...messages: any) => {
    const _names = messages.map((item: any) => JSON.stringify(item, null, '\t'));
    const messageFinal = `\n${_names.join('\n')}`;
    this.logger.warn([context, messageFinal]);
  };

  /**
   * Log debug
   * @param context
   * @param messages
   */
  debug = (context?: string, ...messages: any) => {
    const _names = messages.map((item: any) => JSON.stringify(item, null, '\t'));
    const messageFinal = `\n${_names.join('\n')}`;
    this.logger.debug([context, messageFinal]);
  };

  /**
   * Log verbose
   * @param context
   * @param messages
   */
  verbose = (context?: string, ...messages: any) => {
    const _names = messages.map((item: any) => JSON.stringify(item, null, '\t'));
    const messageFinal = `\n${_names.join('\n')}`;
    this.logger.verbose([context, messageFinal]);
  };

  /**
   * Append file error
   * @param context
   * @param messages
   */
  private appendFileLog(context: string = 'INFO LOG', messages: any[]) {
    const currentDate = new Date();

    // config path
    const path = 'public/log/info/';
    const fileName = `${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}.log`;

    // config date
    const options = {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat([], <any>options);

    // Set title
    const date = `Date: ${formatter.format(new Date())}`;
    const title = `Title: ${context}`;

    // get message
    const text = [date, title, 'Data: ', ...messages].map((item: any) => JSON.stringify(item, null, '\t'));

    const messageFinal = `\n\n\n${text.join('\n')}`;

    // append file
    fs.appendFileSync(`${path}/${fileName}`, messageFinal);
  }

  /**
   * Append file error
   * @param context
   * @param messages
   */
  private appendFileError(context: string = 'ERROR LOG', messages: any[]) {
    const currentDate = new Date();

    // config path
    const path = 'public/log/error/';
    const fileName = `${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}.log`;

    // config date
    const options = {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat([], <any>options);

    // Set title
    const date = `Date: ${formatter.format(new Date())}`;
    const title = `Title: ${context}`;

    // get message
    const text = [date, title, 'Data: ', ...messages].map((item: any) => JSON.stringify(item, null, '\t'));

    const messageFinal = `\n\n\n${text.join('\n')}`;

    // append file
    fs.appendFileSync(`${path}/${fileName}`, messageFinal);
  }
}
