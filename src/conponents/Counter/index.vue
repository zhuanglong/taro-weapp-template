<template>
  <view class="Counter--root">
    <view class="title">Pinia Count: {{ evenOrOdd }}</view>
    <view>
      <button @click="decrement()">-</button>
      <view class="count-text">{{ count }}</view>
      <button @click="increment()">+</button>
      <view style="margin-top: 10px" />
      <button @click="incrementAsync()">async +</button>
    </view>
  </view>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue';

  import { useCounter } from '@/stores';

  export default defineComponent({
    setup() {
      const counter = useCounter();

      const state = reactive({
        count: computed(() => counter.count),
        evenOrOdd: computed(() => counter.evenOrOdd),
      });

      const decrement = () => {
        counter.decrement();
      };

      const increment = () => {
        counter.increment();
      };

      const incrementAsync = () => {
        counter.incrementAsync();
      };

      return {
        ...toRefs(state),
        decrement,
        increment,
        incrementAsync,
      };
    },
  });
</script>

<style lang="scss">
  .Counter--root {
    .title {
      padding: 10px 0;
      font-size: 20px;
      text-align: center;
    }

    .count-text {
      margin: 5px 0;
      color: blue;
      font-size: 18px;
      text-align: center;
    }
  }
</style>
