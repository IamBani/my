<template>
  <div class="login">
    <div class="title">
      <div>嗨派门店收银</div>
      <span>HYPER SPACE Shop Cashier Platform</span>
    </div>
    <div class="login-content">
      <div class="login-user">
        <div>
          <input
            type="text"
            placeholder="用户名"
            id="user-input"
            v-model="username"
            @keyup.enter="getLoginData"
          />
        </div>
      </div>
      <div class="login-pass">
        <div>
          <input
            type="password"
            placeholder="密码"
            id="pass-input"
            v-model="password"
            @keyup.enter="getLoginData"
          />
        </div>
       
      </div>
      
      <div id="login-btn" @click="getLoginData">登&emsp;录</div>
    </div>
     
  </div>
</template>

<script>
import { loginForAdmin } from "../api/index";
import md5 from "js-md5";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {
    localStorage.clear();
  },
  methods: {
    getLoginData() {
      // const { passWord, userName } = this.formInline;
      let params = {
        ismanageruser: 0,
        useraccount: this.username,
        password: this.$md5(this.password)
      };
      //  const result = await switchUser(data);
      loginForAdmin(params).then(res => {
        if (res && res.code) {
          console.log('res',res)
          this.$message.success(res.msg);
          let timer = setTimeout(() => {
            this.$router.push('/')
          
            localStorage.setItem("USERINFO",JSON.stringify(res.data))
            localStorage.setItem("token",JSON.stringify(res.data.managerUser.id))
          }, 1500);
         
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: url(../assets/images/login/bg.jpg) no-repeat; */
  background-size: 100% 100%;
}

.title {
  position: absolute;
  top: 100px;
  left: calc(50% - 10 * 38px / 2);
}

.title > div {
  line-height: 50px;
  font-size: 38px;
  font-weight: bolder;
  color: #1ca2f9;
}

.title > span {
  font-size: 16px;
  line-height: 24px;
  color: #1ca2f9;
}

.login-content {
  position: absolute;
  top: 200px;
  width: 400px;
  height: 270px;
  left: calc(50% - 200px);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
}

.login-user {
  position: absolute;
  top: 18%;
  left: 60px;
  right: 60px;
  height: 30px;
  line-height: 30px;
  background-color: #ffffff;
}

.login-user > div {
  padding-left: 40px;
  /* background: url(../assets/images/login/user.png) no-repeat left; */
}

.login-pass {
  position: absolute;
  top: calc(36% + 30px);
  left: 60px;
  right: 60px;
  height: 30px;
  line-height: 30px;
  background-color: #ffffff;
}

.login-pass > div {
  padding-left: 40px;
  /* background: url(../assets/images/login/password.png) no-repeat left; */
}

#user-input,
#pass-input {
  height: 30px;
  width: 100%;
  border: none;
  outline: none;
}

input::-webkit-input-placeholder {
  color: #999;
  -webkit-transition: color 0.5s;
}

input:hover::-webkit-input-placeholder {
  color: #c2c2c2;
  -webkit-transition: color 0.5s;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
  -webkit-transition: color 0.5s;
}

#login-btn {
  position: absolute;
  top: calc(54% + 60px);
  left: 60px;
  right: 60px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  background: #1ca2f9;
}
</style>
