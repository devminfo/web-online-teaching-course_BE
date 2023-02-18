import { Request } from 'express';
import { ObjectId } from 'mongodb';

import { sharedApis } from '@constant/shared-api.constants';
import { MethodRouteEnum } from '@enum/method-route.enum';
import { routerHelper } from '@helper/router.helper';
import GlobalInstanceService from '@lazy-module/global-instance/global-instance.service';
import {
  CanActivate, ExecutionContext, ForbiddenException, Injectable
} from '@nestjs/common';

import { RoleUserEnum } from '../enum/role-user.enum';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private globalInstanceService: GlobalInstanceService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // get method and url in request
    const method = request.method as MethodRouteEnum;
    const url = request.route.path;

    // check freeApi
    const isFreeApiExist = await this.globalInstanceService.checkFreeApiExist(
      url,
      method,
    );
    if (isFreeApiExist) return true;

    // get tokenData
    const tokenDecoded = await this.getTokenDecodedByRequest(request);

    // get {"userId","role"} in tokenDecoded
    const { _id: userId, role } = tokenDecoded;
    // attach user to request
    request.user = { _id: userId, role };

    // check role "customer"
    if (role === RoleUserEnum.customer) {
      const isValidRole = await this.checkRoleCustomer(
        request,
        userId,
        url,
        method,
      );

      return isValidRole;
    }

    // check role "manager"
    if (role === RoleUserEnum.manager) {
      const [isValidRoleUser, isValidRoleAdmin] = await Promise.all([
        this.checkRoleCustomer(request, userId, url, method),
        this.checkRoleManager(userId, url, method),
      ]);

      // TODO:Improve performance
      // Save access history
      if (isValidRoleAdmin || isValidRoleUser) {
        this.globalInstanceService.saveHistory(userId, method, url);
      }

      return isValidRoleAdmin || isValidRoleUser;
    }

    throw new ForbiddenException('Role invalid.');
  }

  /**
   * Get tokendata from token in header
   * @param request
   * @returns
   */
  private async getTokenDecodedByRequest(request: Request) {
    // get token in header
    const token = request.headers.authorization?.split('Bearer')[1].trim();
    if (!token) throw new ForbiddenException('Please authentication.');

    // verify token
    return this.globalInstanceService.verifyTokenLogin(token);
  }

  /**
   * Check role customer
   * @param request
   * @param userId
   * @param url
   * @param method
   * @returns
   */
  private async checkRoleCustomer(
    request: Request,
    userId: string,
    url: string,
    method: MethodRouteEnum,
  ): Promise<boolean> {
    // check authUserAccess
    const isAuthUserAccessExist = await this.globalInstanceService.checkAuthUserAccessExist(url, method);
    if (isAuthUserAccessExist) return true;

    // check authUserId
    const authUserIdExist = await this.globalInstanceService.getAuthUserIdDocument(url, method);

    // check authUserIdExist
    if (authUserIdExist) {
      const idParam = request.params.id;

      return this.checkAuthUserIdExist(authUserIdExist, userId, idParam);
    }

    return false;
  }

  /**
   * Check role manager
   * @param userId
   * @param url
   * @param method
   * @returns
   */
  private async checkRoleManager(
    userId: string,
    url: string,
    method: MethodRouteEnum,
  ) {
    // get user
    const user = await this.globalInstanceService.getUserLoggedIn(userId);
    // check api in user
    if (this.validGroupApis(user.groupAPIDenines, url, method)) return false;
    if (this.validGroupApis(user.groupAPIAccesses, url, method)) return true;
    if (this.validGroupDetails(user.groupDetails, url, method)) return true;

    // check api in user groups
    // eslint-disable-next-line no-restricted-syntax
    for (const group of user.groups as any[]) {
      if (this.validGroupApis(group.groupAPIDenines, url, method)) return false;
      if (this.validGroupApis(group.groupAPIAccesses, url, method)) return true;
      if (this.validGroupDetails(group.groupDetails, url, method)) return true;
    }

    return false;
  }

  /**
   * Check valid "url" and "method" in "groupApis" array
   * @param groupApis
   * @param url
   * @param method
   * @returns
   */
  private validGroupApis(
    groupApis: any[],
    url: string,
    method: MethodRouteEnum,
  ) {
    return groupApis.some((groupApi) => {
      return groupApi.url === url && groupApi.accessMethods.includes(method);
    });
  }

  /**
   * Check valid "url" and "method" in "groupDetails" array
   * @param groupDetails
   * @param url
   * @param method
   * @returns
   */
  private validGroupDetails(
    groupDetails: {
      idGroupDetail: any;
      accessMethods: MethodRouteEnum[];
    }[],
    url: string,
    method: MethodRouteEnum,
  ) {
    const collectionName = routerHelper.getCollectionNameByUrl(url);
    return groupDetails.some((groupDetail) => {
      // check accessMethodsgroup detail
      const isAccessMethodsExist = groupDetail.accessMethods.includes(method);

      const lenghtCollectionFromRouter = collectionName.slice(0, -2).length;
      const lenghtCollectionFromDoc = groupDetail.idGroupDetail.collectionName.length;

      // check collectionName
      const isValidCollectionNameLength = lenghtCollectionFromDoc - lenghtCollectionFromRouter < 3;
      const isGroupDetailExist = isValidCollectionNameLength
        ? groupDetail.idGroupDetail.collectionName.startsWith(collectionName.slice(0, -2))
        : false;

      // check refers
      const isRefersExist = method === MethodRouteEnum.GET
        && groupDetail.idGroupDetail.refers.some((refName: string) => {
          return collectionName.startsWith(refName.toLowerCase());
        });

      return (isGroupDetailExist && isAccessMethodsExist) || isRefersExist;
    });
  }

  /**
   * Check authUserId
   * @param authUserIdExist
   * @param userId
   * @param idParam
   * @returns
   */
  private async checkAuthUserIdExist(
    authUserIdExist: any,
    userId: string,
    idParam: string,
  ): Promise<boolean> {
    const key = authUserIdExist.referId;
    const { collectionName } = authUserIdExist;

    //  filter
    const filter = { [key]: new ObjectId(userId), _id: new ObjectId(idParam) };

    // check documentExist
    return this.globalInstanceService.checkDocumentExist(
      collectionName,
      filter,
    );
  }
}
