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
                  <el-button slot="append" type="success">查询</el-button>
                </el-input>
              </div>
            </el-col>
            <el-col :span="14">
              <!-- <el-button>高级搜索</el-button> -->
              <el-button @click="xzspClick('商品录入')">新增商品</el-button>
              <el-button @click="kcglClick('商品录入')">进货</el-button>
              <el-button>导入</el-button>
              <el-button>导出</el-button>
              <el-button>批量上架</el-button>
              <el-button>批量下架</el-button>
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
                  <label
                    class="table-btn"
                    style="width: 50px;display: inline-block;text-align: right"
                    @click="cancelFb(scope.row)"
                  >查看</label>
                  <label class="table-btn" @click="tableM(scope.row)"></label>
                  <label class="table-btn" @click="ywgcClick(scope.row)">编辑</label>
                  <label class="table-btn" @click="ywgcDelete(scope.row)">删除</label>
                </template>
              </el-table-column>
            </table-container>
          </div>
          <page-common :pageSize="pageSize" :total="total" @currentChange="handleCurrentChange"></page-common>
        </div>
      </div>
    </div>
    <!-- 新增商品 -->
    <xzsplr-Dialog
      :title="yglbTitle"
      :mild="selectedID"
      :yglbData="yglbData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogVisible = false"
    ></xzsplr-Dialog>
    <!-- 库存进货 -->
    <kcjh-Dialog
      :title="yglbTitles"
      :mild="selectedIDs"
      :yglbData="yglbDatas"
      :dialogVisible="dialogVisibleZ"
      @dialogClose="dialogVisibleZ = false"
    ></kcjh-Dialog>
  </div>
</template>
<script>
import tableContainer from "../../../../components/common/tableView";
import pageCommon from "../../../../components/common/pageCommon";
// import xzyhglbDialog from "../../yggl/ZJyglb/xzyglbDialog";
import xzsplrDialog from './xzsplrDialog'
import kcjhDialog from './kcjhDialog'


import { AddCommodity } from "../../../../api/index";
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

      selectedIDs: "",
      // 编辑数据
      yglbDatas: {},
      // 标题 修改或新增
      yglbTitles: "",
      dialogVisibleZ: false, //业务过程弹框状态

      editType: "", //add新增，编辑
      input2: "",
      input: "",
      tableTitle: [
        { name: "单据号", key: "djh" },
        {
          name: "消费时间",
          key: "date"
        },
        {
          name: "单据类型",
          key: "djlx"
        },
        {
          name: "会员卡号",
          key: "hykh"
        },
        {
          name: "会员姓名",
          key: "name"
        },
        {
          name: "消费金额",
          key: "xfje"
        },
        {
          name: "优惠金额",
          key: "yhje"
        },
        {
          name: "实收",
          key: "sh"
        },
        {
          name: "支付单号",
          key: "zfdh"
        },
        {
          name: "操作员",
          key: "czyName"
        },
        {
          name: "店名",
          key: "dmName"
        },
        {
          name: "备注",
          key: "bz"
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
    xzsplrDialog,
    kcjhDialog
  },
  mounted() {},
  methods: {
    xzspClick(val, data) {
      this.dialogVisible = true;
      this.yglbTitle = val;
      if (data) {
        this.yglbData = data;
      } else {
        this.yglbData = {};
      }
    },
     kcglClick(val, data) {
      this.dialogVisibleZ = true;
      this.yglbTitles = val;
      if (data) {
        this.yglbDatas = data;
      } else {
        this.yglbDatas = {};
      }
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
  top: 200px;
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