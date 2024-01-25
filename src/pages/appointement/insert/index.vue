<template>
  <view class="appointement-insert--root">
    <image class="banner" src="@/assets/images/appointement_banner.jpg" mode="scaleToFill" />
    <nut-form ref="ruleForm" class="appointment-form" :model-value="formData">
      <nut-form-item
        label="姓名"
        prop="name"
        required
        :rules="[
          { required: true, message: '请填写姓名' },
          { validator: nameValidator, message: '姓名至少两个字符' },
        ]"
      >
        <nut-input
          class="nut-input-text"
          @blur="blurValidate('name')"
          v-model="formData.name"
          placeholder="请输入姓名"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="联系电话"
        prop="tel"
        required
        :rules="[
          { required: true, message: '请填写联系电话' },
          { validator: telValidator, message: '电话格式不正确' },
        ]"
      >
        <nut-input
          class="nut-input-text"
          @blur="blurValidate('tel')"
          v-model="formData.tel"
          placeholder="请输入联系电话"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="预约课程"
        prop="scheduleId"
        required
        :rules="[
          { required: true, message: '请选择课程' },
          { validator: dateValidator, message: '请选择课程' },
        ]"
      >
        <nut-button
          v-if="!selectedScheduleInfo"
          type="default"
          shape="square"
          size="mini"
          style="width: 100px"
          @click="visiblePopup = !visiblePopup"
        >
          选择课程
        </nut-button>
        <view v-else class="selected-schedule" @click="visiblePopup = !visiblePopup">
          <view>{{ (selectedScheduleInfo.subject || '').replace(/\n/g, '') }}</view>
          <view>{{ formatScheduleDate(selectedScheduleInfo, false) }}</view>
        </view>
      </nut-form-item>
      <nut-cell>
        <nut-button type="info" size="large" @click="submit">提交</nut-button>
      </nut-cell>
    </nut-form>
    <nut-popup
      position="bottom"
      closeable
      round
      :style="{ maxHeight: '80%' }"
      v-model:visible="visiblePopup"
    >
      <view class="safe-area-bottom">
        <view class="custom-popup-content">
          <view class="title">课程安排</view>
          <nut-table :columns="tableColumns" :data="tableData" />
        </view>
      </view>
    </nut-popup>
  </view>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive, h, computed, onMounted } from 'vue';
  import Taro from '@tarojs/taro';
  import { Form } from '@nutui/nutui-taro';
  import { IconFont } from '@nutui/icons-vue-taro';

  import {
    type ResActivityChapter,
    type ResActivitySchedule,
    getActivitySchedule,
    insertAppointementInfo,
  } from '@/api/appointementApi';
  import { formatTime, getDateInWeek } from '@/utils/formatTime';

  definePageConfig({
    navigationBarTitleText: '我要预约',
  });

  type ValidateResult = {
    valid: boolean;
    errors?: {
      prop: string;
      message: string;
    }[];
  };

  const visiblePopup = ref(false);
  const ruleForm = ref<InstanceType<typeof Form>>();
  const formData = reactive({
    name: '',
    tel: '',
    scheduleId: '',
  });
  const resData = ref({} as ResActivityChapter);

  const tableStyleHead = 'background-color: #d19245; color: #fff;';
  const tableStyleColumn = 'background-color: #e5e4e2; vertical-align: middle;';
  const tableColumns = [
    {
      title: '选择',
      key: 'render',
      align: 'center',
      stylehead: 'width: 15%;' + tableStyleHead,
      stylecolumn: tableStyleColumn,
    },
    {
      title: '课程主题',
      key: 'subject',
      align: 'center',
      stylehead: 'width: 30%;' + tableStyleHead,
      stylecolumn: tableStyleColumn,
    },
    {
      title: '课程时间',
      key: 'datetime',
      align: 'center',
      stylehead: 'width: 30%;' + tableStyleHead,
      stylecolumn: tableStyleColumn,
    },
    {
      title: '课程地点',
      key: 'locale',
      align: 'center',
      stylehead: 'width: 25%;' + tableStyleHead,
      stylecolumn: tableStyleColumn,
    },
  ];
  const tableData = computed(() => {
    return (unref(resData).details || []).map((item) => {
      return {
        _id: item._id,
        subject: item.subject,
        datetime: formatScheduleDate(item),
        locale: item.locale,
        render: (rowData: ResActivitySchedule) => {
          const isChecked = rowData._id === formData.scheduleId;
          return h(IconFont, {
            name: isChecked ? 'check-checked' : 'check-normal',
            size: '14px',
            color: isChecked ? '#fa2c19' : undefined,
            onClick: () => {
              formData.scheduleId = rowData._id;
              visiblePopup.value = false;
              blurValidate('scheduleId');
            },
          });
        },
      };
    });
  });

  const selectedScheduleInfo = computed(() => {
    return (unref(resData).details || []).find((item) => item._id === formData.scheduleId);
  });

  // 重置提示状态
  // const reset = () => {
  //   ruleForm.value?.reset();
  // };

  function submit() {
    ruleForm.value?.validate().then((res) => {
      const { valid } = res as ValidateResult;
      if (!valid) return;
      const { scheduleId, name, tel } = formData;
      Taro.showLoading({ title: '提交中...', mask: true });
      insertAppointementInfo({ chapterId: unref(resData)._id, scheduleId, name, tel })
        .then((res) => {
          Taro.hideLoading();
          if (res.code === 0) {
            Taro.showToast({ title: '预约成功', icon: 'success', mask: true });
            setTimeout(() => {
              Taro.redirectTo({ url: '/pages/appointement/record/index' });
            }, 1200);
          } else {
            Taro.showToast({ title: '预约失败', icon: 'error', mask: true });
          }
        })
        .catch((err) => {
          console.log(err);
          Taro.hideLoading();
        });
    });
  }

  function formatScheduleDate(rowData: ResActivitySchedule, wrap = true) {
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

  // 失去焦点校验
  function blurValidate(prop: string) {
    ruleForm.value?.validate(prop);
  }

  // 校验-姓名
  function nameValidator(val: string) {
    return val.length >= 2;
  }

  // 校验-联系电话
  function telValidator(val: string) {
    const telReg = /^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/;
    return telReg.test(val);
  }

  // 校验-日期
  function dateValidator(val: string) {
    return !!val;
  }

  function fetchActivityDate() {
    getActivitySchedule().then((res) => {
      if (res.code === 0) {
        resData.value = res.data;
      }
    });
  }

  onMounted(() => {
    fetchActivityDate();
  });
</script>

<style lang="scss">
  .appointement-insert--root {
    padding: 10px;

    .banner {
      width: 100%;
      height: 140px;
      border-radius: 10px;
    }

    .appointment-form {
      .nut-cell-group__wrap {
        border-radius: none;
        box-shadow: none;
      }

      .nut-radio__label {
        margin-left: 2px;
      }

      .selected-schedule {
        color: #000;
        font-size: px2rem(14);
      }
    }

    .custom-popup-content {
      padding: 0 10px;
      padding-bottom: 20px;

      .title {
        margin: 16px 0;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }

      .nut-table {
        white-space: pre-wrap;

        .nut-table__nodata__text {
          color: #666;
        }

        .nut-table__main__body__tr__td {
          padding: 5px;
        }
      }
    }
  }
</style>
