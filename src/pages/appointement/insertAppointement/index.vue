<template>
  <div class="banner-wrapper">
    <image
      class="banner"
      src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg"
      mode="scaleToFill"
    />
  </div>
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
        @click="visible = !visible"
      >
        选择课程
      </nut-button>
      <div v-else class="selected-schedule" @click="visible = !visible">
        <div>{{ selectedScheduleInfo.subject }}</div>
        <div>{{ formatScheduleDate(selectedScheduleInfo) }}</div>
      </div>
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
    v-model:visible="visible"
  >
    <div class="safe-area-bottom">
      <div class="custom-popup-content">
        <div class="title">课程安排</div>
        <nut-table :columns="tableColumns" :data="tableData" />
      </div>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive, h, computed } from 'vue';
  import Taro from '@tarojs/taro';
  import { Form } from '@nutui/nutui-taro';
  import { IconFont } from '@nutui/icons-vue-taro';

  import { type ResActivitySchedule, insertAppointementInfo } from '@/api/appointementApi';
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

  const ruleForm = ref<InstanceType<typeof Form>>();
  const visible = ref(false);
  const formData = reactive({
    name: '',
    tel: '',
    scheduleId: '',
    remark: '',
  });

  const resData = ref<ResActivitySchedule[]>([
    {
      _id: '001',
      subject: '大龄亲子/独立夜间自然观察_A',
      locale: 'Ax地',
      start_time: '2023-12-15 19:30',
      end_time: '2023-12-15 21:00',
    },
    {
      _id: '002',
      subject: '大龄亲子/独立夜间自然观察_B',
      locale: 'Bx地',
      start_time: '2023-12-16 19:30',
      end_time: '2023-12-16 21:00',
    },
    {
      _id: '003',
      subject: '大龄亲子/独立夜间自然观察_C',
      locale: 'Cx地',
      start_time: '2023-12-17 19:30',
      end_time: '2023-12-17 21:00',
    },
  ]);

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
    return unref(resData).map((item) => {
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
              visible.value = false;
              blurValidate('scheduleId');
            },
          });
        },
      };
    });
  });

  const selectedScheduleInfo = computed(() => {
    return unref(resData).find((item) => item._id === formData.scheduleId);
  });

  // 重置提示状态
  // const reset = () => {
  //   ruleForm.value?.reset();
  // };

  const submit = () => {
    ruleForm.value?.validate().then((res) => {
      const { valid } = res as ValidateResult;
      if (valid) {
        Taro.showLoading({ title: '提交中...', mask: true });
        const { scheduleId, name, tel } = formData;
        insertAppointementInfo({ chapterId: 'test_chapter_id', scheduleId, name, tel })
          .then((res) => {
            Taro.hideLoading();
            if (res.code === 0) {
              Taro.showToast({ title: '预约成功', icon: 'success', mask: true });
              setTimeout(() => {
                Taro.redirectTo({ url: '/pages/appointement/appointementList/index' });
              }, 1200);
            } else {
              Taro.showToast({ title: '预约失败', icon: 'error', mask: true });
            }
          })
          .catch((err) => {
            console.log(err);
            Taro.hideLoading();
          });
      }
    });
  };

  const formatScheduleDate = (rowData: ResActivitySchedule) => {
    const md = formatTime(rowData.start_time, 'MM月DD日');
    const startTime = formatTime(rowData.start_time, 'HH:mm');
    const endTime = formatTime(rowData.end_time, 'HH:mm');
    const week = getDateInWeek(rowData.start_time);
    return `${md}\n(${week})\n${startTime}-${endTime}`;
  };

  // 失去焦点校验
  const blurValidate = (prop: string) => {
    ruleForm.value?.validate(prop);
  };

  // 校验-姓名
  const nameValidator = (val: string) => {
    return val.length >= 2;
  };

  // 校验-联系电话
  const telValidator = (val: string) => {
    const telReg = /^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/;
    return telReg.test(val);
  };

  // 校验-日期
  const dateValidator = (val: string) => {
    return !!val;
  };
</script>

<style lang="scss">
  .banner-wrapper {
    padding: 10px;

    .banner {
      width: 100%;
      height: 140px;
      border-radius: 10px;
    }
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
    }
  }
</style>
