# Taro3 + Vue3 + TS 微信小程序开发模板

## 特点

- 使用最新的 Taro3, Vue3, TypeScript, Pinia 等主流技术开发

- NutUI，自动按需引入

- 代码规范，ESLint + Prettier + StyleLint

- 够用的请求封装，包括异常处理，中断请求等

- 首屏 Loading，登录校验，zustand 状态管理及持久化

## 使用

```
# CLI 工具安装
npm install -g @tarojs/cli

# clone 项目
git clone https://github.com/zhuanglong/taro-weapp-template.git

# 切换到项目
cd taro-weapp-template

安装依赖
# yarn install

# 运行
yarn dev:weapp

# 打包
yarn build:weapp--prod

# 预览
下载并打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，然后选择 taro-weapp-template 项目根目录进行预览。
```

## VSCode 插件

为了更好的开发体验，建议安装推荐的插件 `.vscode/extensions.json`。

## 常见问题

- 行内样式单位转换 [文档](https://taro-docs.jd.com/docs/size#api)
- CSS 编译时忽略（过滤）[文档](https://taro-docs.jd.com/docs/size#css-%E7%BC%96%E8%AF%91%E6%97%B6%E5%BF%BD%E7%95%A5%E8%BF%87%E6%BB%A4)
- [vue3 具名插槽失效](https://github.com/NervJS/taro/issues/8104) [文档](https://taro-docs.jd.com/docs/hybrid/#%E4%BD%BF%E7%94%A8-slot)
- 预览模式生成的文件较大，设置 NODE_ENV 为 production 可以开启压缩。
  ```
  `taro build --type weapp --mode development --env production --watch`

  `--env production` 在开发模式下，启用生产编译，产出的包小很多
  ```

## 其他限制

- 小程序中不支持 `<style scoped>`，建议使用 cssModules 代替。

  ```
  import styles from './HelloWorld.module.scss'
  <text :class="styles.title">{{ msg }}</text>
  
  # 编译后
  class="HelloWorld-module__title___2orUO"
  ```

- 不能在页面组件的 DOM 树之外插入元素，因此不支持 `<teleport>`。

- Vue 3 内部实现使用了 Proxy ，在 iOS 9 及以下操作系统无法运行。但 Vue 官方团队在正式版发布后会推出兼容版本。

- 在 H5 端使用 ref 获取基础组件的 DOM 节点，现在只能得到适配层的 Vue 组件实例，而不是对应的 webComponent 根节点。在 Vue2 里可以通过修改父元素的 refs 属性实现，但 Vue3 中组件间初始化顺序有变化，因此暂时不能支持。

- 小程序端非类似 HTML 表单标签规范的表单组件，如 Picker，暂不兼容 v-model。Vue3 的 v-model 绑定属性改为了 modelValue，事件绑定改为了 update:modelValue。对于 HTML 表单标签会自动对接表单的值与事件，例如 input 会自动对应 modelValue 与 value、update:modelValue 与 @input。但对于 Picker 这种小程序特有表单则无法对应，建议这种情况不使用 v-model。

- VirtualList 组件需要实现一份 Vue3 版本（待实现）。

- 所有组件的 id 必须在整个应用中保持唯一（即使他们在不同的页面），否则可能导致事件不触发的问题。
