<template>
  <div>
    <Counter />
    <button class="nav-btn" @click="goPage">跳转测试页面</button>
  </div>
</template>

<script lang="ts" setup>
  import Taro from '@tarojs/taro';

  import Counter from '@/conponents/Counter/Counter.vue';

  definePageConfig({
    navigationBarTitleText: '我的',
  });

  function goPage() {
    Taro.navigateTo({ url: '/pages/user/editUserinfo/index' });
  }
</script>

<style lang="scss">
  .nav-btn {
    margin-top: 50px;
  }
</style>
