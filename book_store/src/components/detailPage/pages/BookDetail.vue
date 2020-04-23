<template>
  <div class="page">
    <div class="contentContainer">
      <div class="pic-box">
        <pic-zoom :url="this.bookDetail.picture" :scale="3"></pic-zoom>
      </div>
      <div class="textContainer">
        <div class="titleContainer">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconziying" />
          </svg>
          <el-tooltip
            class="item"
            effect="dark"
            :content="this.bookDetail.title"
            placement="top-start"
          >
            <div class="titleText">{{this.bookDetail.title}}</div>
          </el-tooltip>
        </div>
        <el-tooltip
          class="item"
          effect="dark"
          :content="this.bookDetail.synopsis"
          placement="bottom"
        >
          <div class="synopsis">{{this.bookDetail.synopsis}}</div>
        </el-tooltip>
        <div class="aline"></div>
        <div class="bookDetail">
          <div class="author">
            <strong>作者：</strong>
            {{this.bookDetail.author}}
          </div>
          <div class="publisher">
            <strong>出版社：</strong>
            {{this.bookDetail.publisher}}
          </div>
          <div class="star">
            <strong>推荐指数：</strong>
            <el-rate
              v-model="star"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </div>
        </div>
        <div class="addCartContainer">
          <div class="moneyText">预售价：</div>
          <div class="money">￥{{this.bookDetail.price}}</div>
          <div class="btnContainer">
            <el-input-number v-model="num" size="mini" controls-position="right" :min="1" :max="20"></el-input-number>
            <div class="btn2" @click="addCart()">
              <svg class="cartIcon" aria-hidden="true">
                <use xlink:href="#iconqicheqianlian-1-copy" />
              </svg>
              <div class="cartText">加入购物车</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import PicZoom from "vue-piczoom";

export default {
  data() {
    return {
      bookDetail: this.$parent.bookDetail[0],
      star: 5,
      num: 1
    };
  },
  components: {
    PicZoom
  },
  mounted() {
    this.star = this.bookDetail.star * 5;
  },
  methods: {
    addCart: function() {
      if (localStorage.getItem("bookNickName")) {
        let that = this;
        this.$axios({
          method: "post",
          url: "/addCartRecord",
          data: this.$qs.stringify({
            username: localStorage.getItem("bookUserName"),
            bId: that.bookDetail.bId,
            quantity: that.num
          })
        })
          .then(response => {
            let ResData = response.data.data;
            console.log(ResData);
            alert("添加成功！");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$router.push({ name: "Login" });
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.page {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contentContainer {
  display: flex;
  width: 960px;
}

.pic-box {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  height: 300px;
  width: 300px;
  border: 1px solid #aaaaaa;
}

.textContainer {
  width: 420px;
  padding-left: 5px;
}

.titleContainer {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.icon {
  width: 0.7rem;
  height: 0.7rem;
  fill: currentColor;
  overflow: hidden;
  margin-left: 5px;
  margin-right: 5px;
}

.titleText {
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
  line-height: 20px;
}

.synopsis {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: 15px;
  margin-left: 5px;
  height: 72px;
  text-align: left;
}

.aline {
  background-color: #aaaaaa;
  height: 1px;
  width: 100%;
  margin-top: 1px;
}

.bookDetail {
  width: 100%;
  line-height: 20px;
  font-size: 13px;
  text-align: left;
  margin-left: 5px;
}

.star {
  display: flex;
}

.addCartContainer {
  text-align: left;
  margin-left: 5px;
  margin-top: 20px;
}

.moneyText {
  color: #8f8f8f;
  font-size: 12px;
  line-height: 20px;
}

.money {
  color: #ff4040;
  font-size: 25px;
  font-weight: bold;
}

.btnContainer {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.btn2 {
  width: 100px;
  height: 0.58rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #FF5C4D;
  margin-left: 40px;
}

.btn2:hover {
  background-color: #ff4040;
}

.cartIcon {
  width: 0.35rem;
  height: 0.35rem;
  fill: currentColor;
  overflow: hidden;
}

.cartText {
  font-size: 0.25rem;
  letter-spacing: 0.5px;
  margin-left: 2px;
  color: #ffffff;
}
</style>
