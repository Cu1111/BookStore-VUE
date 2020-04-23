<template>
  <div class="page">
    <div class="loginContainer">
      <!-- <div class="imgContainer"></div> -->
      <el-image
        style="width: auto; height: 5rem"
        :src="'https://passport.yhd.com/front-passport/passport/images/login_pic.png'"
        :fit="'contain'"
      ></el-image>
      <el-card class="box-card" :class="{'active':!ifLogin}">
        <div class="cardContent" :class="{'active1':!ifLogin}">
          <div class="choiceContainer" v-show="ifLogin">
            <div class="loginText">小书童用户登录</div>
            <div class="register" @click="ifLogin = !ifLogin">注册新账号</div>
          </div>
          <div class="choiceContainer" v-show="!ifLogin">
            <div class="loginText">小书童用户注册</div>
            <div class="register" @click="ifLogin = !ifLogin">已有帐户</div>
          </div>
          <div class="formContainer" v-show="ifLogin">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              v-model="loginUserName"
              class="input"
            ></el-input>
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="loginPassword"
              show-password
              class="input"
            ></el-input>
            <el-button type="danger" class="btn" @click="Login()">登&nbsp;&nbsp;&nbsp;录</el-button>
          </div>
          <div class="formContainer1" v-show="!ifLogin">
            <div>
              <el-input placeholder="请输入昵称" v-model="registerName" size="small">
                <template slot="prepend" class="test">昵称：</template>
              </el-input>
            </div>
            <div>
              <el-input placeholder="输入登陆账号" v-model="registerUser" size="small">
                <template slot="prepend">账号：</template>
              </el-input>
            </div>
            <div>
              <el-input placeholder="请输入密码" v-model="registerPassword" size="small" show-password>
                <template slot="prepend">密码：</template>
              </el-input>
            </div>
            <div>
              <el-input placeholder="请确认密码" v-model="registerPassword2" size="small" show-password>
                <template slot="prepend">确认：</template>
              </el-input>
            </div>
            <el-button type="danger" size="small" @click="register()">同意协议并注册</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      ifLogin: true,
      loginUserName: "",
      loginPassword: "",
      registerName: "",
      registerUser: "",
      registerPassword: "",
      registerPassword2: ""
    };
  },
  components: {},
  mounted() {
    if (this.$route.params.type == 1) {
      this.ifLogin = false;
    }
  },
  methods: {
    register: function() {
      let that = this;
      if (
        this.isEmpty(this.registerName) ||
        this.isEmpty(this.registerUser) ||
        this.isEmpty(this.registerPassword) ||
        this.isEmpty(this.registerPassword2) ||
        this.registerPassword != this.registerPassword2
      ) {
        this.open();
      } else {
        this.$axios({
          method: "post",
          url: "/register",
          data: this.$qs.stringify({
            username: this.registerUser,
            password: this.registerPassword,
            nickname: this.registerName
          })
        })
          .then(response => {
            that.ifLogin = !that.ifLogin;
            that.open1();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    isEmpty(obj) {
      if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
      } else {
        return false;
      }
    },
    open() {
      this.$confirm("注册信息出错，请检查更改后再次提交！", "ERROR", {
        confirmButtonText: "确定",
        type: "error"
      });
    },
    open1() {
      this.$notify({
        title: "成功",
        message: "恭喜您注册成功！",
        type: "success"
      });
    },
    Login() {
      let that = this;
      this.$axios({
        method: "post",
        url: "/login",
        data: this.$qs.stringify({
          username: this.loginUserName,
          password: this.loginPassword
        })
      })
        .then(response => {
          let ResData = response.data.data;
          localStorage.setItem("bookNickName", ResData.nickname);
          localStorage.setItem("bookUserName", ResData.username);
          // that.$router.replace({ name: "Main" });
          that.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~css/color.styl';

.page {
  width: 100%;
  height: calc(100vh - 66.2px);
  background-color: #fcfcfc;
  display: flex;
  justify-content: center;
}

.loginContainer {
  height: 9rem;
  width: 16rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.box-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 4.8rem;
}

.active {
  width: 6rem;
  height: 6.3rem;
}

.cardContent {
  width: 5rem;
  height: 4rem;
}

.active1 {
  width: 5rem;
  height: 5.8rem;
}

.choiceContainer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 0.3rem;
  width: 100%;
  z-index: 999;
}

.loginText {
  font-size: 0.25rem;
  color: #666666;
  font-weight: bold;
}

.register {
  font-size: 0.2rem;
  color: #0066CC;
  cursor: pointer;
}

.register:hover {
  color: #f60;
}

.formContainer {
  height: 3.8rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.formContainer1 {
  height: 5.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 10;
}

.input {
  font-size: 0.25rem;
}

.btn {
  font-weight: bold;
}

.test {
  padding: 0 10px !important;
}
</style>
