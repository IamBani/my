<template>
  <div class="systemPage">
    <!-- @headerClick="headerClick"   :userName="userName"-->
    <Header :userName="userName"></Header>
    <div class="systemPage-content">
      <!--  @mouseMove="leftMenuMove" -->
      <left-menu @mouseMove="leftMenuMove" @leftMenuClick="getRouteData"></left-menu>
      <!-- :style="{'left': leftGap} -->
      <div class="right-container">
        <!-- <current-position  style="float: left;"></current-position> -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import LeftMenu from "./LeftMenu";
// import CurrentPosition from '../components/common/CurrentPosition'
export default {
  name: "Home",
  data() {
    return {
      userNameList:'',
      userName: "",
      //后台路由默认展开地址 记录地址
      leftGap: "160px",
      // 展开页 修改页面
      headerMenuPath: "login",
      positionArr: []
    };
  },
  props: {
    // msg: String
  },
  components: {
    Header,
    LeftMenu
    // CurrentPosition
  },
  mounted() {
    this.getRouteData();
    //暂时写死，刷新强制跳转至默认页
    this.$router.push("/");
  },
  methods: {
    //
    leftMenuMove(val) {
      console.log(val);
      // this.leftGap = val + "px";
    },
    getRouteData() {
      let _this = this;
      _this.positionArr = [];
      this.$route.matched.forEach(function(d) {
        if (d.name === "login") return;
        _this.positionArr.push({ name: d.name, path: d.path });
      });
    },
    headerClick(path) {
      console.log("path", path);
      this.headerMenuPath = path;
    }
  },
  beforeMount() {
    this.userNameList =
      localStorage.getItem("USERINFO") &&
      JSON.parse(localStorage.getItem("USERINFO"));
      if(this.userNameList.managerUser){
        if(this.userNameList.managerUser.useraccount!=''){
       this.userName= this.userNameList.managerUser.useraccount;
        }
        }
     
   
  }
};
</script>
<style  scoped lang="scss">
.systemPage {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .systemPage-content {
    position: relative;
    height: calc(100% - 50px);
    width: 100%;
    // background-color: #eef1f6;
    background-color: #161f24;
    .right-container {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      // padding: 12px 1px 17px 18px;
      padding: 12px 12px 12px 12px;
      // border: 1px solid #fff;
      // width: calc(100% - 240px);
      width: calc(100% - 225px);
      overflow: auto;
    }
  }
}
</style>
