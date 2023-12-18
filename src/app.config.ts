export default defineAppConfig({
  style: 'v2',
  networkTimeout: {
    request: 10000,
    connectSocket: 10000,
    uploadFile: 10000,
    downloadFile: 10000,
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  pages: [
    'pages/index/index',
    'pages/appointement/insertAppointement/index',
    'pages/appointement/appointementList/index',
    'pages/user/my/index',
    'pages/user/editUserinfo/index',
  ],
  tabBar: {
    color: '#7E828C',
    selectedColor: '#7E828C',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/images/homeUncheck@2x.png',
        selectedIconPath: 'assets/images/homeCheck@2x.png',
      },
      {
        pagePath: 'pages/user/my/index',
        text: '我的',
        iconPath: 'assets/images/myUncheck@2x.png',
        selectedIconPath: 'assets/images/myCheck@2x.png',
      },
    ],
  },
});
