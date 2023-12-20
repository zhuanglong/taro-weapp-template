import { httpClient, ApiResult } from '@/utils/request';
import { getAppInfo, useMock } from '@/utils/config';
import testMock from '@/mock/test';

const { apiPrefix } = getAppInfo();

export interface IPInfo {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  lat: number;
  lon: number;
  org: string;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
}

export function getIP() {
  return httpClient.get<IPInfo>({
    url: 'http://ip-api.com/json',
  });
}

export async function getRandomColor() {
  if (useMock()) {
    return testMock[`${apiPrefix}/test/random`]() as Promise<ApiResult<string>>;
  }
  return httpClient.post<ApiResult<string>>({
    url: `${apiPrefix}/test/random`,
  });
}
