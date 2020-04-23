<template>
  <div class="page">
    <div class="barContainer">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo barSet"
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#ff4040"
      >
        <el-menu-item index="1">全部商品({{cartReordList.length}})</el-menu-item>
        <el-menu-item index="2" disabled>降价商品(0)</el-menu-item>
        <el-menu-item index="3" disabled>库存紧张(0)</el-menu-item>
      </el-menu>
      <div class="actionBar">
        <div class="bar1">
          <svg class="icon1" aria-hidden="true" v-show="!selectAll1" @click="selectAllItems()">
            <use xlink:href="#iconquanxuan2" />
          </svg>
          <svg class="icon1" aria-hidden="true" v-show="selectAll1" @click="selectAllNot()">
            <use xlink:href="#iconquanxuan1" />
          </svg>
          &nbsp;全&nbsp;选
        </div>
        <div class="bar2">商品信息</div>
        <div class="bar3">单价</div>
        <div class="bar3">数量</div>
        <div class="bar5">金额</div>
        <div class="bar4">操作</div>
      </div>
    </div>
    <div class="itemsContainer">
      <div v-for="(item,index) in cartReordList" :key="index">
        <div class="item" :class="{ active: selectList[index] }">
          <div class="btn">
            <svg class="icon" aria-hidden="true" v-show="!selectList[index]" @click="click(index)">
              <use xlink:href="#iconduoxuan_weixuanzhong" />
            </svg>
            <svg class="icon" aria-hidden="true" v-show="selectList[index]" @click="click(index)">
              <use xlink:href="#iconxingzhuang6" />
            </svg>
          </div>
          <el-image style="width: 80px; height: 80px" :src="item.picture" :fit="fit"></el-image>
          <div class="itemInfo">{{item.title}}</div>
          <div class="blank"></div>
          <div class="pirce">￥{{item.price}}</div>
          <div class="number">{{item.quantity}}</div>
          <div class="totalPrice">￥{{item.price * item.quantity | numFilter}}</div>
          <div class="actions">
            <div class="action1">移入收藏夹</div>
            <el-popconfirm
              confirmButtonText="确定"
              cancelButtonText="不用了"
              icon="el-icon-info"
              iconColor="red"
              title="确定要删除吗？"
              width="200"
              height="100"
              @onConfirm="dropItem(index)"
            >
              <div class="action1" slot="reference">删除</div>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>
    <div class="blank2"></div>
    <div class="checkOutContainer">
      <div class="checkOut">
        <div class="totalNum">
          已选商品:
          <font color="#ff4040">&nbsp;{{selectNum}}&nbsp;</font>件
        </div>
        <div class="blank1"></div>
        <div class="totalMoney">
          合计(不含运费):
          <!-- <strong>
            <font color="#ff4040">&nbsp;{{totalPrice|numFilter}}</font>
          </strong>-->
        </div>
        <span class="totalMoneyNum">{{totalPrice|numFilter}}</span>
        <div class="checkBtn" :class="{activeBtn:selectNum}" @click="buy()">结&nbsp;&nbsp;算</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
export default {
  data() {
    return {
      activeIndex: "1",
      showAll: true,
      fit: "cover",
      userName: null,
      cartReordList: null,
      selectList: null,
      selectAll: false
    };
  },
  components: {},
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
  mounted() {
    let that = this;
    if (localStorage.getItem("bookUserName")) {
      that.userName = localStorage.getItem("bookUserName");
      this.$axios({
        method: "post",
        url: "/selectCartByUsername",
        data: this.$qs.stringify({
          username: that.userName
        })
      })
        .then(response => {
          let ResData = response.data.data;
          that.cartReordList = ResData.cartReordList;
          let arr = new Array(that.cartReordList.length).fill(0);
          that.selectList = arr;
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert("请登录");
      this.$router.replace({ name: "Login" });
    }
  },
  computed: {
    selectNum: function() {
      let number = 0;
      let i = 0;
      for (i; i < this.selectList.length; i++) {
        number += this.selectList[i];
      }
      return number;
    },
    selectAll1: function() {
      let result = false;
      if (this.selectNum == this.selectList.length) {
        result = true;
      }
      return result;
    },
    totalPrice: function() {
      let price = 0.0;
      let i = 0;
      for (i; i < this.selectList.length; i++) {
        if (this.selectList[i]) {
          price += this.cartReordList[i].price * this.cartReordList[i].quantity;
        }
      }
      return price;
    },
    selectId: function() {
      let IdText = "";
      let i = 0;
      for (i; i < this.selectList.length; i++) {
        if (this.selectList[i]) {
          IdText += this.cartReordList[i].cId + "&";
        }
      }
      IdText = IdText.substr(0, IdText.length - 1);
      return IdText;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.showAll = true;
      }
    },
    click(index) {
      if (this.selectList[index]) {
        Vue.set(this.selectList, index, 0);
        // if (this.selectAll) {
        //   this.selectAll = false;
        // }
      } else {
        Vue.set(this.selectList, index, 1);
        // if (this.selectAll1) {
        //   this.selectAll = true;
        // }
      }
    },
    selectAllItems: function() {
      let i = 0;
      this.selectAll = true;
      for (i; i < this.selectList.length; i++) {
        Vue.set(this.selectList, i, 1);
      }
    },
    selectAllNot: function() {
      let i = 0;
      this.selectAll = false;
      for (i; i < this.selectList.length; i++) {
        Vue.set(this.selectList, i, 0);
      }
    },
    buy: function() {
      console.log(this.selectId);
      if (this.selectNum) {
        this.$router.push({
          path: "/buy",
          query: { buyText: this.selectId }
        });
      }
    },
    dropItem: function(index) {
      this.$axios({
        method: "post",
        url: "/deleteCartRecord",
        data: this.$qs.stringify({
          cId: this.cartReordList[index].cId
        })
      })
        .then(response => {
          let ResData = response.data.data;
          if (ResData.deleteNumber != 1) {
            alert("失败");
          } else {
            location.reload();
          }
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
  min-height: calc(100vh - 2.5rem - 1px);
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
}

.bar2 {
  width: 400px;
}

.bar3 {
  width: 100px;
}

.bar5 {
  width: 120px;
}

.bar4 {
  flex-grow: 1;
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
  width: 180px;
  height: 10px;
}

.pirce {
  font-size: 14px;
  width: 110px;
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100px;
  line-height: 20px;
  font-size: 10px;
  margin-top: -2px;
}

.action1 {
  cursor: pointer;
}

.action1:hover {
  color: #ff4040;
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

.blank1 {
  height: 100%;
  flex-grow: 1;
}

.totalMoney {
  font-size: 0.25rem;
  margin-right: 10px;
}

.totalMoneyNum {
  font-weight: bold;
  font-size: 23px;
  color: #ff4040;
  margin-right: 10px;
}

.checkBtn {
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  font-size: 20px;
  line-height: 1rem;
  background-color: #B0B0B0;
  color: #ffffff;
}

.activeBtn {
  cursor: pointer;
  background-color: #ff4400;
}

.activeBtn:hover {
  background-color: #f22d00;
}

.blank2 {
  width: 100%;
  height: 1.5rem;
  display: block;
}
</style>
