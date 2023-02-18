import { QueryOptions } from 'mongoose';
import { getConnectionDb } from 'src/util/database/getConnectionDB';

import { UserDocument } from '@authorization/a1-user/schemas/user.schema';
import UserService from '@authorization/a1-user/user.service';
import FreeApiService from '@authorization/a2-free-api/free-api.service';
import AuthUserAccessService from '@authorization/a3-auth-user-access/auth-user-access.service';
import AuthUserIdService from '@authorization/a4-auth-user-id/auth-user-id.service';
import TokenService from '@common/c1-auth/token.service';
import HistoryService from '@common/c9-history/history.service';
import { MethodRouteEnum } from '@enum/method-route.enum';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export default class GlobalInstanceService {
  constructor(
    private tokenService: TokenService,
    private freeApiService: FreeApiService,
    private authUserAccessService: AuthUserAccessService,
    private authUserIdService: AuthUserIdService,
    private userService: UserService,
    private historyService: HistoryService,
  ) {}

  /**
   * Check freeApi exist
   * @param url
   * @param method
   * @returns
   */
  public async checkFreeApiExist(
    url: String,
    method: MethodRouteEnum,
  ): Promise<Boolean> {
    const filter = { url, accessMethods: method };
    const count = await this.freeApiService.findAndCount(filter);

    return count >= 1;
  }

  /**
   * Check authUserAccess exist
   * @param url
   * @param method
   * @returns
   */
  public async checkAuthUserAccessExist(
    url: String,
    method: MethodRouteEnum,
  ): Promise<Boolean> {
    const filter = { url, accessMethods: method };
    const count = await this.authUserAccessService.findAndCount(filter);
    return count >= 1;
  }

  /**
   * get authUserIdDocument
   * @param url
   * @param method
   * @returns
   */
  public async getAuthUserIdDocument(
    url: String,
    method: MethodRouteEnum,
  ): Promise<any> {
    return this.authUserIdService.findOneByUrlAndMethod(url, method);
  }

  /**
   * Verify token login
   * @param token
   * @returns
   */
  public async verifyTokenLogin(token: string) {
    return this.tokenService.verifyAccessToken(token);
  }

  /**
   * Check document exist
   * @param collectionName
   * @param filter
   * @returns
   */
  public async checkDocumentExist(
    collectionName: string,
    filter = {},
  ): Promise<boolean> {
    const db = getConnectionDb();

    const document = await db.collection(collectionName).findOne(filter);

    return !!document;
  }

  /**
   * Get user logged in
   * @param userId
   * @return Promise<UserDocument>
   */
  public async getUserLoggedIn(userId: string): Promise<UserDocument> {
    const options: QueryOptions = {};

    // projection
    options.projection = 'groups groupAPIAccesses groupAPIDenines groupDetails';

    // populate groups
    const populateGroups = [
      {
        path: 'groupAPIAccesses',
        select: 'url accessMethods',
      },
      {
        path: 'groupAPIDenines',
        select: 'url accessMethods',
      },
      {
        path: 'groupDetails.idGroupDetail',
        select: 'collectionName accessMethods refers',
      },
    ];

    // set populate into options
    options.populate = [
      {
        path: 'groups',
        select: 'url accessMethods groupDetails',
        populate: populateGroups,
      },
      ...populateGroups,
    ];

    const user = await this.userService.findOneById(userId, options);

    if (!user) throw new ForbiddenException('Token user invalid.');

    return user;
  }

  /**
   * Save history
   * @param idUser
   * @param method
   * @param url
   * @returns
   */
  saveHistory(userId: string, method: MethodRouteEnum, url: string) {
    let action = 'READ';

    if (method === MethodRouteEnum.POST) action = 'CREATE';

    if (method === MethodRouteEnum.DELETE) action = 'DELETE';

    if (method === MethodRouteEnum.PUT) action = 'UPDATE';

    return this.historyService.create({
      idUser: userId, method, url, action,
    });
  }
}
