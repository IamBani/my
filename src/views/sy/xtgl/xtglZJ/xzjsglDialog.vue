<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="common-dialog "
    class="xzjsgl-dialog"
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
        <el-form-item label="角色名称:" prop="rolename">
          <el-input v-model="formData.rolename" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="角色菜单:" prop="menus">
          <!-- <el-input v-model="formData.menusort" placeholder="请输入角色菜单"></el-input> -->
          <el-tree
            class="tree-From"
            :data="data"
            show-checkbox
            node-key="id"
            @current-change="handleCheckChange"
            @check="handleCheckChange"
            :default-checked-keys="checkedRole"
            :props="defaultProps"
            ref="toop"
          ></el-tree>
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
import { AddRole, AddMenuQueryByPage,RoleEditRole } from "../../../../api/index";
export default {
  name: "",
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 5,
      // // 菜单 id数组
      checkedRole: [1],
      data: [],
      defaultProps: {
        children: "children",
        label: "menuname"
      },
      formData: {
        id: "",
        rolename: "",
        remark: "",
        menus: "" //
      },
      rules: {
        rolename: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: ["change", "blur"]
          }
        ]
        // menus: [{ required: true, message: "角色菜单", trigger: ["change"] }]
        //  menus: [{
        //   required: true,
        //   validator: this.validateTree,
        //   message: this.$t('placeholder.select'),
        //   trigger: 'change'
        // }]
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
          rolename: "",
          remark: "",
          menus: "" //
        };
        if (JSON.stringify(this.yglbData) != "{}") {
          console.log("this.yglbData", this.yglbData);
          // this.yglbData
          //   this.formData = JSON.parse(JSON.stringify(this.yglbData)); //深拷贝，避免影响表格
          this.formData = {
            rolename: this.yglbData.rolename,
            remark: this.yglbData.remark,
            menus: this.yglbData.menus, //
            id:this.yglbData.id
          };
          this.setTree(this.formData.menus)
        }
      }
    }
  },
  created() {
    this.getTreeData();
    //特殊
    // this.checked()
  },
  methods: {
    // 勾选的角色菜单
    handleCheckChange(rule, value) {
      console.log("一", rule);
      console.log("二", value.checkedKeys);
      const arr = value.checkedKeys.toString();
      const arrs = JSON.stringify(arr);
      this.formData.menus = JSON.parse(arrs);
      console.log("this.formData.menus", this.formData.menus);
    },
  //   checked(){
  //  this.setTree(this.formData.menus)  
  //   },
    //默认勾选 编辑
    setTree(row) {
      const arr=row.split(',')
        this.checkedRole= arr;
    },
    // 默认勾选的id
    validateTree(rule, value, callback) {
      if (arr.length === 0 || !arr) {
        callback(new Error(this.$t("placeholder.select")));
      } else {
        callback();
      }
    },
    departmentIdsChange() {},
    // Tree
    getTreeData() {
      let params = {
        pageno: this.currentPage, //当前页
        pagesize: this.pageSize
      };
      AddMenuQueryByPage(params).then(res => {
        if (res && res.code) {
          this.data = res.data;
        } else {
          this.$message.error("查询菜单失败");
        }
      });
    },
    submitForm(formData) {
      if (this.editType == "add") {
        let params = {
          // menuparentid: this.menuparentid,
          ...this.formData
        };
        console.log("params", params);
        AddRole(params).then(res => {
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
        console.log('1213',params)
        RoleEditRole(params).then(res => {
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
  },

  beforeMount() {
    // let params = {
    //   pageno: this.currentPage, //当前页
    //   pagesize: this.pageSize
    // };
    // AddMenuQueryByPage(params).then(res => {
    //   if (res && res.code) {
    //     this.data = res.data;
    //     // this.total = res.count;
    //   } else {
    //     this.$message.error("查询列表失败");
    //   }
    // });
  }
};
</script>
<style  lang="scss">
.xzjsgl-dialog {
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
    .tree-From {
      width: 80%;
      height: 200px;
      overflow: auto;
    }
  }
}
</style>