<template>
  <div class="mx-auto container">
    <div class="w-[100px] h-[100px] overflow-hidden mx-auto">
      <img :src="require('@/assets/logo.png')" alt="" />
    </div>
    <h1 class="text-[22px] my-4 text-center uppercase font-semibold">
      {{ route.name }}
    </h1>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    return { route };
  },
};
</script>
