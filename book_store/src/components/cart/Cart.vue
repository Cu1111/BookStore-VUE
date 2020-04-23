<template>
  <div class="page">
    <main-header></main-header>
    <cart-title></cart-title>
    <cart-main></cart-main>
  </div>
</template>

<script type="text/ecmascript-6">
import MainHeader from "../mainPage/pages/MainHeader";
import CartTitle from "./pages/CartTitle";
import CartMain from "./pages/CartMain";

export default {
  data() {
    return {};
  },
  components: {
    MainHeader,
    CartTitle,
    CartMain
  }
};
</script>

<style scoped lang="stylus"></style>
