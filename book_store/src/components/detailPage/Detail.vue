<template>
  <div class="page">
    <div class="main">
      <main-header></main-header>
      <main-title></main-title>
      <div class="aline"></div>
      <div class="breadcrumb">
        <div class="container">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'Main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'All' }">全部图书</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.bookDetail[0].title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <book-detail></book-detail>
      <div class="blank"></div>
    </div>
    <div class="end">
      <div class="endPic"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MainHeader from "../mainPage/pages/MainHeader";
import MainTitle from "../mainPage/pages/MainTitle";
import BookDetail from "./pages/BookDetail";

export default {
  data() {
    return {
      bookDetail: null
    };
  },
  components: {
    MainHeader,
    MainTitle,
    BookDetail
  },
  mounted() {
    let that = this;
    this.$axios({
      method: "post",
      url: "/selectBookByBId",
      data: this.$qs.stringify({
        bId: that.$route.query.bookId
      })
    })
      .then(response => {
        let ResData = response.data.data;
        that.bookDetail = ResData.books;
        console.log(that.bookDetail[0]);
        if (that.bookDetail[0].synopsis == null) {
          that.bookDetail[0].synopsis = "暂时获取不到相应信息。";
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped lang="stylus">
.page {
  width: 100%;
  height: 100%;
}

.main {
  width: 100%;
  min-height: calc(100vh - 150px);
}

.aline {
  background-color: #FF2832;
  height: 5px;
  width: 100%;
}

.breadcrumb {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 960px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
}

.blank {
  height: 2rem;
  width: 100%;
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
