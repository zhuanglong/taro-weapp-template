const Mock =
  process.env.TARO_ENV === 'h5' ? require('better-mock') : require('better-mock/dist/mock.mp.js');

import { sleep } from '@/utils';
import { getAppInfo } from '@/utils/config';
import { resultSuccess } from './_util';

const { apiPrefix } = getAppInfo();

export default {
  [`${apiPrefix}/test/random`]: (timeout: number) => {
    return sleep(timeout).then(() => resultSuccess(Mock.Random.color()));
  },
} as Record<string, any>;
