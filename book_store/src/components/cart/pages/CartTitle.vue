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
      <div class="titleText">购物车</div>
      <div class="searchContainer">
        <div class="searchBox">
          <input type="text" v-model="searchText" :placeholder="placeholder" />
          <svg class="btn1" aria-hidden="true" @click="search()">
            <use xlink:href="#iconsousuo" />
          </svg>
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
      ifLogin: false
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
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
}

.searchBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.7rem;
  width: 400px;
  border: 3px solid #ff4040;
  background-color: #fcfcfc;
}

input {
  outline: none;
  border: 0px;
  width: 350px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 320;
  margin-left: 10px;
  height: 100%;
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

.titleText {
  font-size: 0.38rem;
  letter-spacing: 0.04rem;
  font-weight: bold;
  font-family: STXihei;
}
</style>
