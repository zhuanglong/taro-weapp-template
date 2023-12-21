<template>
  <div>
    <div class="safe-area-bottom" v-if="!isEmpty">
      <div class="list" v-if="loading">
        <nut-skeleton width="100%" height="15px" title animated row="3" />
        <nut-skeleton width="100%" height="15px" title animated row="3" />
        <nut-skeleton width="100%" height="15px" title animated row="3" />
      </div>
      <div class="list" v-else>
        <div class="item" :key="item.name" v-for="item in resData">
          <div class="cell">姓名：{{ item.name }}</div>
          <div class="cell cell-tel">联系电话：{{ item.tel }}</div>
        </div>
      </div>
    </div>
    <EmptyStatus @clickOperate="clickOperate" v-else />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  import EmptyStatus from '@/conponents/EmptyStatus';

  import { type ResAppointementRecord, getAppointementRecord } from '@/api/appointementApi';

  definePageConfig({
    navigationBarTitleText: '预约记录',
  });

  const isEmpty = ref(false);
  const loading = ref(true);
  const resData = ref<ResAppointementRecord[]>([]);

  const fetchData = () => {
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
  };

  const clickOperate = () => {
    fetchData();
  };

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
