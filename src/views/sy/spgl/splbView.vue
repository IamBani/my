<template>
  <div class="container">
    <div class="djglPanelClass">
      <div class="djgl-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="商品类表" name="first">
            <!-- 商品类表 -XFdjView -->
            <!-- <xfgl-View></xfgl-View> -->
            <splb-View></splb-View>
            </el-tab-pane>
          <el-tab-pane label="礼品列表" name="second">
            <!-- 礼品列表 -->
            <!-- <czdj-View></czdj-View> -->
            <lplb-View></lplb-View>
            </el-tab-pane>
         
          
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import xfglView from '../djgl/zujian/xfdjView'
// import czdjView from '../djgl/zujian/czdjView'
import splbView from './spglZJ/splbView'
import lplbView from './spglZJ/lplbView'


export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
   components: {
    //  xfglView,
    //  czdjView,
    splbView,
    lplbView
     
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
