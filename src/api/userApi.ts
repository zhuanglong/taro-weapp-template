import { httpClient, ApiResult } from '@/utils/request';
import { getAppInfo } from '@/utils/appEnv';

const { apiPrefix } = getAppInfo();

export interface ReqLogin {
  username: string;
  password: string;
}
export interface ResUserInfo {
  token: string;
  date: string;
  username: string;
  avatar: string;
  gender: 0 | 1;
  country: string;
  province: string;
}
export function login(params: ReqLogin) {
  return httpClient.post<ApiResult<ResUserInfo>>({
    url: `${apiPrefix}/user/login`,
    data: params,
  });
}

export type ResLogout = null;
export function logout() {
  return httpClient.get<ApiResult<ResLogout>>({
    url: `${apiPrefix}/user/logout`,
  });
}
