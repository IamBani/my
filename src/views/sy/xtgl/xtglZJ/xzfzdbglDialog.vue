<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="common-dialog "
    class="xzfzdbgl-dialog"
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
        <el-form-item label="字典名称:" prop="description">
          <el-input v-model="formData.description" placeholder="请输入字典名称"></el-input>
        </el-form-item>
        <el-form-item label="字典值:" prop="dictid">
          <el-input
            v-model="formData.dictid"
            placeholder="请输入字典值"
            :disabled="editType==='add' ? false : true"
          ></el-input>
        </el-form-item>
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
import { AddFAddDict, FzdbEditDict } from "../../../../api/index";
export default {
  name: "",
  data() {
    return {
      formData: {
        description: "", //
        dictid: "" //
      },
      rules: {
        description: [
          { required: true, message: "字典名称", trigger: ["change", "blur"] }
        ],
        dictid: [{ required: true, message: "主键", trigger: ["change"] }]
      },
      value: ""
    };
  },
  props: {
    dialogVisible: Boolean,
    FzdbgTitle: String,
    title: String,
    FzdbgData: Object,
    editType: String
    // menuparentid: String
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.formData = {
          description: "", //
          dictid: "" //
        };
        if (JSON.stringify(this.FzdbgData) != "{}") {
          //   this.formData = JSON.parse(JSON.stringify(this.yglbData)); //深拷贝，避免影响表格
          this.formData = {
            description: this.FzdbgData.description,
            dictid: this.FzdbgData.dictid
          };
        }
      }
    }
  },
  methods: {
    submitForm(formData) {
      if (this.editType == "add") {
        let params = {
          ...this.formData
        };
        AddFAddDict(params).then(res => {
          if (res && res.code) {
            this.$message.success("保存成功");
            // 刷新列表
            // 关闭弹窗
            this.dialogClose();
            this.$emit("refresh");
          } else {
            this.$message.error("保存失败");
          }
        });
      }
      if (this.editType == "edit") {
        let paramss = {
          ...this.formData
        };

        FzdbEditDict(paramss).then(res => {
          if (res && res.code) {
            this.$message.success("保存成功");
            // 刷新列表
            // 关闭弹窗
            this.dialogClose();
            this.$emit("refresh");
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
.xzfzdbgl-dialog {
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