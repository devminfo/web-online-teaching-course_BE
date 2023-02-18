import axios from 'axios';
import fs from 'fs';
import { phone } from 'phone';

import { PathsObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

require('dotenv').config();

export class ShareFunction {
  private static readonly processENV: any = process.env;

  public static env() {
    return this.processENV;
  }

  public static async httpPOST(url: string, data: any) {
    try {
      const rs = await axios.post(url, data);
      return rs;
    } catch (e) {
      /* eslint no-console: 0 */
      console.log('httpPOST catch', url, (e as any).toString());
    }
  }

  public static async httpGET(url: string) {
    try {
      const rs = await axios.get(url);
      return rs;
    } catch (e) {
      /* eslint no-console: 0 */
      console.log('httpPOST catch', url, (e as any).toString());
    }
  }

  public static getClientUrl() {
    return this.env().CLIENT_URL;
  }

  static otpCharset = '0123456789';

  // eslint-disable-next-line
  /*eslint no-useless-escape: 0*/
  static emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  public static checkVariableHasValue(key: any) {
    return key !== undefined && key !== null && key !== '';
  }

  public static checkIsConfigS3Storage(): boolean {
    return (
      ShareFunction.checkVariableHasValue(ShareFunction.env().STORAGE_SERVER)
      && ShareFunction.env().STORAGE_SERVER === 's3'
      && ShareFunction.checkVariableHasValue(
        ShareFunction.env().S3_ACCESS_KEY_ID,
      )
      && ShareFunction.checkVariableHasValue(
        ShareFunction.env().S3_ACCESS_KEY_SECRET,
      )
      && ShareFunction.checkVariableHasValue(ShareFunction.env().S3_REGION)
      && ShareFunction.checkVariableHasValue(
        ShareFunction.env().S3_BUCKET_NAME_PATH,
      )
    );
  }

  public static getConfigRedis(): string | undefined {
    return ShareFunction.checkVariableHasValue(ShareFunction.env().REDIS_URL)
      ? ShareFunction.env().REDIS_URL
      : '';
  }

  public static isConfigRedis(): boolean {
    return ShareFunction.checkVariableHasValue(ShareFunction.env().REDIS_URL);
  }

  public static isConfigWebsocket(): boolean {
    return ShareFunction.checkVariableHasValue(
      ShareFunction.env().ENABLE_WEBSOCKET,
    );
  }

  public static makeOTP(length: number) {
    let result = '';
    const charactersLength = ShareFunction.otpCharset.length;
    for (let i = 0; i < length; i += 1) {
      result += ShareFunction.otpCharset.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
    return result;
  }

  public static isEmailValid(email: string) {
    if (!email) return false;

    if (email.length > 254) return false;

    const valid = ShareFunction.emailRegex.test(email);
    if (!valid) return false;

    // Further checking of some things regex can't handle
    const parts = email.split('@');
    if (parts[0].length > 64) return false;

    const domainParts = parts[1].split('.');
    if (
      domainParts.some((part) => {
        return part.length > 63;
      })
    ) return false;

    return true;
  }

  public static isPhoneValid(
    zipCode: string,
    phoneNumber: string,
    country?: string | undefined,
  ) {
    if (!zipCode || !phoneNumber) return false;

    if (zipCode.length > 10) return false;
    if (phoneNumber.length > 30) return false;

    const resultPhoneValidate = phone(`${zipCode}${phoneNumber}`, { country });

    if (!resultPhoneValidate) return false;

    return resultPhoneValidate.isValid;
  }

  public static checkVariableIsNotNullOrEmpty(variable: any) {
    return variable !== undefined && variable != null && variable !== '';
  }

  public static isConfigMongoDB(): boolean {
    const mongodbURL = ShareFunction.env().MONGODB_URL;
    return ShareFunction.checkVariableIsNotNullOrEmpty(mongodbURL);
  }

  public static isConfigMailerSendgrid(): boolean {
    const mailerServer = ShareFunction.env().MAIL_SERVER;
    const mailerSendgridApiKey = ShareFunction.env().MAILER_SENDGRID_API_KEY;
    const mailerFromName = ShareFunction.env().MAILER_FROM_NAME;
    const mailerFromEmail = ShareFunction.env().MAILER_FROM_EMAIL;

    return (
      ShareFunction.checkVariableIsNotNullOrEmpty(mailerServer)
      && mailerServer === 'sendgrid'
      && ShareFunction.checkVariableIsNotNullOrEmpty(mailerSendgridApiKey)
      && ShareFunction.checkVariableIsNotNullOrEmpty(mailerFromName)
      && ShareFunction.checkVariableIsNotNullOrEmpty(mailerFromEmail)
    );
  }

  public static isConfigMailerGmail(): boolean {
    const mailerServer = ShareFunction.env().MAIL_SERVER;
    const mailerGmailUsername = ShareFunction.env().MAILER_GMAIL_USERNAME;
    const mailerGmailPassword = ShareFunction.env().MAILER_GMAIL_PASSWORD;
    const mailerFromName = ShareFunction.env().MAILER_FROM_NAME;
    const mailerFromEmail = ShareFunction.env().MAILER_FROM_EMAIL;

    return (
      ShareFunction.checkVariableIsNotNullOrEmpty(mailerServer)
      && mailerServer === 'gmail'
      && ShareFunction.checkVariableIsNotNullOrEmpty(mailerGmailUsername)
      && ShareFunction.checkVariableIsNotNullOrEmpty(mailerGmailPassword)
      && ShareFunction.checkVariableIsNotNullOrEmpty(mailerFromName)
      && ShareFunction.checkVariableIsNotNullOrEmpty(mailerFromEmail)
    );
  }

  public static isConfigS3(): boolean {
    const storageServer = ShareFunction.env().STORAGE_SERVER;
    const s3AccessKeyID = ShareFunction.env().S3_ACCESS_KEY_ID;
    const s3AccessKeySecret = ShareFunction.env().S3_ACCESS_KEY_SECRET;
    const s3Region = ShareFunction.env().S3_REGION;
    const s3BucketNamePath = ShareFunction.env().S3_BUCKET_NAME_PATH;

    return (
      ShareFunction.checkVariableIsNotNullOrEmpty(storageServer)
      && storageServer === 's3'
      && ShareFunction.checkVariableIsNotNullOrEmpty(s3AccessKeyID)
      && ShareFunction.checkVariableIsNotNullOrEmpty(s3AccessKeySecret)
      && ShareFunction.checkVariableIsNotNullOrEmpty(s3Region)
      && ShareFunction.checkVariableIsNotNullOrEmpty(s3BucketNamePath)
    );
  }

  public static isFileExist(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  public static readFileSync(filePath: string): any {
    return fs.readFileSync(filePath);
  }

  public static isEnableUserVerify(): boolean {
    const enableUserVerify = ShareFunction.env().ENABLE_USER_VERIFY;
    return (
      ShareFunction.checkVariableIsNotNullOrEmpty(enableUserVerify)
      && enableUserVerify === 'true'
    );
  }

  public static isEnableWebsocket(): boolean {
    const enableWebsocket = ShareFunction.env().ENABLE_WEBSOCKET;
    return (
      ShareFunction.checkVariableIsNotNullOrEmpty(enableWebsocket)
      && enableWebsocket === 'true'
    );
  }

  public static isEnableSwagger(): boolean {
    const enableSwagger = ShareFunction.env().IS_ENABLE_SWAGGER;
    return (
      ShareFunction.checkVariableIsNotNullOrEmpty(enableSwagger)
      && enableSwagger === 'true'
    );
  }

  public static toSlug(str: string): string {
    let _str = str;
    _str = _str.toLowerCase();
    _str = _str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    _str = _str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    _str = _str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    _str = _str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    _str = _str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    _str = _str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    _str = _str.replace(/(đ)/g, 'd');
    _str = _str.replace(/([^0-9a-z-\s])/g, '');
    _str = _str.replace(/(\s+)/g, '-');
    _str = _str.replace(/^-+/g, '');
    _str = _str.replace(/-+$/g, '');
    return _str;
  }

  public static isNullOrEmpty(variable: any): boolean {
    return (
      !variable
      || variable === undefined
      || variable === null
      || variable === ''
      || variable.length === 0
    );
  }

  public static refactorRouterByResource(paths: PathsObject): any[] {
    let routerByResource: any = {};

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const itemPathKey in paths) {
      const itemPath = paths[itemPathKey] as any;
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const itemPathMethodKey in itemPath as any) {
        const itemPathMethod = itemPath[itemPathMethodKey] as any;
        const endpointObject = {
          method: itemPathMethodKey.toUpperCase(),
          endpoint: itemPathKey,
          tags: itemPathMethod.tags,
        };
        routerByResource = ShareFunction.checkEndpointResourceExist(
          endpointObject,
          routerByResource,
        );
      }
    }

    const routerMapArray = [];
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const routerMapKey in routerByResource) {
      routerMapArray.push(routerByResource[routerMapKey]);
    }

    return routerMapArray;
  }

  public static checkEndpointResourceExist(endpoint: any, routeMap: any): any {
    const _routeMap = routeMap;
    let resourceName = 'Undefined';
    if (
      !ShareFunction.isNullOrEmpty(endpoint)
      && !ShareFunction.isNullOrEmpty(endpoint.tags)
      && !ShareFunction.isNullOrEmpty(endpoint.tags[0])
    ) {
      [resourceName] = endpoint.tags;
    }

    if (ShareFunction.isNullOrEmpty(routeMap[resourceName])) {
      _routeMap[resourceName] = {
        name: resourceName,
        permission: [
          {
            method: endpoint.method,
            endpoint: ShareFunction.convertTemplateToExpressEndpoint(
              endpoint.endpoint,
            ),
            auto: true,
          },
        ],
      };
    } else {
      _routeMap[resourceName].permission.push({
        method: endpoint.method,
        endpoint: ShareFunction.convertTemplateToExpressEndpoint(
          endpoint.endpoint,
        ),
        auto: true,
      });
    }
    return _routeMap;
  }

  public static convertTemplateToExpressEndpoint(endpoint: string): any {
    return endpoint.replace('{', ':').replace('}', '');
  }

  public static formatResourceName(resourceName: string): string {
    const _word1 = resourceName.split(' ');
    const word1 = _word1
      .map((item) => {
        return item[0].toUpperCase() + item.substring(1);
      })
      .join('-');
    const _word2 = word1.split('_');
    const word2 = _word2
      .map((item) => {
        return item[0].toUpperCase() + item.substring(1);
      })
      .join('-');
    return word2;
  }

  public static joinPathResourceUser(resourceName: any[]): string {
    const tempArray = resourceName.map((item) => item.path);
    const temp = tempArray.join('/');
    return temp;
  }

  public static joinPathResourceMobile(resourceName: any[]): string {
    const tempArray = resourceName.map((item) => item.path);
    const temp = tempArray.join('/');
    return temp;
  }

  public static joinPathResourceAdmin(resourceName: any[]): string {
    const tempArray = resourceName.map((item) => item.path);
    const temp = tempArray.join('/');
    return temp;
  }
}
export default new ShareFunction();
