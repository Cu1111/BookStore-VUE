<template>
  <div class="page">
    <div class="loading" v-show="!ifHave" v-loading="true"></div>
    <div class="recommendGrid" v-show="ifHave">
      <div v-for="(item,index) in recommendBooks[currentPage]" :key="index" class="card">
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
    <el-pagination
      :pager-count="7"
      layout="prev, pager, next"
      :total="500"
      v-show="ifHave"
      class="blank"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
export default {
  data() {
    return {
      recommendBooks: [],
      ifHave: false,
      currentPage: 1
    };
  },
  components: {},
  mounted() {
    let that = this;
    this.$axios({
      method: "post",
      url: "/selectBookByStar",
      data: this.$qs.stringify({
        star: 0.9,
        page: 1
      })
    })
      .then(response => {
        let ResData = response.data.data;
        that.$set(that.recommendBooks, that.currentPage, ResData.books);
        // that.recommendBooks = ResData.books;
        that.ifHave = true;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.ifHave = false;
      if (this.recommendBooks[this.currentPage] == null) {
        this.getPage(this.currentPage);
      } else {
        this.ifHave = true;
      }
    },
    test: function() {
      this.$set(this.range, 0, (this.currentPage - 1) * 12);
      this.$set(this.range, 1, 12 * this.currentPage);
      console.log(this.range);
    },
    getPage: function(pageIndex) {
      let that = this;
      this.$axios({
        method: "post",
        url: "/selectBookByStar",
        data: this.$qs.stringify({
          star: 0.9,
          page: pageIndex
        })
      })
        .then(response => {
          let ResData = response.data.data;
          that.$set(that.recommendBooks, that.currentPage, ResData.books);
          that.ifHave = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    // lowRange: function() {
    //   return (this.currentPage - 1) * 12;
    // },
    // upRange: function() {
    //   return 12 * this.currentPage;
    // }
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

.loading {
  width: 960px;
  height: 400px;
}

.blank {
  margin-top: 20px;
}
</style>
