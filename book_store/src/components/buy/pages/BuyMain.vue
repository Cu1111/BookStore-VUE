<template>
  <div class="page">
    <div class="barContainer">
      <div class="actionBar">
        <div class="bar1">确认商品信息</div>
        <div class="bar2"></div>
        <div class="bar3">单价</div>
        <div class="bar3">数量</div>
        <div class="bar5">金额</div>
        <div class="bar6">优惠金额</div>
        <div class="bar4">小计</div>
      </div>
    </div>
    <div class="itemsContainer">
      <div v-for="(item,index) in bookList" :key="index">
        <div class="item">
          <div class="btn"></div>
          <el-image style="width: 80px; height: 80px" :src="item.picture" :fit="fit"></el-image>
          <div class="itemInfo">{{item.title}}</div>
          <div class="blank"></div>
          <div class="pirce">￥{{item.price}}</div>
          <div class="number">{{item.quantity}}</div>
          <div class="totalPrice">￥{{item.price * item.quantity | numFilter}}</div>
          <div class="actions">0</div>
          <div class="pirce2">￥{{item.price * item.quantity | numFilter}}</div>
        </div>
      </div>
    </div>
    <div class="buyContainer">
      <div class="buy">
        <div class="buyBox">
          <div class="boxTextContainer">
            <div class="realMoneyContainer">
              <div class="realMoneyText1">实付款：</div>
              <div class="realMoneyText2">￥</div>
              <div class="realMoneyText3">{{totalPrice| numFilter}}</div>
            </div>
            <div class="desContainer">
              <div class="desText1">寄送至：</div>
              <div class="desText2">湖北省 武汉市 洪山区 珞南街道 武汉大学信息学部</div>
            </div>
            <div class="desContainer">
              <div class="desText1">收件人：</div>
              <div class="desText2">崔XX&nbsp;&nbsp;&nbsp;152XXXXXXXX</div>
            </div>
          </div>
        </div>
        <div class="buyBtn" @click="pay()">提交订单</div>
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      src:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      selectId: null,
      cartReordList: null,
      buyBook: null,
      fit: "cover",
      bookList: []
    };
  },
  components: {},
  mounted() {
    this.init();
  },
  filters: {
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    }
  },
  computed: {
    totalPrice: function() {
      let price = 0.0;
      let i = 0;
      for (i; i < this.bookList.length; i++) {
        if (this.bookList[i]) {
          price += this.bookList[i].price * this.bookList[i].quantity;
        }
      }
      return price;
    }
  },
  methods: {
    getBook(id) {
      const that = this;
      return that.$axios({
        method: "post",
        url: "/selectCartByCId",
        data: that.$qs.stringify({
          cId: id
        })
      });
    },
    pay: function() {
      this.deleteCid();
      alert("订单完成");
      this.$router.replace({ name: "Main" });
    },
    deleteCid: async function() {
      let text = this.$route.query.buyText;
      this.selectId = text.split("&");
      let that = this;
      let i = 0;
      // let bookList = new Array(that.selectId.length);
      for (i; i < this.selectId.length; i++) {
        await that
          .$axios({
            method: "post",
            url: "/deleteCartRecord",
            data: that.$qs.stringify({
              cId: that.selectId[i]
            })
          })
          .then(response => {
            let ResData = response.data.data;
            if (ResData.deleteNumber != 1) {
              alert("失败");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      console.log(that.bookList);
      // console.log(that.buyBook);
    },
    init: async function() {
      let text = this.$route.query.buyText;
      this.selectId = text.split("&");
      let that = this;
      let i = 0;
      if (localStorage.getItem("bookUserName")) {
        // let bookList = new Array(that.selectId.length);
        for (i; i < this.selectId.length; i++) {
          await that
            .$axios({
              method: "post",
              url: "/selectCartByCId",
              data: that.$qs.stringify({
                cId: that.selectId[i]
              })
            })
            .then(response => {
              let ResData = response.data.data;
              //that.$set(that.bookList, "id_" + i, ResData.cartDetail[0]);
              that.bookList.push(ResData.cartDetail[0]);
            })
            .catch(error => {
              console.log(error);
            });
        }
        console.log(that.bookList);
        // console.log(that.buyBook);
      } else {
        alert("请登录");
        this.$router.replace({ name: "Login" });
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.page {
  width: 100%;
  min-height: calc(100vh - 2.5rem - 6px);
}

.barContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.barSet {
  width: 960px;
}

.actionBar {
  width: 960px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  font-size: 12px;
}

.bar1 {
  width: 115px;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.bar2 {
  width: 310px;
}

.bar3 {
  width: 100px;
}

.bar5 {
  width: 120px;
}

.bar4 {
  flex-grow: 1;
  text-align: center;
}

.bar6 {
  width: 90px;
}

.itemsContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.item {
  margin-top: 0.3rem;
  width: 950px;
  padding: 10px 5px;
  height: 85px;
  background-color: #FCFCFC;
  border: 0.5px solid #cdcdcd;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 12px;
  text-align: left;
}

.btn {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.itemInfo {
  margin-left: 5px;
  width: 220px;
  height: 40px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  font-size: 12px;
  line-height: 13px;
}

.blank {
  display: block;
  width: 90px;
  height: 10px;
}

.pirce {
  font-size: 14px;
  width: 110px;
}

.pirce2 {
  font-size: 14px;
  width: 120px;
  text-align: center;
}

.number {
  font-size: 14px;
  width: 90px;
}

.totalPrice {
  font-size: 14px;
  width: 125px;
  color: #ff4040;
  font-weight: bold;
}

.actions {
  width: 70px;
  margin-left: 20px;
  color: #aaaaaa;
  font-weight: bold;
  font-size: 15px;
}

.action1 {
  cursor: pointer;
}

.icon {
  width: 90%;
  height: 90%;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
}

.active {
  background-color: #FFF8E1;
}

.icon1 {
  height: 18px;
  width: 18px;
}

.checkOutContainer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkOut {
  width: 960px;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #E5E5E5;
}

.totalNum {
  margin-left: 10px;
  font-size: 0.25rem;
}

.buyContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buy {
  width: 960px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  height: 5rem;
}

.buyBox {
  height: 2.5rem;
  width: 7rem;
  border: 1px solid #ff0036;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buyBtn {
  display: inline-block;
  width: 130px;
  height: 37px;
  position: relative;
  vertical-align: middle;
  line-height: 39px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  background: #ff5000;
  color: #fff;
}

.boxTextContainer {
  height: 94%;
  width: 95%;
}

.realMoneyContainer {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.realMoneyText1 {
  color: #333;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 2px;
}

.realMoneyText2 {
  color: #999;
  font-size: 22px;
}

.realMoneyText3 {
  color: #ff5000;
  font-size: 22px;
  font-weight: bold;
}

.desContainer {
  width: 100%;
  height: 25px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 12px;
}

.desText1 {
  font-weight: bold;
  color: #333;
}
</style>
