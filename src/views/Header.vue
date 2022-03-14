<template>
  <!-- 头部 菜单栏-->
  <div class="systemPage-Header">
    <!-- <div>头部</div> -->
    <el-col :span="24">
      <div class="logo">
        <!-- src="../assets/logo.jpg" -->
        <!-- <img :src="mgUrl" alt="logo" style="width:100px ;height:35px;line-height:35px" /> -->
         <img src="../assets/logo.jpg" alt="logo" style="width:100px ;height:35px;line-height:35px" />
      </div>
      <div class="userinfo-container">
        <!-- <el-divider direction="vertical"></el-divider> -->
        <el-dropdown trigger="click" class="userinfo-style">
          <span class="el-dropdown-link userinfo-text">
            <i class="el-icon-user-solid"></i>
            {{userName || 'ADMIN'}}
            <!-- <i class="el-icon-caret-bottom"></i> -->
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <!-- <div @click="showInfo"><span style="color: #555;font-size: 14px;">个人信息</span></div> -->
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="changePWD('修改密码')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item>
            <!-- <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
        <span trigger="click" class="userinfo-style">
          <i class="el-icon-user-solid"></i>
        </span>
        <span trigger="click" class="userinfo-style">
          <i class="el-icon-user-solid"></i>
        </span>
        <span trigger="click" class="userinfo-style">
          <i class="el-icon-user-solid"></i>
        </span>
        <span trigger="click" class="userinfo-style">
          <i class="el-icon-user-solid"></i>
        </span>
      </div>
      <div class="menu-container">
        <span style=" color: #ffffff;">后台管理</span>
        <!-- <el-menu mode="horizontal"
                 class="menu"
                 menu-trigger="hover"
                 :default-active="activeIndex"
                 @select="handleSelect"
                 active-text-color="#FFFFFF"
                 background-color="rgba(0,0,0,0)"
                 text-color="rgba(255,255,255,0.8)">
          <el-menu-item class="sub-menu" index="sy">后台管理</el-menu-item>
         
        </el-menu>-->
      </div>
    </el-col>
    <!-- 修改密码 弹窗 -->
    <pwd-Dialog
      :title="yglbTitle"
      :mild="selectedID"
      :yglbData="yglbData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible = false"
    ></pwd-Dialog>
  </div>
</template>
<script>
// import xzmdglDialog from "../views/sy/xtgl/xtglZJ/xzmdglDialog";

import pwdDialog from "../components/common/pwdDialog";
export default {
  name: "Header",
  props: {
      userName: String,
      // menuData: Array
    },
  data() {
    return {
       //编辑 id
      storename: "",
      //编辑 id
      selectedID: "",
      // 编辑数据
      yglbData: '',
      // 标题 修改或新增
      yglbTitle: "",
      dialogVisible: false, //业务过程弹框状态
      editType: "", //add新增，编辑
      // 
      userName1:'',
    
      mgUrl:require("../assets/logo.jpg"),
      // activeIndex: "sy",
      // pwdDialogVisible: false,
      // infoDialogVisible: false
    };
  },
  components: {pwdDialog},
  mounted() {},
  methods: {
    //  handleSelect(key, keyPath, elem) {
    //   this.$router.push({path: "/" + key});
    //   this.$emit('headerClick', key);
    // },
    // handleSelect(key) {
    //   this.$router.push({path: "/" + key});
    //   this.$emit('headerClick', key);
    // },
    logout() {},
    changePWD(val) {
      // this.pwdDialogVisible = true;
       this.dialogVisible = true;
        this.yglbTitle = val;
        let datalist=localStorage.getItem("USERINFO") &&JSON.parse(localStorage.getItem("USERINFO"));
          if(datalist.managerUser){
            this.yglbData = datalist.managerUser.id
          }
        
    },
    // showInfo() {
    //   this.infoDialogVisible = true;
    // }
  }
};
</script>
<style scoped lang="scss">
.systemPage-Header {
  position: relative;
  height: 50px;
  line-height: 50px;
  width: 100%;
  padding: 0;
  // background-color: #3280fe;
  // background-color: #000;
  background: -webkit-linear-gradient(left, #030406, #060b0e, #101d23, #15222b);
  .logo {
    float: left;
    height: 50px;
    line-height: 50px;
    // color: #FFFFFF;
    padding-left: 12px;

    > img {
      margin: 17px 0;
    }
  }
  .userinfo-container {
    float: right;
    padding-right: 20px;
    padding-left: 10px;
    height: 50px;
    // width: 50%;
    box-sizing: border-box;
    color: #ffffff;
    .userinfo-text {
      color: #fff;
      cursor: pointer;
    }
  }
  .userinfo-style {
    margin-right: 20px;
  }
  .menu-container {
    // float: right;
    float: left;
    height: 50px;
    .menu {
      .sub-menu {
        height: 50px;
        line-height: 50px;
      }

      .sub-menu:hover,
      .el-menu-item.is-active {
        border-color: #fe930f !important;
        background: rgba(255, 255, 255, 0.2) !important;
        a {
          outline: 0;
        }
      }
    }
  }
}
</style>