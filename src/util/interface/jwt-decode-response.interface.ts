import { RoleUserEnum } from '@enum/role-user.enum';

export interface JwtDecodeResponse {
  id: string,
  role: RoleUserEnum,
  iat: number,
  exp: number,
}
