<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="common-dialog "
    class="splr-dialog"
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
        <el-form-item label="商品类型:" prop="menuname">
          <div class="button">
            <div class="botpo1" :class="{active:isShow===1}" @click="TabClass(1)">
              <el-row>
                <el-col :span="24" style="padding-left: 10px; font-size: 18px;">
                  <div class="grid-content bg-purple-dark">普通商品</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="padding-left: 10px">
                  <div class="grid-content bg-purple-dark">例如便利店规格销售，不区分颜色等级规格</div>
                </el-col>
              </el-row>
              <!-- <span class=''>普通商品</span> -->
              <!-- <span class=''>例如便利店规格销售，不区分颜色等级规格</span> -->
            </div>
            <div class="botpo2" :class="{active:isShow===2}" @click="TabClass(2)">
              <el-row>
                <el-col :span="24" style="padding-left: 10px; font-size: 18px;">
                  <div class="grid-content bg-purple-dark">普通商品</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="padding-left: 10px">
                  <div class="grid-content bg-purple-dark">例如便利店规格销售，不区分颜色等级规格</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
        <div v-if="isShow===1">
          <el-form-item label="商品编号:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入商品编号"></el-input>
          </el-form-item>
          <el-form-item label="商品名称:" prop="menusort">
            <el-input v-model="formData.menusort" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品分类:" prop="menutype">
            <el-input v-model="formData.menutype" placeholder="请输入分配路由"></el-input>
          </el-form-item>
          <el-form-item label="商品简码:" prop="menuurl">
            <el-input v-model="formData.menuurl" placeholder="请输入商品简码"></el-input>
          </el-form-item>
           <el-form-item label="商品单位:" prop="menuurl">
            <el-input v-model="formData.menuurl" placeholder="请输入商品单位"></el-input>
          </el-form-item>
          <el-form-item label="排序:" prop="menuurl">
            <el-input v-model="formData.menuurl" placeholder="请输入排序"></el-input>
          </el-form-item>
          <el-form-item label="零售价:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入零售价"></el-input>
          </el-form-item>
           <el-form-item label="参考进价:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入参考进价"></el-input>
          </el-form-item>
          <el-form-item label="会员特价:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入会员特价"></el-input>
          </el-form-item>
          <el-form-item label="商品规格:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入商品规格"></el-input>
          </el-form-item>
           <el-form-item label="积分方式:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入积分方式"></el-input>
          </el-form-item>
           <el-form-item label="最低折扣:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入最低折扣"></el-input>
          </el-form-item>
           <el-form-item label="商品图片:" prop="menuicon">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
            <el-form-item label="门店介绍:" prop="dictid">
            <quill-editor
              class="ql-editor-class"
              v-model="formData.dictid"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </el-form-item>
          
        </div>
        <div v-if="isShow===2">
          <el-form-item label="商品编号:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入商品编号"></el-input>
          </el-form-item>
          <el-form-item label="商品名称:" prop="menusort">
            <el-input v-model="formData.menusort" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品简码:" prop="menutype">
            <el-input v-model="formData.menutype" placeholder="请输入商品简码"></el-input>
          </el-form-item>
          <el-form-item label="排序:" prop="menuurl">
            <el-input v-model="formData.menuurl" placeholder="请输入排序"></el-input>
          </el-form-item>
          <el-form-item label="零售价:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入商品编号"></el-input>
          </el-form-item>
           <el-form-item label="参考进价:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入商品编号"></el-input>
          </el-form-item>
          <el-form-item label="会员特价:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入商品编号"></el-input>
          </el-form-item>
          <el-form-item label="商品规格:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入商品编号"></el-input>
          </el-form-item>
           <el-form-item label="积分方式:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入商品编号"></el-input>
          </el-form-item>
           <el-form-item label="最低折扣:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入最低折扣"></el-input>
          </el-form-item>
           <el-form-item label="商品图片:" prop="menuicon">
            <el-input v-model="formData.menuicon" placeholder="请输入商品图片"></el-input>
          </el-form-item>
           <el-form-item label="商品图片:" prop="menuicon">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
            <el-form-item label="门店介绍:" prop="dictid">
            <quill-editor
              class="ql-editor-class"
              v-model="formData.dictid"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </el-form-item>
        </div>
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
import quillConfig from "../../../../components/quillConfig/quill-config";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  name: "",
  data() {
    return {
      editorOption: quillConfig,
      isShow:1,
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
    // dialogVisible(newVal) {
    //   if (newVal) {
    //     this.formData = {
    //       id: "",
    //       menuname: "", //
    //       menuicon: "", //
    //       menusort: "",
    //       menutype: "",
    //       menuurl: ""
    //     };
    //     if (JSON.stringify(this.yglbData) != "{}") {
    //       console.log("this.yglbData", this.yglbData);
    //       // this.yglbData
    //       //   this.formData = JSON.parse(JSON.stringify(this.yglbData)); //深拷贝，避免影响表格
    //       this.formData = {
    //         //   children:this.yglbData.children,
    //         id: this.yglbData.id,
    //         menuicon: this.yglbData.menuicon,
    //         menuname: this.yglbData.menuname,
    //         menuparentid: this.yglbData.menuparentid,
    //         menusort: this.yglbData.menusort,
    //         menutype: this.yglbData.menutype,
    //         menuurl: this.yglbData.menuurl
    //       };
    //     }
    //   }
    // }
  },
  methods: {
    TabClass(val){
      this.isShow=val
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    // submitForm(formData) {
    //   //   this.$refs[formData].validate(valid => {
    //   //     if (valid) {
    //   console.log("this.menuparentid", this.menuparentid);
    //   if (this.editType == "add") {
    //     let params = {
    //       menuparentid: this.menuparentid,
    //       ...this.formData
    //     };
    //     console.log("params", params);
    //     AddMenu(params).then(res => {
    //       if (res && res.code) {
    //         this.$message.success("保存成功");
    //         // 刷新列表
    //         // 关闭弹窗
    //         this.dialogClose();
    //         this.$emit("refresh");
    //       } else {
    //         this.$message.error("保存失败");
    //       }
    //     });
    //     //   });
    //     // }
    //   }
    //   if (this.editType == "edit") {
    //     let params = {
    //       //   menuparentid: this.menuparentid,
    //       ...this.formData
    //     };
    //     EditMenu(params).then(res => {
    //       console.log("binji", res);
    //       if (res && res.code) {
    //         this.$message.success("保存成功");
    //         // 刷新列表
    //         // 关闭弹窗
    //         this.dialogClose();
    //         this.$emit("refresh");
    //       } else {
    //         this.$message.error("保存失败");
    //       }
    //     });
    //   }
    // },

    //   关闭
    dialogClose() {
      this.$emit("dialogClose");
    }
  }
};
</script>
<style  lang="scss">
.splr-dialog {
  .el-dialog {
    // margin: calc((50% - 350px - 20px) / 2) auto !important;
    // margin: calc((50% - 500px - 10px) / 2) auto !important;
    // margin: calc((50% - 540px - 20px) / 2) auto !important;
    // height: 520px;
    height: 1200px;
    width: 700px;
  }
  .button {
    width: 500px;
    height: 80px;
  }
  .botpo1 {
    float: left;
    width: 160px;
    height: 80px;
  }
  .botpo2 {
    float: right;
    width: 160px;
    height: 80px;
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