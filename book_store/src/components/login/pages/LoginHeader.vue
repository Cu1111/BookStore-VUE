<template>
  <div class="page">
    <div class="headerContainer">
      <div class="ourIcon" @click="goMain()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icontushu" />
        </svg>
        <div class="ourName">小书童</div>
      </div>
      <div class="oueText">您好！欢迎光临小书童网上书店！</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    goMain: function() {
      this.$router.push({ name: "Main" });
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~css/color.styl';

.page {
  width: 100%;
  height: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1.2px solid #e5e5e5;
  z-index: 999;
}

.headerContainer {
  width: 960px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ourIcon {
  width: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.ourName {
  height: 0.3rem;
  font-size: 0.2rem;
  font-weight: bold;
  letter-spacing: 3px;
  font-family: SimHei;
  margin-top: -6px;
}

.icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
  overflow: hidden;
}

.oueText {
  width: auto;
  height: 70%;
  font-size: 0.22rem;
  font-family: KaiTi;
  color: $mainGrey;
}
</style>
