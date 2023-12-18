<template>
  <div class="Counter--root">
    <div class="title">Pinia Count: {{ evenOrOdd }}</div>
    <div>
      <button @click="decrement()">-</button>
      <div class="count-text">{{ count }}</div>
      <button @click="increment()">+</button>
      <div style="margin-top: 10px"></div>
      <button @click="incrementAsync()">async +</button>
    </div>
  </div>
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
