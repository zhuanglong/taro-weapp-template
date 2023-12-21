import { createApp } from 'vue';
import Taro from '@tarojs/taro';

import { setupStore } from './stores';
import './app.scss';

const App = createApp({
  onLaunch() {
    const checkVersion = () => {
      const updateManager = Taro.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        // console.log('hasUpdate: ', res.hasUpdate);
      });
      updateManager.onUpdateReady(() => {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，请重启应用',
          showCancel: false,
        }).then((res) => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        });
      });
    };
    if (process.env.TARO_ENV === 'weapp') {
      checkVersion();
    }
  },
});

setupStore(App);

export default App;
