<template>
  <div class="page">
    <login-header></login-header>
    <login-content></login-content>
  </div>
</template>

<script type="text/ecmascript-6">
import LoginHeader from "./pages/LoginHeader";
import LoginContent from "./pages/LoginContent";

export default {
  data() {
    return {};
  },
  components: {
    LoginHeader,
    LoginContent
  }
};
</script>

<style scoped lang="stylus">
.page {
  width: 100%;
  height: 100%;
}
</style>
