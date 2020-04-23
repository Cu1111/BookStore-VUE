<template>
  <div class="page">
    <main-header></main-header>
    <main-title></main-title>
    <main-swiper></main-swiper>
    <main-grid></main-grid>
  </div>
</template>

<script type="text/ecmascript-6">
import MainHeader from "./pages/MainHeader";
import MainTitle from "./pages/MainTitle";
import MainSwiper from "./pages/MainSwiper";
import MainGrid from "./pages/MainGrid";

export default {
  data() {
    return {};
  },
  components: {
    MainHeader,
    MainTitle,
    MainSwiper,
    MainGrid
  }
};
</script>

<style scoped lang="stylus"></style>
