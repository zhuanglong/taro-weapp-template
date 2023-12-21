<template>
  <div>
    <div class="swiper-wrapper">
      <nut-swiper :height="150" pagination-visible pagination-color="#426543" auto-play="3000">
        <nut-swiper-item :key="item" v-for="item in bannerArr">
          <img :src="item" alt="" />
        </nut-swiper-item>
      </nut-swiper>
    </div>
    <div class="btn-wrapper">
      <div class="btn btn-1" @click="goAppointementPage">
        <div class="text">我要预约 <image class="icon" src="@/assets/images/item_more.png" /></div>
      </div>
      <div class="btn btn-2" @click="goAppointementListPage">
        <div class="text">预约记录 <image class="icon" src="@/assets/images/item_more.png" /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Taro from '@tarojs/taro';

  definePageConfig({
    navigationBarTitleText: 'Taro Weapp',
  });

  const bannerArr = [
    'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
    'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
    'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
    'https://storage.360buyimg.com/jdc-article/fristfabu.jpg',
  ];

  function goAppointementPage() {
    Taro.navigateTo({ url: '/pages/appointement/insertAppointement/index' });
  }

  function goAppointementListPage() {
    Taro.navigateTo({ url: '/pages/appointement/appointementList/index' });
  }
</script>

<style lang="scss">
  .swiper-wrapper {
    padding: 10px;

    .nut-swiper {
      border-radius: 10px;

      .nut-swiper-item img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .btn-wrapper {
    display: flex;
    padding: 10px;

    .btn {
      width: 50%;
      padding: 10px;
      border-radius: 8px;
      background-repeat: no-repeat;
      background-size: cover;

      &.btn-1 {
        background-image: url('../../assets/images/x1.png');
      }

      &.btn-2 {
        margin-left: 10px;
        background-image: url('../../assets/images/x2.png');
      }

      .text {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 18px;
        font-weight: bold;

        .icon {
          margin-left: 5px;
          width: 15px;
          height: 15px;
        }
      }
    }
  }
</style>
