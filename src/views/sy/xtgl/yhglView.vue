<template>
  <div class="container">
    <div class="djglPanelClass">
      <div class="djgl-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">
            <!-- 用户管理 -zjyhglView -->
            <zjyhgl-View></zjyhgl-View>
          </el-tab-pane>
          <el-tab-pane label="岗位管理" name="second">
            <!-- 岗位管理 -->
            <!-- <mmxg-View></mmxg-View> -->
            <gwgl-View></gwgl-View>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import zjyhglView from "./xtglZJ/ZJYhglView";
import gwglView from './xtglZJ/gwglView'
// import mmxgView from "./xtglZJ/mmxgView";


export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    zjyhglView,
    gwglView
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.djgl-top {
  color: #ffff;
  padding-left: 10px;
    padding-right: 10px;
}
/deep/.el-tabs__item {
  color: #ffff;
}
</style>
<style >
.container .djglPanelClass {
  /* height: 640px; */
  height: 800px;
  color: #fff;
  width: 100%;
  text-align: left;
  background-color: rgba(37, 50, 56, 0.6);
}
</style>
