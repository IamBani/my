<template>
  <div class="container">
    <!-- 会员列表 -->

    <div class="hyglPanelClass">
      <div class="hygl-padding">
        <!-- 搜素 -->
        <div class="hygl-top-conten">
          <el-row :gutter="20">
            <el-col :span="6">
              <div>
                <el-input placeholder="请输入内容" v-model="storename">
                  <el-button slot="append" type="success" @click="getTableData">查询</el-button>
                </el-input>
              </div>
            </el-col>
            <el-col :span="14">
              <el-button @click="mdxzglClick('添加门店')">添加门店</el-button>
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
              <el-table-column width="350" label="操作">
                <template slot-scope="scope">
                  <!-- <label
                    class="table-btn"
                    style="width: 50px;display: inline-block;text-align: right"
                    @click="cancelFb(scope.row)"
                  >查看</label>
                  <label class="table-btn" @click="tableM(scope.row)"></label>-->
                  <label class="table-btn" @click="xzfdglClick('新增分店',scope.row.id)">添加分店</label>
                  <label class="table-btn" @click="mdxzglClick('编辑门店',scope.row.id,scope.row)">编辑</label>
                  <!-- <label class="table-btn" @click="mdglDelete(scope.row)">删除</label> -->
                </template>
              </el-table-column>
            </table-container>
          </div>
          <page-common :pageSize="pageSize" :total="total" @currentChange="handleCurrentChange"></page-common>
        </div>
      </div>
    </div>
    <!-- 左父 -->
    <xzmdgl-Dialog
      :title="yglbTitle"
      :mild="selectedID"
      :yglbData="yglbData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible = false"
      @refresh="getTableData"
      :fdid="fdid"
      :editType="editType"
    ></xzmdgl-Dialog>
  </div>
</template>
<script>
import tableContainer from "../../../components/common/tableView";
import pageCommon from "../../../components/common/pageCommon";
import xzmdglDialog from "./xtglZJ/xzmdglDialog";
import {
  MDqueryByPage,
  MDGetStoreByPage,
  MDdeleteById
} from "../../../api/index";
export default {
  name: "hyglVliew",
  data() {
    return {
      //编辑 id
      storename: "",
      //编辑 id
      selectedID: "",
      // 编辑数据
      yglbData: {},
      // 标题 修改或新增
      yglbTitle: "",
      dialogVisible: false, //业务过程弹框状态
      editType: "", //add新增，编辑
      fdid: "",

      input: "",
      input2: "",
      input2: "",
      tableTitle: [
        { name: "门店名称", key: "storename" },
        {
          name: "联系人",
          key: "storecontacts"
        },
        {
          name: "门店地址",
          key: "stroeaddress"
        },
        {
          name: "门店状态",
          key: "storestate"
        },
        {
          name: "联系电话",
          key: "storemobile"
        },
        {
          name: "门店图片",
          key: "storeimage"
        },
        {
          name: "备注",
          key: "remark"
        }
      ],
      tableData: [], //表格数据
      loading: false,
      currentPage: 1, //当前页
      pageSize: 5,
      total: 0
    };
  },
  components: {
    tableContainer,
    pageCommon,
    xzmdglDialog
  },
  created() {
    this.getTableData();
  },
  mounted() {},
  methods: {
    //列表
    getTableData() {
      // MDqueryByPage
      let params = {
        pageno: this.currentPage, //当前页
        pagesize: this.pageSize,
        storename: this.storename
      };
      MDGetStoreByPage(params).then(res => {
        if (res && res.code) {
          if (res.data != null) {
            this.tableData = res.data;
            this.total = res.count;
          }
        } else {
          this.$message.error("查询菜单失败");
        }
      });
    },
    // 父字典表管理 修改
    mdxzglClick(val,newid, data) {
      this.dialogVisible = true;
      this.yglbTitle = val;
      if (data) {
         this.fdid = newid;
        this.editType = "edit";
        this.yglbData = data;
      } else {
        this.editType = "add";
        this.yglbData = {};
      }
    },
    //新增分店
    xzfdglClick(val, newId) {
      this.dialogVisible = true;
      this.yglbTitle = val;
      // if (data) {
      //   // this.fdid = newId;
      //   this.editType = "edit";
      //   this.yglbData = data;
      // } 
      // else {
        this.fdid = newId;
        this.editType = "add";
        this.yglbData = {};
      // }
    },
    mdglDelete(data) {
      this.$confirm("确定删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: data
          };
          MDdeleteById(params).then(res => {
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
  left: 30px;
  right: 30px;
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