<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="common-dialog "
    class="xzfjcd-dialog"
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
        <el-form-item label="菜单名称:" prop="menuname">
          <el-input v-model="formData.menuname" placeholder="请输入路由名称"></el-input>
        </el-form-item>
        <el-form-item label="图标地址:" prop="menuicon">
          <el-input v-model="formData.menuicon" placeholder="请输入图标地址"></el-input>
        </el-form-item>
        <el-form-item label="菜单排序:" prop="menusort">
          <el-input v-model="formData.menusort" placeholder="请输入菜单排序"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型:" prop="menutype">
          <el-input v-model="formData.menutype" placeholder="请输入分配路由"></el-input>
        </el-form-item>
        <el-form-item label="菜单地址:" prop="menuurl">
          <el-input v-model="formData.menuurl" placeholder="请输入菜单地址"></el-input>
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
import { AddMenu, EditMenu } from "../../../../api/index";
export default {
  name: "",
  data() {
    return {
      formData: {
        id: "",
        menuparentid: "",
        menuname: "", //
        menuicon: "", //
        menusort: "",
        menutype: "",
        menuurl: ""
      },
      rules: {
        menuname: [
          { required: true, message: "菜单名称", trigger: ["change", "blur"] }
        ],
        menuicon: [
          { required: true, message: "图标地址", trigger: ["change"] }
        ],
        menusort: [
          { required: true, message: "菜单排序", trigger: ["change"] }
        ],
        menutype: [
          { required: true, message: "菜单类型", trigger: ["change"] }
        ],
        menuurl: [{ required: true, message: "菜单地址", trigger: ["change"] }]
      },
      value: ""
    };
  },
  props: {
    dialogVisible: Boolean,
    ywlx: String,
    mlid: String,
    title: String,
    yglbData: Object,
    editType: String,
    menuparentid: String
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.formData = {
          id: "",
          menuname: "", //
          menuicon: "", //
          menusort: "",
          menutype: "",
          menuurl: ""
        };
        if (JSON.stringify(this.yglbData) != "{}") {
          console.log("this.yglbData", this.yglbData);
          // this.yglbData
          //   this.formData = JSON.parse(JSON.stringify(this.yglbData)); //深拷贝，避免影响表格
          this.formData = {
            //   children:this.yglbData.children,
            id: this.yglbData.id,
            menuicon: this.yglbData.menuicon,
            menuname: this.yglbData.menuname,
            menuparentid: this.yglbData.menuparentid,
            menusort: this.yglbData.menusort,
            menutype: this.yglbData.menutype,
            menuurl: this.yglbData.menuurl
          };
        }
      }
    }
  },
  methods: {
    submitForm(formData) {
      if (this.editType == "add") {
        let params = {
          menuparentid: this.menuparentid,
          ...this.formData
        };
        AddMenu(params).then(res => {
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
        //   });
        // }
      }
      if (this.editType == "edit") {
        let params = {
          //   menuparentid: this.menuparentid,
          ...this.formData
        };
        EditMenu(params).then(res => {
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
.xzfjcd-dialog {
  .el-dialog {
    // margin: calc((50% - 350px - 20px) / 2) auto !important;
    // margin: calc((50% - 500px - 10px) / 2) auto !important;
    margin: calc((50% - 540px - 20px) / 2) auto !important;
    height: 400px;
    width: 400px;
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