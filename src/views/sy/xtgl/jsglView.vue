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
                v-model="rolename"
                placeholder="请输入角色名称"
                style=" width:200px;margin-right: 15px;"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <!-- <el-button>重置</el-button> -->
              <el-button @click="getTableData">查询</el-button>
              <el-button @click="xzjsClick('新增角色')">新增角色</el-button>
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
                  >查看</label>-->
                  <label class="table-btn" @click="xzjsClick('编辑角色',scope.row)">编辑</label>
                  <label class="table-btn" @click="jsglDelete(scope.row.id)">删除</label>
                </template>
              </el-table-column>
            </table-container>
          </div>
          <page-common :pageSize="pageSize" :total="total" @currentChange="handleCurrentChange"></page-common>
        </div>
      </div>
    </div>
    <!-- 新建角色 -->
    <xzjsgl-Dialog
      :title="yglbTitle"
      :mild="selectedID"
      :yglbData="yglbData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible = false"
      @refresh="getTableData"
      :editType="editType"
      :menuparentid="menuparentid"
    ></xzjsgl-Dialog>
  </div>
</template>
<script>
import tableContainer from "../../../components/common/tableView";
import pageCommon from "../../../components/common/pageCommon";
import xzjsglDialog from "../xtgl/xtglZJ/xzjsglDialog";
import { RolequeryByPage,RoledeleteById } from "../../../api/index";
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

      rolename: "", //搜索角色名称
      input2: "",

      input2: "",
      tableTitle: [
        { name: "角色名称", key: "rolename" },
        {
          name: "创建时间",
          key: "createtime"
        },
        {
          name: "备注",
          key: "remark"
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
          bz: "测试"
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
    xzjsglDialog
  },
  created() {
    this.getTableData();
  },
  mounted() {},
  methods: {
    getTableData() {
      // RolequeryByPage()
      let params = {
        pageno: this.currentPage, //当前页
        pagesize: this.pageSize,
        rolename: this.rolename
      };
      RolequeryByPage(params).then(res => {
        if (res && res.code) {
          this.tableData = res.data;
          this.total = res.count;
        } else {
          this.$message.error("查询菜单失败");
        }
      });
    },
    xzjsClick(val, data) {
      this.dialogVisible = true;
      this.yglbTitle = val;
      if (data) {
        // this.menuparentid = "0";
        this.editType = "edit";
        this.yglbData = data;
      } else {
        // this.menuparentid = "0";
        this.editType = "add";
        this.yglbData = {};
      }
    },
    // 删除
    jsglDelete(data){
       this.$confirm("确定删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: data
          };
          RoledeleteById(params).then(res => {
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
}
.table-btn {
  color: #3295fd;
  cursor: pointer;
  margin: 0 5px;
}
.table-btn:hover {
  text-decoration: underline;
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