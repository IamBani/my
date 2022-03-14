<template>
  <div class="container">
    <!-- 会员列表 -->
    <div class="hyglPanelClass">
      <div class="hygl-padding">
        <!-- 搜素 -->
        <div class="hygl-top-conten">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-button @click="cdglClick('新增菜单')">新增菜单</el-button>
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
                  <!-- @click="cancelFb(scope.row)" -->
                  <label
                    class="table-btn"
                    style="width: 50px;display: inline-block;text-align: right"
                    @click="scope.row['menuparentid']=='0'?ZcdglClick('新增子菜单',scope.row.id):''"
                  >
                    {{scope.row['menuparentid']=='0'?'新增':''}}
                    <!-- 新增 -->
                  </label>
                  <!-- <label class="table-btn" @click="tableM(scope.row)"></label> -->
                  <!-- @click="cdglClick('编辑菜单',scope.row)" -->
                  <label
                    class="table-btn"
                    @click="scope.row['menuparentid']=='0'? cdglClick('编辑父级菜单',scope.row):ZcdglClick('编辑子级菜单',scope.row.id,scope.row)"
                  >编辑</label>
                  <!-- @click="cdglDelete(scope.row)" -->
                  <label
                    class="table-btn"
                    @click="scope.row['menuparentid']=='0'? cdglDelete(scope.row.id):ZcdglDelete(scope.row.id)"
                  >删除</label>
                </template>
              </el-table-column>
            </table-container>
          </div>
          <page-common :pageSize="pageSize" :total="total" @currentChange="handleCurrentChange"></page-common>
        </div>
      </div>
    </div>
    <xzfjcd-Dialog
      :title="yglbTitle"
      :mild="selectedID"
      :yglbData="yglbData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible = false"
      @refresh="getTableData"
      :editType="editType"
      :menuparentid="menuparentid"
    ></xzfjcd-Dialog>
  </div>
</template>
<script>
import tableContainer from "../../../components/common/tableView";
import pageCommon from "../../../components/common/pageCommon";
// import xzyhglbDialog from "../yggl/ZJyglb/xzyglbDialog";
import xzfjcdDialog from "./xtglZJ/xzfjcdDialog";
import {
  loginForAdmin,
  AddMenuQueryByPage,
  MenuqueryById
} from "../../../api/index";
export default {
  name: "hyglVliew",
  data() {
    return {
      //编辑 id
      selectedID: "",
      // 编辑数据
      yglbData: {},
      // 标题 修改或新增
      yglbTitle: "",
      input: "",
      dialogVisible: false, //业务过程弹框状态
      editType: "", //add新增，编辑
      menuparentid: "", //判断子或父ID父默认0
      input2: "",
      tableTitle: [
      
        {
          name: "菜单名称",
          key: "menuname"
        },
          { name: "图标地址", key: "menuicon" },
        {
          name: "菜单排序",
          key: "menusort"
        },
        {
          name: "菜单类型",
          key: "menutype"
        }
      ],
      tableData: [
        {
          id: 0,
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
      pageSize: 5,
      total: 0
    };
  },
  components: {
    tableContainer,
    pageCommon,
    xzfjcdDialog
  },
  created() {
    this.postLoginList();
    this.getTableData();
  },
  mounted() {},
  methods: {
    // 登录接口
    postLoginList() {
      let params = {
        ismanageruser: 0,
        password: "123456",
        useraccount: "admin"
      };
      loginForAdmin(params).then(res => {
      
      });
    },
    // 菜单类表查询
    getTableData() {
      let params = {
        pageno: this.currentPage, //当前页
        pagesize: this.pageSize
      };
      AddMenuQueryByPage(params).then(res => {
        if (res && res.code) {
          this.tableData = res.data;
          this.total = res.count;
        } else {
          this.$message.error("查询菜单失败");
        }
      });
    },

    // 父新增编辑弹窗传参
    cdglClick(val, data) {
      
      this.dialogVisible = true;
      this.yglbTitle = val;
      if (data) {
        this.menuparentid = "0";
        this.editType = "edit";
        this.yglbData = data;
      } else {
        this.menuparentid = "0";
        this.editType = "add";
        this.yglbData = {};
      }
    },
    //子新增弹窗 编辑子菜单
    ZcdglClick(val, newid, data) {
      // 传参父级ID
      this.dialogVisible = true;
      this.yglbTitle = val;
      if (data) {
        this.menuparentid = newid;
        this.editType = "edit";
        this.yglbData = data;
      } else {
        this.menuparentid = newid;
        this.editType = "add";
        this.yglbData = {};
      }
    },
    // 删除父菜单管理
    cdglDelete(data) {
      this.$confirm("确定删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: data
          };
          MenuqueryById(params).then(res => {
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
    // 删除子菜单
    ZcdglDelete(data) {
      
     
      this.$confirm("确定删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: data
          };
          MenuqueryById(params).then(res => {
            if (res && res.code) {
              this.$message.success("删除成功");
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

    // 测试登录接口

    //翻页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getTableData();
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