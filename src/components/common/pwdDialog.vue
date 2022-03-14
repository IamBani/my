<template>
  <div>
    <!-- <div> -->
    <el-dialog
      :title="title"
      :visible="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      custom-class="common-dialog "
      class="pwd-dialog"
      :before-close="dialogClose"
    >
      <el-form
        size="small"
        :model="formData"
        ref="formData"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        style="width: 280px;text-align: center;"
      >
        <el-form-item label="新密码" prop="password">
          <el-input
            v-model="formData.password"
            :show-password="true"
            type="password"
            　class="Channel_account"
          ></el-input>
        </el-form-item>
        <el-form-item label="请确认密码" prop="aginpassword">
          <el-input
            v-model="formData.aginpassword"
            :show-password="true"
            type="password"
            autocomplete="off"
            class="Channel_account"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formData')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- </div> -->
  </div>
</template>
<script>
// import { MDAddStore, MDEditStore } from "../../../../api/index";
import { XZyhEditUser } from "../../api/index";
import md5 from "js-md5";
//上传接口

export default {
  name: "",
  data() {
    // 验证
   var validatePass = (rule, value, callback) => {
					if (!value) {
						callback(new Error('请输入新密码'));
					} else if (value.toString().length < 3 || value.toString().length > 12) {
						callback(new Error('密码长度为3 - 12个字符'))
					} else {
						callback();
					}
				};
				 var validatePass2 = (rule, value, callback) => {
           console.log('08987',value)
           console.log(' this.formData.password', this.formData.password)
	                if (value === '') {
                  callback(new Error('请再次输入密码'));
	                } else if (value !== this.formData.password) {
                    
	                callback(new Error('两次输入密码不一致!'));
	                } else {
	                callback();
	                }
	            };

    // 重复密码验证

    return {
      selectedIDs: "",
      // 编辑数据
      yglbDatas: {},
      // 标题 修改或新增
      yglbTitles: "",
      dialogVisibleZ: false, //业务过程弹框状态
      // dialogVisibleZ:false,
      input: "",
      formData: {
        password: "",
        aginpassword: ""
      },
      rules: {
        password: [
          {
            required: true,
           
            validator: validatePass,
            trigger: ["change", "blur"]
          }
        ],
        aginpassword: [
          {
            required: true,
            
            validator: validatePass2,
            trigger: ["change", "blur"]
          }
        ]
      },
      value: ""
    };
  },
  props: {
    dialogVisible: Boolean,
    yglbTitle: String,
    title: String,
    yglbData: String,
    editType: String
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.formData = {
          useraccount: "",
          password: ""
        };
        if (JSON.stringify(this.yglbData) != "{}") {
          console.log(this.yglbData);
          this.formData = {
            id: this.yglbData
          };
        }
      }
    }
  },
  methods: {
    submitForm(formData) {
       this.$refs.formData.validate((valid) => {
        if (valid) {
          
       
      let params = {
        id: this.formData.id,
        password: this.$md5(this.formData.password)
        // ...this.formData
      };
      console.log("params", params);
      XZyhEditUser(params).then(res => {
        if (res && res.code) {
          this.$message.success("保存成功");
          // 刷新列表
          // 关闭弹窗
          this.dialogClose();
          // this.$emit("refresh");
        } else {
          this.$message.error("保存失败");
        }
      });
       }
       })
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
.pwd-dialog {
  .el-dialog {
    // margin: calc((50% - 350px - 20px) / 2) auto !important;
    // margin: calc((50% - 500px - 10px) / 2) auto !important;
    margin: calc((50% - 350px - 20px) / 2) auto !important;
    // height: 300px;
    width: 350px;
    // overflow: auto;
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