<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="common-dialog "
    class="xzywgc-dialog"
    :before-close="dialogClose"
  >
    <el-form
      size="small"
      :model="formData"
      ref="ruleForm"
      class="ywgc-ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <div class="ywgc-form">
        <el-form-item label="子表名称:" prop="descriptions">
          <el-input v-model="formData.descriptions" placeholder="请输入子表名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="参数值名称:" prop="shortdesc">
          <el-input
            v-model="formData.shortdesc"
            placeholder="请输入参数值名称"
            :disabled="editTypeZ==='add' ? false : true"
          ></el-input>
        </el-form-item>-->
      </div>
      <div class="ywgc-btn">
        <el-button
          style="padding: 8px 30px;background-color: #3295fd;color: #fff;"
          @click="submitForm('formData')"
        >保存</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import { ZAddDictitemDict, ZqueryAllByDict } from "../../../../api/index";
export default {
  name: "",
  data() {
    return {
      formData: {
        id: "",
        descriptions: ""
        // shortdesc: "" //
      },
      rules: {
        descriptions: [
          { required: true, message: "菜单名称", trigger: ["change", "blur"] }
        ]
        // shortdesc: [
        //   { required: true, message: "图标地址", trigger: ["change"] }
        // ]
      },
      value: ""
    };
  },
  props: {
    dialogVisible: Boolean,
    mild:String,
    title: String,
    selectedZjID:String,
    parentvalue:String,
    ZjzdbgData: Object,
    editTypeZj: String,
    descriptionName: String,
    tabelID:String,//父级id 查子查子集
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.formData = {
          dictvalue: "",
          parentvalue: "",
          dictvalue:'',
          dictid: "",
          id: "",
          descriptions: "",
          shortdesc: "" //
        };
        if (JSON.stringify(this.ZjzdbgData) != "{}") {
          console.log("this.yglbData", this.ZjzdbgData);
          //   this.formData = JSON.parse(JSON.stringify(this.yglbData)); //深拷贝，避免影响表格
          this.formData = {
            dictvalue: this.ZjzdbgData.dictvalue,
            parentvalue: this.ZjzdbgData.parentvalue,
            dictid: this.ZjzdbgData.dictid,
            descriptions: this.ZjzdbgData.description,
            shortdesc: this.ZjzdbgData.shortdesc,
            // dictvalue:this.ZjzdbgData.dictvalue,
            id: this.ZjzdbgData.id
          };
        }
      }
    }
  },
  methods: {
    submitForm(formData) {

      if (this.editTypeZj == "add") {
        let params = {
          description: this.formData.descriptions,
          parentvalue: this.parentvalue,
          shortdesc: this.formData.descriptions
        };
       
        ZAddDictitemDict(params).then(res => {
          if (res && res.code) {
            this.$message.success("保存成功");
            // 刷新列表
            // 关闭弹窗
            this.dialogClose();
            this.$emit("refresh", this.tabelID);
          } else {
            this.$message.error("保存失败");
          }
        });
      }
      if (this.editTypeZj == "edit") {
        let params = {
          description: this.formData.descriptions,
          parentvalue:this.formData.parentvalue,
          shortdesc: this.formData.descriptions,
          id: this.parentvalue,
        };
        
        ZqueryAllByDict(params).then(res => {
          if (res && res.code) {
            this.$message.success("保存成功");
            // 刷新列表
            // 关闭弹窗
            this.dialogClose();
           
            this.$emit("refresh", this.tabelID);
          } else {
            this.$message.error("保存失败");
          }
        });
      }
    },
    //   关闭
    dialogClose() {
      this.$emit("dialogClose");
    }
  }
};
</script>
<style  lang="scss">
.xzywgc-dialog {
  .el-dialog {
    // margin: calc((50% - 350px - 20px) / 2) auto !important;
    // margin: calc((50% - 500px - 10px) / 2) auto !important;
    margin: calc((50% - 540px - 20px) / 2) auto !important;
    height: 300px;
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