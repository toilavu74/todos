<template>
  <navigation-top />
  <Notifications position="top center" />
  <router-view />
  <navigation-bottom />
</template>
<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
<script>
import NavigationTop from "@/components/NavigationTop.vue";
import NavigationBottom from "./components/NavigationBottom.vue";
export default {
  components: {
    NavigationTop,
    NavigationBottom,
  },
};
</script>
