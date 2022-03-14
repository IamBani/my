<template>
  <div class="container">
    <div class="hyglPanelClass">
      <div class="hygl-padding">
        <!-- 搜素 -->
        <div class="hygl-top-conten">
          <el-row :gutter="20">
            <el-col :span="3">
              <el-input v-model="username" placeholder="账号/姓名"></el-input>
            </el-col>
            <el-col :span="3">
              <el-select v-model="label" placeholder="请选择状态" style="width: 200px;">
                <el-option
                  style="width: 200px;"
                  v-for="item in Condition"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="storename"
                placeholder="请选择门店"
                style="width: 200px;"
                ref="selectOption"
              >
                <el-option :value="treeData" style="height:auto">
                  <!--    :ref="tree" -->
                  <el-tree
                    style="height:200px;overflow: auto"
                    :data="datalist"
                    default-expand-all
                    node-key="id"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                  ></el-tree>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select v-model="rolename" placeholder="请选择角色" style="width: 200px;">
                <el-option
                  style="width: 200px;"
                  v-for="item in options"
                  :key="item.id"
                  :label="item.rolename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>

            <el-col :span="4">
              <el-button type="success" @click="getTableData">查询</el-button>
              <el-button type="primary" @click="xzyhglClick('新增用户管理')">新增用户管理</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 列表 -->
        <div class="mxmxsj-content">
          <div class="mxmxsj-table" ref="tableCont">
            <table-container
              v-loading="loading"
              :tableData="tableData"
              :tableTitle="tableTitle"
              :pageSize="pageSize"
              :currentPage="currentPage"
              :total="total"
            >
            <el-table-column width="350" label="创建时间" prop="createtime">
                <template slot-scope="scope">
                  <label>{{scope.row.createtime|formatDate}}</label>
                </template>
              </el-table-column>
              <el-table-column width="350" label="操作">
                <template slot-scope="scope">
                  <label
                    class="table-btn"
                    style="width: 50px;display: inline-block;text-align: right"
                    @click="ckyhglClick('查看用户信息',scope.row)"
                  >查看</label>
                  <label class="table-btn" @click="csmmClick(scope.row.id)">初始密码</label>
                  <label class="table-btn" @click="xzyhglClick('编辑用户信息',scope.row)">编辑</label>
                  <label class="table-btn" @click="zjyhglDelete(scope.row.id)">删除</label>
                </template>
              </el-table-column>
            </table-container>
          </div>
          <page-common :pageSize="pageSize" :total="total" @currentChange="handleCurrentChange"></page-common>
        </div>
      </div>
    </div>
    <!-- 查看 新增  编辑 -->
    <xzyhgl-Dialog
      :title="yglbTitle"
      :mild="selectedID"
      :yglbData="yglbData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible = false"
      @refresh="getTableData"
      :editType="editType"
      :menuparentid="menuparentid"
    ></xzyhgl-Dialog>
  

    
  </div>
</template>
<script>
import tableContainer from "../../../../components/common/tableView";
import pageCommon from "../../../../components/common/pageCommon";
import xzyhglDialog from "./xzyhglDialog";


import {
  XZyhqueryByPage,
  MDGetStoreByPage,
  RolequeryByPage,
  yhdeleteById,
  yhInitialization
} from "../../../../api/index";
export default {
  name: "hyglVliew",
  data() {
    return {
      selectedID: "",
      // 编辑数据
      yglbData: {},
      // 标题 修改或新增
      yglbTitle: "",

      dialogVisible: false, //业务过程弹框状态
      editType: "", //add新增，编辑
      menuparentid: "", //判断子或父ID父默认0


   

      input: "",
      treeData: "",
      username: "",
      storename: "",
      rolename: "",
      // 门店id
      mdid: "",
      datalist: [],
      defaultProps: {
        children: "children",
        label: "storename",
        id: "id"
      },

      label: "",
      Condition: [
        {
          id: 0,
          label: "可用"
        },
        {
          id: 1,
          label: "不可用"
        }
      ],
      options: [],
      value: "",
      value1: "",
      input2: "",
      input: "",
      tableTitle: [
        { name: "姓名", key: "username" },
        {
          name: "账号",
          key: "useraccount"
        },
        {
          name: "所在门店名称",
          key: "storename"
        },
        {
          name: "手机号",
          key: "mobile"
        },
        // {
          
        //    name: "创建时间",
        //   key: "createtime"
        // },
        {
          name: "状态",
          key: "status"
        }
      ],
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          djh: "000100",
          djlx: "A类型",
          hykh: "00001",
          xfje: "1000",
          yhje: "100",
          sh: "900",
          zfdh: "01234567890",
          czyName: "张三",
          dmName: "VR竞技",
          bz: "测试"
        }
      ], //表格数据
      loading: false,
      currentPage: 1, //当前页
      pageSize: 5,
      total: 0,
      currentPageList: 1, //当前页
      pageSizeLits: 5
    };
  },
    filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + "";
    }
  },
  components: {
    tableContainer,
    pageCommon,
    xzyhglDialog,
  },
  mounted() {},
  created() {
    this.getTableData();
    // 门店
    this.getMdData();
    // 角色管理
    this.getJsData();
  },
  methods: {
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
            this.datalist = res.data;
            // this.total = res.count;
          }
        } else {
          this.$message.error("查询下拉失败");
        }
      });
    },
    //列表
    getTableData() {
      // MDqueryByPage
      let params = {
        pageno: this.currentPage, //当前页
        pagesize: this.pageSize,
        username: this.username,
        status: this.label,
        storeid: this.mdid,
        roleid: this.rolename
      };
      XZyhqueryByPage(params).then(res => {
        if (res && res.code) {
          if (res.data != null) {
            this.tableData = res.data;
            this.total = res.count;
          }
        } else {
          this.$message.error("查询列表失败");
        }
      });
    },
    handleNodeClick(data, node, nodeData) {
      console.log("data", data);
      this.treeData = data;
      this.storename = data.storename;
      this.mdid = data.id;
      this.$refs.selectOption.blur();
    },
    // 新增 编辑·
    xzyhglClick(val, data) {
      this.dialogVisible = true;
      this.yglbTitle = val;
      if (data) {
        this.editType = "edit";
        this.yglbData = data;
      } else {
        this.editType = "add";
        this.yglbData = {};
      }
    },
    // 查看 用户信息
    ckyhglClick(val, data) {
      this.dialogVisible = true;
      this.yglbTitle = val;
      this.editType = "check";
      this.yglbData = data;
    },
    // 初始化密码
    csmmClick(data){
      let params={
        id:data,
      }
       yhInitialization(params).then(res => {
          if (res && res.code) {
            this.$message.success("初始化成功");
            this.getTableData();
          } else {
            this.$message.error("初始化失败");
          }
        });

    },
    // csmmClick(val,newID){
    //   this.dialogVisibleZ = true;
    //   this.csmmTitle=val;
    //   this.userId=newID
    //   //修改密码
    //   this.editTypeZ="edit";

    // },
    // 删除
    zjyhglDelete(data) {
      console.log("data", data);
      this.$confirm("确定删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: data
          };
          yhdeleteById(params).then(res => {
            if (res && res.code) {
              this.getTableData();
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //翻页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.initData();
    }
  }
};
</script>
<style scoped lang="scss">
.hygl-padding {
  padding: 10px;
}
.hygl-top {
  //   padding: 10px;
  height: 100px;
  text-align: center;
  color: #fff;
}
.grid-content {
  border: 1px solid #fff;
  height: 100px;
}
.hygl-top-conten {
  height: 50px;

  padding: 20px 0px;
  // border: 1px solid #fff;
}
.mxmxsj-table {
  // width: 100%;
  // height: 300px;
  // border: 1px solid #fff;
  height: calc(100% - 40px);
  .table-btn {
    color: #3295fd;
    cursor: pointer;
    margin: 0 5px;
  }
  .table-btn:hover {
    text-decoration: underline;
  }
}
.mxmxsj-content {
  position: absolute;
  top: 100px;
  // left: 30px;
  // right: 30px;
  left: 10px;
  right: 10px;
  bottom: 50px;
}
</style>
<style >
.container .hyglPanelClass {
  height: 800px;
  color: #fff;
  width: 100%;
  text-align: left;
  background-color: rgba(37, 50, 56, 0.6);
}
</style>