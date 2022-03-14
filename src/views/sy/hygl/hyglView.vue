<template>
  <div class="container">
    <!-- 会员列表 -->
    <div class="hyglPanelClass">
      <div class="hygl-padding">
        <div class="hygl-top">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">1</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">2</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">3</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">4</div>
            </el-col>
          </el-row>
        </div>
        <!-- 搜素 -->
        <div class="hygl-top-conten">
          <el-row :gutter="20">
            <el-col :span="6">
              <div>
                <el-input placeholder="请输入内容" v-model="input2">
                  <el-button slot="append" type="success" @click="getTableData">查询</el-button>
                </el-input>
              </div>
            </el-col>
            <el-col :span="14">
              <!-- <el-button>更多筛选</el-button> -->
              <el-button @click="xzhyClick('新增会员')">新增会员</el-button>
              <el-button>批量导入</el-button>
              <el-button>会员导出</el-button>
              <!-- <el-button @click="xzhyClicks('新增会员')">发送优惠劵</el-button> -->
              <!-- <el-button @click="xzhyClicks('新增会员')">会员标签</el-button> -->
              <!-- <el-button>删除会员</el-button> -->
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
                    @click="xzhyClick('编辑会员',scope.row)"
                  >编辑</label>
                  <label class="table-btn" @click="hyglDelete(scope.row.id)">删除</label>
                  <!-- <label class="table-btn" @click="tableM(scope.row)"></label> -->
                  <!-- <label class="table-btn" @click="ywgcClick(scope.row)">编辑</label>
                  <label class="table-btn" @click="ywgcDelete(scope.row)">删除</label>-->
                </template>
              </el-table-column>
            </table-container>
          </div>
          <page-common :pageSize="pageSize" :total="total" @currentChange="handleCurrentChange"></page-common>
        </div>
      </div>
    </div>
    <!-- 新增会员 -->
    <xzhy-Dialog
      :title="yglbTitle"
      :mild="selectedID"
      :yglbData="yglbData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible = false"
      @refresh="getTableData"
      :editType="editType"
      :membercard="membercard"
    ></xzhy-Dialog>
    <!-- 发送优惠劵 -->
    <!-- <xzhy-Dialog
      :title="yglbTitle"
      :mild="selectedID"
      :yglbData="yglbData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible = false"
      @refresh="getTableData"
      :editType="editType"
    ></xzhy-Dialog> -->

    <!-- 新增会员标签 -->
    <!-- <xzhy-Dialog
      :title="yglbTitle"
      :mild="selectedID"
      :yglbData="yglbData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible = false"
      @refresh="getTableData"
      :editType="editType"
    ></xzhy-Dialog> -->
  </div>
</template>
<script>
import tableContainer from "../../../components/common/tableView";
import pageCommon from "../../../components/common/pageCommon";
// import xzyhglbDialog from '../yggl/ZJyglb/xzyglbDialog'
import xzhyDialog from "./ZJhygl/xzhyDialog";
import {HYqueryByPage,HYdeleteById, GetCode} from "../../../api/index";
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
      dialogVisible: false, //业务过程弹框状态
      editType: "", //add新增，编辑
      input: "",
      input2: "",
      input: "",
      membercard:'',
      tableTitle: [
        { name: "会员姓名", key: "membername" },
        {
          name: "会员手机号",
          key: "membermobile"
        },
        {
          name: "会员等级",
          key: "memberlevel"
        },
        {
          name: "会员卡号",
          key: "membercard"
        },
        {
          name: "创建时间",
          key: "createtime"
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
      pageSize: 10,
      total: 0
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
    xzhyDialog
  },
  created() {
    this.getTableData();
  },
  mounted() {},
  methods: {
    //查询 搜索 列表
    getTableData() {
      let params = {
        pageno: this.currentPage, //当前页
        pagesize: this.pageSize,
      };
      HYqueryByPage(params).then(res => {
        if (res && res.code) {
          if (res.data != null) {
            this.tableData = res.data;
            this.total = res.count;
          }
        }
      });
    },
    xzhyClick(val, data) {
      console.log('data',data)
      this.dialogVisible = true;
      this.yglbTitle = val;
      if (data) {
        this.editType = "edit";
        this.yglbData = data;
        console.log('this.yglbData1111',this.yglbData)
      } else {
        this.editType = "add";
        this.yglbData = {};
      }
    },
// 删除
      hyglDelete(data) {
      this.$confirm("确定删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: data
          };
          HYdeleteById(params).then(res => {
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
  padding-left: 10px;
  padding-right: 10px;
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
  top: 200px;
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