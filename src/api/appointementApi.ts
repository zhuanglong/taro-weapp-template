import { ApiResult } from '@/utils/request';

export interface ResActivitySchedule {
  _id: string;
  subject: string;
  locale: string;
  start_time: string;
  end_time: string;
}
export interface ReqInsertAppointementInfo {
  name: string;
  tel: string;
  chapterId: string;
  scheduleId: string;
}
export function insertAppointementInfo(params: ReqInsertAppointementInfo) {
  return new Promise<ApiResult>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: null,
        message: 'ok',
      });
    }, 1500);
  });
}

export interface ResAppointementRecord {
  name: string;
  tel: string;
}
export function getAppointementRecord() {
  return new Promise<ApiResult<ResAppointementRecord[]>>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: Array(20)
          .fill(null)
          .map((item, index) => ({
            name: `Test_1${index}`,
            tel: `1311111${index}${index}${index}${index}`,
          })),
        message: 'ok',
      });
    }, 1500);
  });
}
