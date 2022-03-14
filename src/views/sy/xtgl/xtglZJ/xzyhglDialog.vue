<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="common-dialog "
    class="xyhgl-dialog"
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
        <el-form-item label="姓名:" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入姓名"
            :disabled="editType==='check' ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select
            v-model="formData.sex"
            placeholder="请选择性别"
            :disabled="editType==='check' ? true : false"
          >
            <el-option
              style="width: 200px;"
              v-for="item in sextion"
              :key="item.sex"
              :label="item.label"
              :value="item.sex"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号:" prop="mobile">
          <el-input
            v-model="formData.mobile"
            placeholder="请输入手机号"
            :disabled="editType==='check' ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input
            v-model="formData.address"
            placeholder="地址"
            :disabled="editType==='check' ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="useraccount">
          <el-input
            v-model="formData.useraccount"
            placeholder="请输入账号"
            :disabled="editType==='check' ? true : false"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码:" v-show="editType==='add'? true : false">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            :disabled="editType==='check' ? true : false"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="门店名称:" prop="storename">
          <el-select
            v-model="formData.storename"
            placeholder="请选择所在门店名称"
            ref="selectOption"
            :disabled="editType==='check' ? true : false"
          >
            <el-option :value="treeData" style="height:auto">
              <el-tree
                style="height:200px;overflow: auto"
                :data="data"
                :props="defaultProps"
                default-expand-all
                node-key="id"
                @node-click="handleNodeClick"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select
            v-model="formData.status"
            placeholder="请选择状态"
            :disabled="editType==='check' ? true : false"
          >
            <el-option
              style="width: 200px;"
              v-for="item in Condition"
              :key="item.status"
              :label="item.label"
              :value="item.status"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="后台用户:" prop="ismanageruser">
          <el-select
            v-model="formData.ismanageruser"
            placeholder="请选择是否后台用户"
            :disabled="editType==='check' ? true : false"
          >
            <el-option
              style="width: 200px;"
              v-for="item in Usertion"
              :key="item.ismanageruser"
              :label="item.label"
              :value="item.ismanageruser"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色:" prop="roleid">
          <el-select
            v-model="formData.roleid"
            placeholder="请选择角色"
            :disabled="editType==='check' ? true : false"
          >
            <el-option
              style="width: 200px;"
              v-for="item in options"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input
            type="textarea"
            :rows="5"
            v-model="formData.remark"
            placeholder="请输入"
            :disabled="editType==='check' ? true : false"
          ></el-input>
        </el-form-item>
      </div>
      <div class="ywgc-btn">
        <el-button
          v-show="editType==='check' ? false : true"
          style="padding: 8px 30px;background-color: #3295fd;color: #fff;"
          @click="submitForm('formData')"
        >保存</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import {
  XZyhAddUser,
  XZyhEditUser,
  MDGetStoreByPage,
  RolequeryByPage,
  yhdeleteById
} from "../../../../api/index";

export default {
  name: "",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "storename",
        id: "id"
      },
      treeData: "",
      username: "",
      storename: "",
      rolename: "",
      // 门店id
      mdid: "",
      data: [],
      Condition: [
        {
          status: 0,
          label: "可用"
        },
        {
          status: 1,
          label: "不可用"
        }
      ],
      Usertion: [
        {
          ismanageruser: 0,
          label: "是"
        },
        {
          ismanageruser: 1,
          label: "否"
        }
      ],
       sextion: [
        {
          sex: 0,
          label: "男"
        },
        {
          sex: 1,
          label: "女"
        },
          {
          sex: 2,
          label: "未知"
        }
        
      ],
      ismanageruser: "",
      status: "",
      label: "",
      options: [],
      MdList: [
      
      ],
      storename: "",
      value: "",
      formData: {
        username: "",
        mobile: "",
        useraccount: "",
        password: "",
        storename: "",
        status: "",
        storeid: "",
        ismanageruser:'',
        remark:'',
        roleid:'',
        sex:'',
        address:'',
      
      },
      rules: {
        username: [
          { required: true, message: "请输入姓名", trigger: ["change", "blur"] }
        ],
        sex: [{ required: true, message: "请输入性别", trigger: ["change"] }],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["change"]
          }
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: ["change"]
          }
        ],

        useraccount: [
          { required: true, message: "请输入账号", trigger: ["change"] }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: ["change"] }
        ],
        storename: [
          { required: true, message: "所在门店名称", trigger: ["change"] }
        ],
        status: [
          { required: true, message: "请选择状态", trigger: ["change"] }
        ],
        roleid: [
          { required: true, message: "请选择角色", trigger: ["change"] }
        ],
        remark: [
          {
            required: true,
            message: "请选择状态",
            trigger: ["change"]
          }
        ],
        ismanageruser: [
          { required: true, message: "是否后台用户", trigger: ["change"] }
        ]
      },
      value: "",
      currentPage: 1, //当前页

      currentPageList: 1, //当前页
      pageSizeLits: 5
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
          username: "",
          mobile: "",
          useraccount: "",
          password: "",
          storeid: "",
          status: "",
          roleid: "",
          remark: "",
          useraccount: "",
          address: "",
          sex: "",
          ismanageruser:'',
        };
        if (JSON.stringify(this.yglbData) != "{}") {
          console.log("this.yglbData", this.yglbData);
          //this.formData = JSON.parse(JSON.stringify(this.yglbData)); //深拷贝，避免影响表格
          this.formData = {
            id: this.yglbData.id,
            username: this.yglbData.username,
            mobile: this.yglbData.mobile,
            useraccount: this.yglbData.useraccount,
            password: this.yglbData.password,
            roleid: this.yglbData.roleid,
            status: this.yglbData.status,
            storeid: this.yglbData.storeid,
            storename: this.yglbData.storename,
            remark: this.yglbData.remark,
            address: this.yglbData.address,
            sex: this.yglbData.sex,
            ismanageruser: this.yglbData.ismanageruser
          };
        }
      }
    }
  },
  created() {
    // 门店
    this.getMdData();
    // 角色管理
    this.getJsData();
    // MDGetStoreByPage
  },
  methods: {
    //门店列表赋值
    handleNodeClick(data, node, nodeData) {
      console.log("data", data);
      this.treeData = data;
      this.formData.storename = data.storename;
      this.formData.storeid = data.id;
      this.$refs.selectOption.blur();
    },
    // 角色管理
    getJsData() {
      let params = {
        pageno: this.currentPageList, //当前页
        pagesize: this.pageSizeLits
      };
      RolequeryByPage(params).then(res => {
        if (res && res.code) {
          console.log("res", res);
          if (res.data != null) {
            this.options = res.data;
          }
        } else {
          this.$message.error("查询下拉失败");
        }
      });
    },
    //门店查询列表
    getMdData() {
      // MDqueryByPage
      let params = {
        pageno: this.currentPageList, //当前页
        pagesize: this.pageSizeLits
      };
      MDGetStoreByPage(params).then(res => {
        if (res && res.code) {
          console.log("res", res);
          if (res.data != null) {
            this.data = res.data;
           
          }
        } else {
          this.$message.error("查询下拉失败");
        }
      });
    },
    // 提交
    submitForm(formData) {
      if (this.editType == "add") {
        let params = {
          // address: this.formData.address,
          // ismanageruser: this.formData.ismanageruser,
          // mobile: this.formData.mobile,
          // password: this.$md5(this.formData.password),
          // remark: this.formData.remark,
          // roleid: this.formData.roleid,
          // sex: this.formData.sex,
          // status: this.formData.status,
          // storeid: this.formData.storeid,
          // username: this.formData.username,
          // useraccount: this.formData.useraccount,
          // storename: this.formData.storename
          ...this.formData
        };
        console.log("params", params);
        XZyhAddUser(params).then(res => {
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
        debugger
        let params = {
          ...this.formData
        };
        console.log("编辑", params);
        XZyhEditUser(params).then(res => {
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
.xyhgl-dialog {
  .el-dialog {
    // margin: calc((50% - 350px - 20px) / 2) auto !important;
    // margin: calc((50% - 500px - 10px) / 2) auto !important;
    margin: calc((50% - 540px - 20px) / 2) auto !important;
    // height: 480px;
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