<template>
  <div>
    <!-- <div> -->
    <el-dialog
      :title="title"
      :visible="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      custom-class="common-dialog "
      class="xzmdgl-dialog"
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
          <el-form-item label="门店名称:" prop="storename">
            <el-input v-model="formData.storename" placeholder="请输入门店名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人:" prop="storecontacts">
            <el-input v-model="formData.storecontacts" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="storemobile">
            <el-input v-model="formData.storemobile" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="门店地址:" prop="stroeaddress">
            <el-input placeholder="请输入门店地址" v-model="formData.stroeaddress">
              <el-button slot="append" type="success" @click="MapClick()">定位</el-button>
            </el-input>
            <!-- <el-input v-model="formData.dictid" placeholder="请输入联系电话"></el-input> -->
          </el-form-item>
          <!-- storestate -->
          <el-form-item label="门店状态:" prop="storestate">
            <el-select v-model="formData.storestate" placeholder="请选择状态" style="width: 200px;">
              <el-option
                style="width: 200px;"
                v-for="item in Condition"
                :key="item.storestate"
                :label="item.label"
                :value="item.storestate"
              ></el-option>
              
            </el-select>
            <!-- <el-input v-model="formData.dictid" placeholder="请输入联系电话"></el-input> -->
          </el-form-item>
          <el-form-item label="上传图片:" prop="storeimage">
            <!-- :action="`${config.baseUrl}/file/upload`" -->
            <el-upload
              class="avatar-uploader"
              :action="`${config.baseUrl}/file/upload`"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :file-list="photoList"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="门店介绍:">
            <quill-editor
              class="ql-editor-class"
              v-model="formData.remark"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
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
    <!-- </div> -->
    <el-dialog
      title="地图"
      :visible.sync="dialogVisibleZ"
      :append-to-body="true"
      :close-on-click-modal="false"
      class="qqmap-dialog"
      :before-close="handleCloses"
    >
      <qqmap-Dialog></qqmap-Dialog>
      <el-button
        style="padding: 8px 30px;background-color: #3295fd;color: #fff;"
        @click="dialogVisibleZ = false"
      >保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { MDAddStore, MDEditStore } from "../../../../api/index";
//上传接口
import quillConfig from "../../../../components/quillConfig/quill-config";
import qqmapDialog from "./qqmapDialog";
import config from "../../../../Config";
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
      selectedIDs: "",
      // 编辑数据
      yglbDatas: {},
      // 标题 修改或新增
      yglbTitles: "",
      dialogVisibleZ: false, //业务过程弹框状态
      // dialogVisibleZ:false,
    
      
      Condition: [
        {
          storestate: 0,
          label: "可用"
        },
        {
          storestate: 1,
          label: "不可用"
        }
      ],
      storestate: "",
      photoList: [
        {
          name: "",
          url: ""
        }
      ],
      input: "",
      config,
      editorOption: quillConfig,
      imageUrl: "",
      formData: {
        storename: "", //
        storecontacts: "", //
        storemobile: "",
        stroeaddress: "",
        storeimage: "",
        remark: "",
        storedimension: "29.665874",
        storelongitude: "106.493881",
        storestate: ""
      },
      rules: {
        storename: [
          {
            required: true,
            message: "请输入门店名称",
            trigger: ["change", "blur"]
          }
        ],
        storecontacts: [
          { required: true, message: "请输入联系人", trigger: ["change"] }
        ],
        storemobile: [
          { required: true, message: "请输入联系电话", trigger: ["change"] }
        ],
        stroeaddress: [
          { required: true, message: "请输入门店地址", trigger: ["change"] }
        ],
        storeimage: [
          { required: true, message: "请上传图片", trigger: ["change"] }
        ],
        storestate: [
          { required: true, message: "请上选择状态", trigger: ["change"] }
        ],
        remark: [
          { required: true, message: "请输入门店介绍", trigger: ["change"] }
        ]
      },
      value: ""
    };
  },
  props: {
    dialogVisible: Boolean,
    yglbTitle: String,
    title: String,
    yglbData: Object,
    editType: String,
    fdid: String
  },
  components: { qqmapDialog },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.formData = {
          storename: "", //
          storecontacts: "", //
          storemobile: "",
          stroeaddress: "",
          storeimage: "",
          remark: "",
          storedimension: "29.665874",
          storelongitude: "106.493881",
          storestate: ""
          // description: "", //
          // dictid: "" //
        };
        if (JSON.stringify(this.yglbData) != "{}") {
          this.formData = {
            id: this.yglbData.id,
            storename: this.yglbData.storename, //
            storecontacts: this.yglbData.storecontacts, //
            storemobile: this.yglbData.storemobile,
            stroeaddress: this.yglbData.stroeaddress,
            storeimage: this.yglbData.storeimage,
            remark: this.yglbData.remark,
            storedimension: this.yglbData.storedimension,
            storelongitude: this.yglbData.storelongitude,
            parentid: this.yglbData.parentid,
            storestate: this.yglbData.storestate
          };
          console.log("this.yglbData", this.yglbData);
          console.log("90909", this.config.baseUrl + this.yglbData.storeimage);
          this.imageUrl = this.config.baseUrl + this.yglbData.storeimage;
        }
      }
    }
  },
  methods: {
    handleCloses(done) {
      // this.$emit("dialogCloses");
      this.dialogVisibleZ = false;
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
    // 查询赋值
    getZTableData() {},
    //地图

    //打开定位
    MapClick(val) {
      this.dialogVisibleZ = true;
      //  this.yglbTitles=val;
    },
    //新增门店
    handleAvatarSuccess(res, file) {
      console.log("res", res);
      console.log("file", file);
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res && res.code) {
        this.formData.storeimage = res.data;
      } else {
        this.$message.error("上传图片失败");
      }
      console.log("this.imageUrl", this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(formData) {
      if (this.editType == "add") {
        if (this.fdid != "") {
          // 分店级新增
          let params = {
            parentid: this.fdid,
            //  id: this.formData.id,
            storename: this.formData.storename, //
            storecontacts: this.formData.storecontacts, //
            storemobile: this.formData.storemobile,
            stroeaddress: this.formData.stroeaddress,
            storeimage: this.formData.storeimage,
            remark: this.formData.remark,
            storedimension: this.formData.storedimension,
            storelongitude: this.formData.storelongitude,
            // parentid: this.yglbData.parentid,
            storestate: this.formData.storestate
            // ...this.formData
          };
          console.log("params fdid", params);
          MDAddStore(params).then(res => {
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
        } else {
          // 总店
          let params = {
            ...this.formData
          };
          console.log("params 0", params);
          MDAddStore(params).then(res => {
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
          // }
        }
      }
      if (this.editType == "edit") {
        let paramss = {
          ...this.formData
        };
        console.log("parsmss", paramss);
        MDEditStore(paramss).then(res => {
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
        // }
        // }
      }
    },
    //   关闭
    dialogClose() {
      this.$emit("dialogClose");
    }
    // handleCloses(){
    //   this.$emit("dialogCloses");
    // }
  }
};
</script>
<style  lang="scss">
.xzmdgl-dialog {
  .el-dialog {
    // margin: calc((50% - 350px - 20px) / 2) auto !important;
    // margin: calc((50% - 500px - 10px) / 2) auto !important;
    // margin: calc((50% - 540px - 20px) / 2) auto !important;
    // height: 720px;
    width: 700px;
    overflow: auto;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.ql-editor {
  height: 100px;
}
.ql-editor-class {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1;
  height: 100%;
  outline: none;
  padding: 0 !important;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  word-wrap: break-word;
}
.qqmap-dialog {
  height: 720px;
  // width: 700px;
  overflow: auto;
}
</style>