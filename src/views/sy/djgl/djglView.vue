<template>
  <div class="container">
    <div class="djglPanelClass">
      <div class="djgl-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="消费单据" name="first">
            <!-- 消费单据 -XFdjView -->
            <xfgl-View></xfgl-View>
            <!-- 消费单据 -->
            </el-tab-pane>
          <el-tab-pane label="充值单据" name="second">
            <!-- 充值单据 -->
            <czdj-View></czdj-View>
            <!-- CZdjView -->
            </el-tab-pane>
          <el-tab-pane label="充次单据" name="third">
            <!--CCdjView   -->
            <!-- 充次单据 -->
            <ccdj-View></ccdj-View>
            </el-tab-pane>
          <el-tab-pane label="兑换单据" name="fourth">
            <!-- DHdjView -->
            <!-- 兑换单据 -->
          <dhdj-View></dhdj-View>
            </el-tab-pane>
          <el-tab-pane label="挂单列表" name="gdlb">
            <!-- GDlbView -->
            <!--  挂单列表 -->
            <gdlb-View></gdlb-View>
            </el-tab-pane>
          <el-tab-pane label="会员卡单据" name="text">
            <!-- HYdjView -->
            <!-- 会员卡单据 -->
            <hydj-View></hydj-View>
            </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import xfglView from './ZJdjgl/xfdjView'
import czdjView from './ZJdjgl/czdjView'
import ccdjView from './ZJdjgl/ccdjView'
import dhdjView from './ZJdjgl/dhdjView'
import gdlbView from './ZJdjgl/gdlbView'
import hydjView from './ZJdjgl/hydjView'

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
   components: {
     xfglView,
     czdjView,
     ccdjView,
     dhdjView,
     gdlbView,
     hydjView
   },
  data() {
    return {
      activeName: "second"
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
