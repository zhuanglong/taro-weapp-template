/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    TARO_APP_NAME: string;
    TARO_APP_ENV: string; // 打包部署的环境
    TARO_APP_API_PREFIX: string;
  }
}

declare module '@tarojs/components' {
  export * from '@tarojs/components/types/index.vue3';
}
