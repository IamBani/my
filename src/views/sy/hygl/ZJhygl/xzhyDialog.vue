<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="common-dialog "
    class="xzhy-dialog"
    :before-close="dialogClose"
  >
    <el-form
      size="small"
      :model="formData"
      ref="formData"
      :rules="rules"
      class="ywgc-ruleForm"
      label-width="100px"
    >
      <div class="ywgc-form">
        <el-form-item label="会员卡号:" prop="membercard">
          <el-input v-model="formData.membercard" placeholder="请输入会员卡号" disabled></el-input>
        </el-form-item>

        <el-form-item label="会员姓名:" prop="membername">
          <el-input v-model="formData.membername" placeholder="请输入会员姓名"></el-input>
        </el-form-item>
        <el-form-item label="会员手机号:" prop="membermobile">
          <el-input v-model="formData.membermobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="会员等级:" prop="memberlevel">
          <!-- <el-select v-model=" description" placeholder="请选择会员等级" @change="CZcheng"> -->
          <el-select v-model="description" placeholder="请选择会员等级" @change="CZcheng">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="会员头像:" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="`${config.baseUrl}/file/upload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <el-input v-model="formData.ywgcmc" placeholder="请输入标题"></el-input> -->
        </el-form-item>

        <!-- <el-form-item label="描述:">
          <el-input type="textarea" :rows="5" v-model="formData.ms" placeholder="请输入"></el-input>
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
import config from "../../../../Config";
import {
  FqueryByPageDict,
  FcZqueryAllByDict,
  GetCode,
  XZAddMember,
  bjEditMember,
  
} from "../../../../api/index";
export default {
  name: "",
  data() {
    return {
      formData: {
        // membercard: "",
        // membername: "",
        // membermobile: "",
        // description: "",
        // image: ""
      },
      currentPageList: 1, //当前页
      pageSizeLits: 20,
      description: "",
      imageUrl: "",
      config,

      options: [],
      rules: {
        membercard: [
          {
            required: true,
            message: "请输入会员卡号",
            trigger: ["change", "blur"]
          }
        ],
        membername: [
          { required: true, message: "请输入会员姓名", trigger: ["change"] }
        ],
        membermobile: [
          { required: true, message: "请输入手机号码", trigger: ["change"] }
        ],
        memberlevel: [
          { required: true, message: "请选择会员等级", trigger: ["change"] }
        ],
        image: [{ required: true, message: "会员头像", trigger: ["change"] }]
      },

      value: "",
      userNameList: ""
    };
  },
  created() {
    // this.getOperation();
    // this.getcodeData();
  },
  props: {
    dialogVisible: Boolean,
    ywlx: String,
    mlid: String,
    title: String,
    yglbData: Object,
    editType: String,
    membercard: String
  },
  watch: {
    dialogVisible(newVal) {
      this.getOperation();
      this.getcodeData();
      if (newVal) {
        this.formData = {
          id: "",
          membercard: "",
          membername: "",
          membermobile: "",
          memberlevel: "",
          image: ""
        };
        console.log("this.yglbData获取参数", this.yglbData);
        if (JSON.stringify(this.yglbData) != "{}") {
          console.log("this.yglbData=-=", this.yglbData);
          this.formData = {
            id: this.yglbData.id,
            membercard: this.yglbData.membercard,
            membername: this.yglbData.membername,
            membermobile: this.yglbData.membermobile,
            memberlevel: this.yglbData.memberlevel,
            image: this.yglbData.image
          };
          // console.log("this.yglbData", this.yglbData);
          // console.log("90909", this.config.baseUrl + this.yglbData.storeimage);
          this.imageUrl = this.config.baseUrl + this.yglbData.image;
          this.description = this.yglbData.memberlevel;
        }
      }
    }
  },
  mounted() {
    //  this.getOperation();
    //  this.getcodeData();
  },
  methods: {
    // GetCode
    // 生成会员卡
    getcodeData() {
      GetCode().then(res => {
        if (res && res.code) {
          this.formData.membercard = res.data;
        }
      });
    },
    // 根据字典表 dictid中的 操作
    getOperation() {
      this.formData.membercard = this.membercard;
      let params = {
        pageno: this.currentPageList, //当前页
        pagesize: this.pageSizeLits
      };
      FqueryByPageDict(params).then(res => {
        if (res && res.code) {
          let array = res.data;
          array.forEach(val => {
            if (val.dictid == "GradeOfMembership") {
              this.DictZJ(val.dictid);
            }
          });
        }
      });
    },
    //操作查询 设置
    DictZJ(val) {
      let params = {
        pageno: this.currentPageList, //当前页
        pagesize: this.pageSizeLits,
        dictid: val
      };
      FcZqueryAllByDict(params).then(res => {
        if (res && res.code) {
          this.options = res.data;
        }
      });
    },
    //操作  赋值
    CZcheng(val) {
      for (let i = 0; i <= this.options.length; i++) {
        if (val === this.options[i].id) {
          this.description=this.options[i].description;
          this.formData.memberlevel =  this.description;
        }
      }
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      console.log("res", res);
      console.log("file", file);
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res && res.code) {
        this.formData.image = res.data;
      } else {
        this.$message.error("上传图片失败");
      }
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
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (this.editType == "add") {
            let params = {
              membercard: this.formData.membercard,
              membername: this.formData.membername,
              membermobile: this.formData.membermobile,
              memberlevel: this.formData.memberlevel,
              image: this.formData.image
            };
            console.log("params", params);
            XZAddMember(params).then(res => {
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
            let params = {
              // description: this.formData.descriptions,
              // parentvalue: this.formData.parentvalue,
              // shortdesc: this.formData.descriptions,
              // id: this.parentvalue
              ...this.formData
            };
             console.log('params',params)
            bjEditMember(params).then(res => {
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
        }
      });
    },
    // 关闭
    dialogClose() {
      this.$emit("dialogClose");
    }
  },
  beforeUpdate() {
    //   this.getOperation();
    // this.getcodeData();
  }
};
</script>
<style  lang="scss">
.xzhy-dialog {
  .el-dialog {
    // margin: calc((50% - 350px - 20px) / 2) auto !important;
    // margin: calc((50% - 500px - 10px) / 2) auto !important;
    margin: calc((50% - 540px - 20px) / 2) auto !important;
    // height: 500px;
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