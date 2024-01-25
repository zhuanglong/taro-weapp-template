<template>
  <view>
    <view class="swiper-wrapper">
      <nut-swiper :height="150" pagination-visible pagination-color="#426543" auto-play="3000">
        <nut-swiper-item :key="item" v-for="item in bannerArr">
          <image class="swiper-item-image" :src="item" mode="aspectFill" />
        </nut-swiper-item>
      </nut-swiper>
    </view>
    <view class="btn-wrapper">
      <view class="btn btn-1" @click="goAppointementPage">
        <view class="text">
          我要预约 <image class="icon" src="@/assets/images/item_more.png" />
        </view>
      </view>
      <view class="btn btn-2" @click="goAppointementListPage">
        <view class="text">
          预约记录 <image class="icon" src="@/assets/images/item_more.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import Taro from '@tarojs/taro';

  definePageConfig({
    navigationBarTitleText: '轻营地',
  });

  import home_banner_1 from '@/assets/images/home_banner_1.jpg';
  import home_banner_2 from '@/assets/images/home_banner_2.jpg';
  import home_banner_3 from '@/assets/images/home_banner_3.jpg';
  import home_banner_4 from '@/assets/images/home_banner_4.jpg';

  const bannerArr = [home_banner_1, home_banner_2, home_banner_3, home_banner_4];

  function goAppointementPage() {
    Taro.navigateTo({ url: '/pages/appointement/insert/index' });
  }

  function goAppointementListPage() {
    Taro.navigateTo({ url: '/pages/appointement/record/index' });
  }
</script>

<style lang="scss">
  .swiper-wrapper {
    padding: 10px;

    .nut-swiper {
      border-radius: 10px;
    }

    .swiper-item-image {
      width: 100%;
      height: 150px;

      img {
        object-fit: cover;
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
        background-image: url('~@/assets/images/x1.png');
      }

      &.btn-2 {
        margin-left: 10px;
        background-image: url('~@/assets/images/x2.png');
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
