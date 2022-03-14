<template>
  <div class="container">
    <div class="djglPanelClass">
      <div class="djgl-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="员工分类" name="first">
            <!-- 员工分类 -XFdjView -->
            <!-- <xfgl-View></xfgl-View> -->
           <ygfl-View></ygfl-View>
            </el-tab-pane>
          <el-tab-pane label="员工列表" name="second">
            <!-- 员工列表 -->
            <!-- <czdj-View></czdj-View> -->
            <zjyglb-View></zjyglb-View>
            </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import ygflView from './ZJyglb/ygflView'
import zjyglbView from './ZJyglb/ZJyglbView'
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
   components: {
     ygflView,
     zjyglbView     
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
