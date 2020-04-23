<template>
  <div class="page">
    <div class="swiperContainer">
      <el-carousel trigger="click" height="403.2px">
        <el-carousel-item v-for="item in 3" :key="item">
          <h3 class="small"></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="stylus">
.page {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.swiperContainer {
  width: 960px;
  height: 403.2px;
}

.el-carousel__item h3 {
  opacity: 0.75;
  margin: 0;
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n+1) {
  background-image: url('~images/swiper1.jpg');
  background-position: center top;
  background-size: cover;
}

.el-carousel__item:nth-child(2n) {
  background-image: url('~images/swiper2.jpg');
  background-position: center top;
  background-size: cover;
}

.el-carousel__item:last-child {
  background-image: url('~images/swiper3.jpg');
  background-position: center top;
  background-size: cover;
}
</style>
