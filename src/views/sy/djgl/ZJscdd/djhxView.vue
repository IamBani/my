<template>
  <div class="container">
    <div class="djglPanelClass">
      <div class="djhx-top">
        <el-row :gutter="20" class="top">
          <el-col :span="24">
            <el-input placeholder="请输入内容" v-model="input2" style="width: 500px;">
              <el-button slot="append" type="success">查询</el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="top">
          <el-col :span="24">
            <span class="top-text">1.搜索单据号或核销码</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="top">
          <el-col :span="24">
            <span>请顾客出示订单信息，输入单据号码或核销码</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="top">
          <el-col :span="24">
            <span class="top-text">2.校验信息</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="top">
          <el-col :span="24">
            <span>系统提示有效验证，其他信息请自行核对</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="top">
          <el-col :span="24">
            <span class="top-text">3.使用完成</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="top">
          <el-col :span="24">
            <span>查看使用结果</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "djhxView",
  data() {
    return {
      input2: ""
    };
  }
};
</script>
<style  scoped lang="postcss" >
.djglPanelClass {
  text-align: center;
  /* border:  1px solid #fff; */
}
.djhx-top {
  /* width: 820px; */
  width: 500px;
  /* width: 100%; */
  /* border: 1px solid #fff; */
  text-align: left;
  margin:  0 auto;
}
.top {
  /* text-align: center; */
  padding-top: 40px;
  /* padding-bottom: 0px; */
  /* border: 1px solid #fff; */
}
.top-text {
  font-size: 19px;
  color: #2b96fe;
  /* text-align: center; */
}
.text {
  /* width: 700px; */
  /* width: 600px; */
  /* text-align: center; */
}
</style>
<style>
.container .djglPanelClass {
  /* height: 640px; */
  /* height: 800px;
  border:  1px solid #fff;
  color: #fff;
  width: 100%;*/
  text-align: center;
  background-color: rgba(37, 50, 56, 0.6);
}
</style>