<template>
  <div class="container">
      <div class="zlxgPanelClass">
    <el-form
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width: 280px;"
    >
      <el-form-item label="原始密码" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="新确认密码" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      
      <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
  </el-form-item>
    </el-form>
    
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        formData: {
            name:'',
        },
        rules:{
            name:[]
        }
        
    };
  },
  mounted(){},
  methods:{
      submitForm(){}
  },
};
</script>
<style scoped lang="scss">
/deep/ .el-form-item__label{
color:#fff;
}
</style>
<style>
.container .zlxgPanelClass{
  height: 800px;
  color: #fff;
  width: 100%;
  text-align: left;
  background-color: rgba(37, 50, 56, 0.6);
}
</style>