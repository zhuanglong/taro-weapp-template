import Mock from 'better-mock/dist/mock.mp.js';

import { resultSuccess } from './_util';
import { sleep } from '@/utils';

export default {
  '/dev-api/test/random': (timeout: number) => {
    return sleep(timeout).then(() => resultSuccess(Mock.Random.color()));
  },
} as Record<string, any>;
