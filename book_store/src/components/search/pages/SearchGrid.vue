<template>
  <div class="page">
    <div class="loading" v-show="!ifHave" v-loading="true"></div>
    <div class="error" v-show="error">暂无此书！</div>
    <div class="recommendGrid" v-show="ifHave&&!error">
      <div v-for="(item,index) in recommendBooks[0]" :key="index" v-show="index<12" class="card">
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
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      ifHave: false,
      recommendBooks: [],
      error: false
    };
  },
  components: {},
  mounted() {
    this.getBooks(this.$route.query.text);
  },
  watch: {
    $route(newRoute) {
      let newQuery = newRoute.query.text; // 这里就是新的query
      this.getBooks(newQuery);
    }
  },
  methods: {
    getBooks: function(text) {
      let that = this;
      that.ifHave = false;
      this.$axios({
        method: "post",
        url: "/selectBookByKeyword?keyword=" + text
      })
        .then(response => {
          if (response.data.errorCode == "0303") {
            that.ifHave = true;
            that.error = true;
          }
          let ResData = response.data.data;
          that.$set(that.recommendBooks, 0, ResData.books);
          that.ifHave = true;
          that.error = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.page {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.recommendGrid {
  width: 960px;
  max-height: 980px;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  // grid-template-rows: repeat(3, 33.33%);
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
  height: 275.5px;
  cursor: pointer;
  margin-bottom: 30px;
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

.loading {
  width: 960px;
  height: 400px;
}

.error {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
}
</style>
