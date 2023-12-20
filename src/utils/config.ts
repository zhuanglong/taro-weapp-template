// 问题1： `const env = process.env; env.xx` 这样读取会报错 `ReferenceError: process is not defined`
// ref: https://github.com/NervJS/taro/issues/14252#issuecomment-1733307841

export function getAppInfo() {
  return {
    appName: process.env.TARO_APP_NAME || '',
    appEnv: process.env.TARO_APP_ENV || '',
    apiPrefix: process.env.TARO_APP_API_PREFIX || '',
  };
}

export function isDevMode(): boolean {
  // node 的编译环境
  return process.env.NODE_ENV === 'development';
}

export function isProdMode(): boolean {
  // node 的编译环境
  return process.env.NODE_ENV === 'production';
}

// 是否使用 mock 代替 api 返回
export function useMock(): boolean {
  return process.env.TARO_APP_USEMOCK === 'true';
}
