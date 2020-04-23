<template>
  <div class="page">
    <div class="littleHeader">
      <div class="lhContent">
        <div class="dst">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconxiaochengxu_tubiao" />
          </svg>
          <div class="dstText">送货地址：武汉</div>
        </div>
        <div class="userContainer">
          <div class="loginContainer">
            您好,
            <el-tooltip placement="top" v-show="ifLogin">
              <div slot="content" @click="logout()" class="quit">退出登录</div>
              <div class="loginText" @click="choosePages()">{{bookNickName}}</div>
            </el-tooltip>
            <div class="loginText" @click="choosePages()" v-show="!ifLogin">{{bookNickName}}</div>

            <div class="registText" v-show="!ifLogin" @click="goRegister()">注册</div>
            <div class="registText" v-show="ifLogin">&nbsp;</div>
          </div>
          <div class="myOrder">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icondingdan" />
            </svg>
            <div>我的订单</div>
          </div>
        </div>
      </div>
    </div>
    <div class="headerContainer"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/bus";

export default {
  data() {
    return {
      bookNickName: "请登录",
      ifLogin: false
    };
  },
  components: {},
  mounted() {
    if (localStorage.getItem("bookNickName")) {
      this.bookNickName = localStorage.getItem("bookNickName");
      this.ifLogin = true;
    }
    bus.$emit("loginInfo", this.ifLogin);
  },
  methods: {
    choosePages: function() {
      if (!this.ifLogin) {
        this.$router.push({ name: "Login" });
      } else {
        console.log("已登陆");
      }
    },
    goRegister: function() {
      this.$router.push({ name: "Login", params: { type: 1 } });
    },
    logout: function() {
      console.log(1);
      localStorage.clear();
      location.reload();
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
}

.littleHeader {
  width: 100%;
  height: 0.5rem;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e5e5e5;
}

.lhContent {
  width: 960px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 9px;
}

.dst {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dstText:hover {
  color: red;
}

.userContainer {
  display: flex;
}

.loginContainer {
  display: flex;
  align-items: center;
}

.loginText {
  color: $mainRed;
  cursor: pointer;
  padding: 0 3px;
}

.registText {
  color: $mainGrey;
  cursor: pointer;
  padding: 0 8px;
}

.registText:hover {
  color: $mainRed;
}

.headerContainer {
  width: 80%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: red;
}

.icon {
  width: 15px;
  height: 15px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.myOrder {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.myOrder:hover {
  color: $mainRed;
}

.quit {
  font-size: 8px;
  cursor: pointer;
}
</style>
