<template>
  <div class="page">
    <main-header></main-header>
    <buy-title></buy-title>
    <div class="aline"></div>

    <buy-main></buy-main>
  </div>
</template>

<script type="text/ecmascript-6">
import MainHeader from "../mainPage/pages/MainHeader";
import BuyTitle from "./pages/BuyTitle";
import BuyMain from "./pages/BuyMain";

export default {
  data() {
    return {};
  },
  components: {
    MainHeader,
    BuyTitle,
    BuyMain
  }
};
</script>

<style scoped lang="stylus">
.aline {
  background-color: #FF2832;
  height: 5px;
  width: 100%;
}
</style>
