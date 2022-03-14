<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="common-dialog "
    class="xzyglb-dialog"
    :before-close="dialogClose"
  >
    <el-form
      size="small"
      :model="formData"
      ref="ruleForm"
      class="ywgc-ruleForm"
      label-width="100px"
    >
      <div class="ywgc-form">
        <el-form-item label="员工姓名:">
          <el-input v-model="formData.ywgcmc" placeholder="请输入员工姓名"></el-input>
        </el-form-item>

        <el-form-item label="性别:">
          <el-input v-model="formData.ywgcmc" placeholder="请输入性别"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input v-model="formData.ywgcmc" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="门店:">
          <!-- <el-input v-model="formData.ywgcmc" placeholder="请输入标题"></el-input> -->
          <el-select v-model=" formData.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工分类:">
          <!-- <el-input v-model="formData.ywgcmc" placeholder="请输入标题"></el-input> -->
          <el-select v-model=" formData.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="formData.ywgcmc" placeholder="请输入标题"></el-input>
        </el-form-item>
        <!-- <el-form-item label="描述:">
          <el-input type="textarea" :rows="5" v-model="formData.ms" placeholder="请输入"></el-input>
        </el-form-item>-->
      </div>
      <div class="ywgc-btn">
        <el-button
          style="padding: 8px 30px;background-color: #3295fd;color: #fff;"
          @click="submitForm('ruleForm')"
        >保存</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      formData: {
        ywgcmc: "", //
        ms: "", //
        value: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  props: {
    dialogVisible: Boolean,
    ywlx: String,
    mlid: String,
    title: String,
    ywgcData: Object
  },
  methods: {
    dialogClose() {
      this.$emit("dialogClose");
    }
  }
};
</script>
<style  lang="scss">
.xzyglb-dialog {
  .el-dialog {
    // margin: calc((50% - 350px - 20px) / 2) auto !important;
    // margin: calc((50% - 500px - 10px) / 2) auto !important;
   margin: calc((50% - 540px - 20px) / 2) auto !important;
    height: 500px;
    width: 500px;
  }
  .ywgc-ruleForm {
    padding: 10px 20px;
    width: calc(100% - 40px);
    height: calc(100% - 20px);
    .ywgc-form {
      height: calc(100% - 40px);
      width: 100%;
      overflow: auto;
    }
    .ywgc-btn {
      height: 40px;
      line-height: 40px;
      text-align: right;
    }
  }
}
</style>