<template>
  <div class="container">
    <div class="djglPanelClass">
      <div class="djgl-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="商城订单" name="first">
            <!-- 消费单据 -XFdjView -->
            <!-- <xfgl-View></xfgl-View> -->
            <zjscdd-View></zjscdd-View>
            <!-- 消费单据 -->
            </el-tab-pane>
          <el-tab-pane label="订单核销" name="second">
            <!-- 充值单据 -->
            <!-- <czdj-View></czdj-View> -->
            <djhx-View></djhx-View>
            <!-- CZdjView -->
            </el-tab-pane>
          <el-tab-pane label="退款申请" name="third">
            <!--CCdjView   -->
            <!-- 充次单据 -->
            <!-- <ccdj-View></ccdj-View> -->
            <tksq-View></tksq-View>
            </el-tab-pane>
          
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import xfglView from './zujian/xfdjView'
// import czdjView from './zujian/czdjView'
// import ccdjView from './zujian/ccdjView'
import zjscddView from './ZJscdd/ZJscddView'
import djhxView from './ZJscdd/djhxView'
import tksqView from './ZJscdd/tksqView'

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
   components: {
     zjscddView,
     djhxView,
     tksqView
    //  xfglView,
    //  czdjView,
    //  ccdjView,
     
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
