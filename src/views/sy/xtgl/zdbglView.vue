<template>
  <div class="container">
    <!-- 会员列表 -->
    <div class="hyglPanelClass">
      <div class="hygl-padding">
        <!-- 搜素 -->
        <div class="hygl-top-conten">
          <el-row :gutter="20">
            <el-col :span="3">
              <el-input
                v-model="descriptions"
                placeholder="请输入字典名称"
                style=" width:200px;margin-right: 15px;"
              ></el-input>
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="dictids"
                placeholder="请输入字典编码"
                style=" width:200px;margin-right: 15px;"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <!-- <el-button>重置</el-button> -->
              <el-button @click="getFTableData">查询</el-button>
              <el-button @click="fzdbglClick('新增父级字典表')">新增父级字典表</el-button>
              <el-button v-show="Zshow" @click="zzdbglClick('新增子级字典表')">新增子级字典表</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 列表 -->
        <div class="zdbgl-content">
          <div class="zdbgl-left">
            <div class="zdbgl-table" ref="tableCont">
              <table-container
                v-loading="loading"
                :tableData="tableDataF"
                :tableTitle="tableTitle"
                :pageSize="pageSize"
                :currentPage="currentPage"
                :total="total"
                @handleClick="getZTableData"
              >
                <el-table-column width="350" label="操作">
                  <template slot-scope="scope">
                    <label
                      class="table-btn"
                      @click="fzdbglClick('编辑父级字典表',scope.row.dictid,scope.row)"
                    >编辑</label>
                    <label class="table-btn" @click="fzdbgDelete(scope.row.dictid)">删除</label>
                  </template>
                </el-table-column>
              </table-container>
            </div>
            <page-common :pageSize="pageSize" :total="total" @currentChange="handleCurrentChange"></page-common>
          </div>
          <div class="zdbgl-right">
            <div class="zdbgl-table" ref="tableCont">
              <table-container
                v-loading="loadings"
                :tableData="tableDataZ"
                :tableTitle="tableTitles"
                :pageSize="pageSizes"
                :currentPage="currentPages"
                :total="totals"
              >
                <el-table-column width="350" label="操作">
                  <template slot-scope="scope">
                    <label
                      class="table-btn"
                      style="width: 50px;display: inline-block;text-align: right"
                      @click="ZzzdbglClick('子表新增', scope.row.id)"
                    >新增</label>
                    <label class="table-btn" @click="zzdbglClick('子表编辑',scope.row.id,scope.row)">编辑</label>
                  
                    <label class="table-btn" @click="zzdbglDelete(scope.row.id,scope.row)">删除</label>
                  </template>
                </el-table-column>
              </table-container>
            </div>
            <!-- <zjpage-common
              :pageSizes="pageSizes"
              :totals="totals"
              @currentChanges="handleCurrentChanges"
            ></zjpage-common>-->
          </div>
        </div>
      </div>
    </div>
    <!-- 左父 -->
    <xzfzdbgl-Dialog
      :title="FzdbgTitle"
      :mild="selectedFID"
      :FzdbgData="FzdbgData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible = false"
      @refresh="getFTableData"
      :editType="editType"
    ></xzfzdbgl-Dialog>
    <!--  子新增  -->
    <xzzzdbgl-Dialog
      :title="ZzdbglTitle"
      :mild="selectedZID"
      :ZzdbgData="ZzdbgData"
      :dialogVisible="dialogVisibleZ"
      @refresh="getZTableData"
      @dialogClose="dialogVisibleZ = false"
      :editTypeZ="editTypeZ"
      :descriptionName="descriptionName"
      :dictvalue="dictvalue"
      :parentvalue="parentvalue"
      :dictid="dictid"
    ></xzzzdbgl-Dialog>
    <!-- 新增子子集字典表管理集新增 -->
    <xzzjzzdbgl-Dialog
      :title="ZjzdbglTitle"
      :mild="selectedZjID"
      :ZzdbgData="ZjzdbgData"
      :dialogVisible="dialogVisibleZj"
      @refresh="getZjTableData"
      @dialogClose="dialogVisibleZj = false"
      :editTypeZj="editTypeZj"
      :parentvalue="parentvalue"
      :tabelID="tabelID"
    ></xzzjzzdbgl-Dialog>
  </div>
</template>
<script>
import tableContainer from "../../../components/common/tableView";
import pageCommon from "../../../components/common/pageCommon";
// import zjpageCommon from "../../../components/common/zjpageCommon";
// import zjpageCommon from "../../../components/common/zjpageCommon";
import xzfzdbglDialog from "./xtglZJ/xzfzdbglDialog";
import xzzzdbglDialog from "./xtglZJ/xzzzdbglDialog";
import xzzjzzdbglDialog from "./xtglZJ/xzzjzzdbglDialog";
import {
  FqueryByPageDict,
  ZqueryByPageDict,
  FzdbdeleteById,
  ZzdbdeleteById,
  SelectqueryById,
  FcZqueryAllByDict
} from "../../../api/index";
export default {
  name: "hyglVliew",
  data() {
    return {
      //左侧父级id
      tabelID: "",
      currentChange: "1",
      //搜索
      descriptions: "", //字典名称
      dictids: "", //字典编码
      Zshow: false,
      //编辑 id
      selectedFID: "",
      selectedZID: "",
      selectedZjID: "",
      // 编辑数据
      FzdbgData: {},
      ZzdbgData: {},
      ZjzdbgData: {},
      // 标题 父修改或新增
      FzdbgTitle: "",
      // 标题 子修改或新增
      ZzdbglTitle: "",
      // 标题 子表子集
      ZjzdbglTitle: "",

      dialogVisible: false, //F弹框状态
      dialogVisibleZ: false, //Z弹框状态
      dialogVisibleZj: false, //zj弹框状态
      editType: "",
      editTypeZ: "",
      editTypeZj: "",

      //新增子组件
      dictvalue: "",
      description: "",
      parentvalue: "",
      shortdesc: "",
      dictid: "",
      descriptionName: "",
      //新增子集组件
      parentvalue: "",

      input: "",
      input2: "",
      tableTitle: [
        { name: "字典名称", key: "description" },
        { name: "字典值", key: "dictid" }
      ],
      tableDataF: [
        {
          id: 0,
          djh: "000100"
        },
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
          bz: "测试",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              czyName: "王小虎",
              dmName: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 21,
              date: "2016-05-01",
              czyName: "王小虎",
              dmName: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 2,
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
      pageSize: 10,
      total: 0,
      tableTitles: [
        { name: "字典名称", key: "description" },
        { name: "字典项值", key: "shortdesc" },
        { name: "父代码", key: "dictvalue" }
      ],
      tableDataZ: [], //表格数据
      loadings: false,
      currentPages: 1, //当前页
      pageSizes: 5,
      totals: 0
    };
  },
  components: {
    tableContainer,
    pageCommon,
    // zjpageCommon,
    xzfzdbglDialog,
    xzzzdbglDialog,
    xzzjzzdbglDialog
  },
  created() {
    this.getFTableData();
    // this.getSelectDatas();
  },
  mounted() {},
  methods: {
    //父列表查询
    getFTableData() {
      // this.loading=true;
      let params = {
        pageno: this.currentPage, //当前页
        pagesize: this.pageSize,
        description: this.descriptions,
        dictid: this.dictids
      };
      FqueryByPageDict(params).then(res => {
        if (res && res.code) {
          this.tableDataF = res.data;
          this.total = res.count;
        } else {
          this.$message.error("查询字典失败");
        }
      });
    },
    //子列表查询 显示子集先增 获取子集传参
    getZTableData(id, val) {
      this.tabelID = id;
      this.Zshow = true;
      // 子表名称
      if (val) {
        this.descriptionName = val.description;
        this.dictvalue = val.dictvalue;
        this.parentvalue = val.parentvalue;
        this.dictid = val.dictid;
      }
      let params = {
        pageno: this.currentPages, //当前页
        pagesize: this.pageSizes,
        dictid: id
      };

      FcZqueryAllByDict(params).then(res => {
        if (res && res.code) {
          this.tableDataZ = res.data;
          this.totals = res.count;
        } else {
          this.$message.error("查询字典失败");
        }
      });
    },
    //子集新增 修改 实时刷新
    getZjTableData(id) {
      let params = {
        pageno: this.currentPages, //当前页
        pagesize: this.pageSizes,
        dictid: id
      };
      FcZqueryAllByDict(params).then(res => {
        if (res && res.code) {
          this.tableDataZ = res.data;
          this.totals = res.count;
        } else {
          this.$message.error("查询字典失败");
        }
      });
    },
    // 父字典表管理 修改
    fzdbglClick(val, newid, data) {
      this.dialogVisible = true;
      this.FzdbgTitle = val;
      if (data) {
        this.selectedFID = newid;
        this.editType = "edit";
        this.FzdbgData = data;
      } else {
        this.editType = "add";
        this.FzdbgData = {};
      }
    },
    // 子字典表管理新增 修改 显示影藏
    zzdbglClick(val, newId, data) {
      this.dialogVisibleZ = true;
      this.ZzdbglTitle = val;
      if (data) {
        this.selectedZID = newId;

        this.editTypeZ = "edit";
        this.ZzdbgData = data;
      } else {
        this.editTypeZ = "add";
        this.ZzdbgData = {};
      }
    },
    //子表新增子集 新增 修改
    ZzzdbglClick(val, newID, data) {
      this.dialogVisibleZj = true;
      this.ZjzdbglTitle = val;
      if (data) {
        this.selectedZjID = newID;
        this.parentvalue = newID;
        this.editTypeZj = "edit";
        this.ZjzdbgData = data;
      } else {
        this.selectedZjID = newID;
        this.parentvalue = newID;
        this.editTypeZj = "add";
        this.ZjzdbgData = {};
      }
    },
    //删除父组件
    fzdbgDelete(val) {
      this.$confirm("确定删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: val
          };
          FzdbdeleteById(params).then(res => {
            if (res && res.code) {
              this.getFTableData();
              this.$message.success("删除成功");
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
    //删除子组件
    zzdbglDelete(val, data) {
      this.$confirm("确定删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: val
          };
          ZzdbdeleteById(params).then(res => {
            if (res && res.code) {
              this.getZTableData(this.tabelID);
              this.$message.success("删除成功");
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
      this.getFTableData();
    },
    handleCurrentChanges(page) {
      console.log("page", page);
      this.currentPages = page;
      this.getZTableData(this.tabelID);
    }
  }
};
</script>
<style scoped lang="scss">
.hygl-padding {
  padding: 10px;
}
.hygl-top {
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
}
.zdbgl-content {
  height: calc(100% - 40px);
}
.zdbgl-left {
  width: 48%;
  position: absolute;
  height: calc(100% - 140px);
}
.zdbgl-right {
  width: 48%;
  position: absolute;
  height: calc(100% - 140px);
  margin-left: 49%;
}
.table-btn {
  color: #3295fd;
  cursor: pointer;
  margin: 0 5px;
  // border: 1px solid #fff;
}
.table-btn:hover {
  text-decoration: underline;
  //  border: 1px solid #3295fd;
}
// .mxmxsj-table {
// // width: 49%;
//   height: calc(100% - 40px);
//   border: 1px solid #ffff;
//   .table-btn {
//     color: #3295fd;
//     cursor: pointer;
//     margin: 0 5px;
//   }
//   .table-btn:hover {
//     text-decoration: underline;
//   }
// }
// .mxmxsj-content {
//   position: absolute;
//   top: 100px;
//   left: 30px;
//   // right: 30px;
//   // bottom: 50px;
// }
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