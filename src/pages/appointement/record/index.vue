<template>
  <view>
    <view class="safe-area-bottom" v-if="!isEmpty">
      <view class="list" v-if="loading">
        <nut-skeleton width="100%" height="15px" title animated row="3" />
        <nut-skeleton width="100%" height="15px" title animated row="3" />
        <nut-skeleton width="100%" height="15px" title animated row="3" />
      </view>
      <view class="list" v-else>
        <view class="item" :key="item.name" v-for="item in resData">
          <view class="cell">姓名：{{ item.name }}</view>
          <view class="cell cell-tel">联系电话：{{ item.tel }}</view>
          <view class="cell" style="display: flex">
            <view>预约课程：</view>
            <view>
              <view>{{ item.scheduleInfo?.subject }}</view>
              <view>{{ formatScheduleDate(item.scheduleInfo, true) }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <EmptyStatus @clickOperate="clickOperate" v-else />
  </view>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  import EmptyStatus from '@/conponents/EmptyStatus/index.vue';

  import { type ResAppointementRecord, getAppointementRecord } from '@/api/appointementApi';
  import { formatTime, getDateInWeek } from '@/utils/formatTime';

  definePageConfig({
    navigationBarTitleText: '预约记录',
  });

  const isEmpty = ref(false);
  const loading = ref(true);
  const resData = ref<ResAppointementRecord[]>([]);

  function formatScheduleDate(rowData: ResAppointementRecord['scheduleInfo'], wrap = true) {
    const md = formatTime(rowData.start_time, 'MM月DD日');
    const startTime = formatTime(rowData.start_time, 'HH:mm');
    const endTime = formatTime(rowData.end_time, 'HH:mm');
    const week = getDateInWeek(rowData.start_time);
    const content = `${md}\n(${week})\n${startTime}-${endTime}`;
    if (wrap) {
      return content;
    }
    return content.replace(/\n/g, '');
  }

  function fetchData() {
    isEmpty.value = false;
    loading.value = true;
    getAppointementRecord().then((res) => {
      loading.value = false;
      if (res.code === 0) {
        resData.value = res.data;
      }
      if (res.data.length === 0) {
        isEmpty.value = true;
      }
    });
  }

  function clickOperate() {
    fetchData();
  }

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="scss">
  .list {
    padding: 10px;
    padding-bottom: 20px;

    .nut-skeleton {
      width: 100%;
      margin-bottom: 20px;
    }

    .item {
      padding: 10px;
      background-color: #eee;
      border-radius: 6px;

      &:not(:first-child) {
        margin-top: 10px;
      }

      .cell {
        font-size: 14px;

        &:not(:first-child) {
          margin-top: 5px;
        }

        &.cell-tel {
          display: flex;
          align-items: center;

          .btn {
            padding: 0 5px;
            margin-left: 5px;
            border-radius: 4px;
            font-size: 12px;
            line-height: 1.6;
            color: #fff;

            &:active {
              opacity: 0.8;
            }

            &.tel-btn {
              background-color: #27c42d;
            }

            &.copy-btn {
              background-color: #498ff2;
            }
          }
        }
      }
    }
  }
</style>
