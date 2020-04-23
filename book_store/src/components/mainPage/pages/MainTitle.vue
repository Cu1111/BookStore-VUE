<template>
  <div class="page">
    <div class="titleContainer">
      <div class="iconContainer">
        <div class="ourIcon" @click="goMain()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icontushu" />
          </svg>
          <div class="ourName">小书童</div>
        </div>
      </div>
      <el-image :src="src" style="width:130px;height:auto">
        <div slot="placeholder" class="image-slot">
          加载中
          <span class="dot">...</span>
        </div>
      </el-image>
      <div class="searchContainer">
        <div class="searchBox">
          <input type="text" v-model="searchText" :placeholder="placeholder" />
          <svg class="btn1" aria-hidden="true" @click="search()">
            <use xlink:href="#iconsousuo" />
          </svg>
        </div>
      </div>
      <div class="cartContainer">
        <div class="btn2" @click="goCart()">
          <svg class="cartIcon" aria-hidden="true">
            <use xlink:href="#icongouwuche" />
          </svg>
          <div class="cartText">购物车</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/bus";

export default {
  data() {
    return {
      src: require("@/assets/images/image1.jpg"),
      searchText: "",
      placeholder: "第一次自己睡觉",
      ifLogin: false,
      searchResult: null
    };
  },
  components: {},
  created() {
    bus.$on("loginInfo", data => {
      this.ifLogin = data;
    });
  },
  methods: {
    search: function() {
      if (this.searchText == "") {
        this.searchText = this.placeholder;
      }
      this.$router.push({ path: "/search", query: { text: this.searchText } });
    },
    goCart: function() {
      if (localStorage.getItem("bookNickName")) {
        this.$router.push({ name: "Cart" });
      } else {
        this.$router.push({ name: "Login" });
      }
    },
    goMain: function() {
      this.$router.push({ name: "Main" });
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~css/color.styl';

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 100%;
}

.titleContainer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 960px;
  height: 100%;
}

.iconContainer {
  width: 80px;
  height: auto;
}

.ourIcon {
  width: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.ourName {
  height: 0.4rem;
  font-size: 0.3rem;
  width: 1.6rem;
  font-weight: bold;
  letter-spacing: 5px;
  font-family: KaiTi;
  margin-top: -6px;
}

.icon {
  width: 1.6rem;
  height: 1.6rem;
  fill: currentColor;
  overflow: hidden;
}

.searchContainer {
  width: 640px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.searchBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.7rem;
  width: 400px;
  border: 1px solid #e5e5e5;
  border-radius: 0.35rem;
  background-color: #fcfcfc;
}

.searchBox:hover {
  border: 0.8px solid $mainRed;
}

input {
  outline: none;
  border: 0px;
  width: 350px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 320;
  margin-left: 10px;
  font-family: 'Microsoft soft';
  background-color: #fcfcfc;

  &::placeholder {
    color: $mainGrey;
    font-size: 12px;
  }
}

.btn1 {
  width: 0.4rem;
  height: 0.4rem;
  fill: currentColor;
  overflow: hidden;
  margin-right: 20px;
  cursor: pointer;
}

.cartContainer {
  width: 110px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.btn2 {
  width: 100px;
  height: 0.68rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #e5e5e5;
  border-radius: 0.34rem;
}

.btn2:hover {
  background-color: #fcfcfc;
}

.cartIcon {
  width: 0.35rem;
  height: 0.35rem;
  fill: currentColor;
  overflow: hidden;
}

.cartText {
  font-size: 0.25rem;
  letter-spacing: 2px;
  margin-left: 2px;
}
</style>
