<template>
  <div class="page">
    <div class="recommendContainer">
      <div class="recommendPic"></div>
      <div class="recommendText">
        <div class="more1"></div>
        <div class="text1">可能比你自己更懂你</div>
        <div class="more" @click="goAll()">MORE</div>
      </div>
    </div>
    <div class="recommendGrid">
      <div v-for="(item,index) in recommendBooks" :key="index" class="card">
        <router-link :to="{path:'/detail',query:{bookId:item.bId}}">
          <el-card :body-style="{ padding: '0px' }" class="cardSize" shadow="hover">
            <img :src="item.picture" class="image" />
            <div style="padding: 10px;">
              <div class="title">{{item.title}}</div>
              <div class="author">{{item.author}}</div>
              <div class="price">￥{{item.price}}</div>
            </div>
          </el-card>
        </router-link>
      </div>
    </div>
    <el-divider>已经到底了</el-divider>
    <div class="end">
      <div class="endPic"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      recommendBooks: null
    };
  },
  components: {},
  mounted() {
    let that = this;
    this.$axios({
      method: "post",
      url: "/selectBookByStar",
      data: this.$qs.stringify({
        star: 0.8,
        page: 2
      })
    })
      .then(response => {
        let ResData = response.data.data;
        that.recommendBooks = ResData.books;
        console.log(that.recommendBooks );
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    goAll: function() {
      this.$router.push({ name: "All" });
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~css/color.styl';

.page {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.recommendContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 960px;
}

.recommendPic {
  width: 392px;
  height: 65px;
  background-image: url('~images/dongni.png');
  background-position: center top;
  background-size: cover;
}

.recommendText {
  width: 960px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 13px;
}

.text1 {
  margin-top: -5px;
  color: #999;
}

.more1 {
  width: 100px;
}

.more {
  margin-top: -2px;
  width: 100px;
  cursor: pointer;
  color: #999;
}

.more:hover {
  color: $mainRed;
}

.recommendGrid {
  width: 960px;
  height: 870px;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(3, 33.33%);
  justify-items: center;
  align-items: center;
}

.image {
  width: 100%;
  height: 210px;
  display: block;
}

.card {
  width: 90%;
  height: 95%;
  cursor: pointer;
}

.cardSize {
  height: 100%;
}

.title {
  font-size: 15px;
  text-align: left;
  margin-left: 10px;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  height: 20px;
}

.author {
  font-size: 13px;
  text-align: left;
  margin-left: 10px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 18px;
}

.price {
  font-size: 20px;
  color: #ff4040;
  font-weight: bold;
  text-align: right;
  margin-top: -20px;
}

.end {
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.endPic {
  width: 885px;
  height: 120px;
  background-image: url('~images/end.png');
  background-position: center top;
  background-size: cover;
}
</style>
