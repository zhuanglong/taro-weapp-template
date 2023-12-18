# taro-weapp-template


## 优化

- 预览模式生成的文件较大，设置 NODE_ENV 为 production 可以开启压缩。

  ```
  `taro build --type weapp --mode development --env production --watch`

  `--env production` 在开发模式下，启用生产编译，产出的包小很多
  ```
