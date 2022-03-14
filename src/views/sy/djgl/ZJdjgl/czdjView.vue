<template>
  <div class="container">
    <div class="djglPanelClass">
      <!-- 搜索 菜单部分 -->
      <div class="mxmxsj-top">
        <el-row :gutter="20" class="top">
          <el-col :span="8">
            <el-button-group>
              <el-button type="primary">今天</el-button>
              <el-button type="primary">近7天</el-button>
              <el-button type="primary">本月</el-button>
              <el-button type="primary">近30天</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="4">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <!-- :gutter="1" -->
        <el-row class="top">
          <el-col :span="24">
            <el-select v-model="value" placeholder="单据号" style=" width:120px;margin-right: 15px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-model="input" placeholder="请输入内容" style=" width:120px;margin-right: 15px;"></el-input>
            <el-input v-model="input" placeholder="请输入内容" style=" width:120px;margin-right: 15px;"></el-input>
            <el-input v-model="input" placeholder="实付金额" style=" width:120px;margin-right: 15px;"></el-input>
            <el-input v-model="input" placeholder="实付金额" style=" width:120px;margin-right: 15px;"></el-input>
            <el-input v-model="input" placeholder="实付金额" style=" width:120px;margin-right: 15px;"></el-input>
            
            <el-select v-model="value" placeholder="选择门店" style=" width:150px;margin-right: 15px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              v-model="value"
              placeholder="选择操作人员"
              style=" width:150px;margin-right: 15px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-model="input" placeholder="备注" style=" width:100px;margin-right: 15px;"></el-input>
            <el-checkbox v-model="checked" style=" width:100px;margin-right: 15px;">备选项</el-checkbox>
            <el-button type="primary">重置</el-button>
            <el-button type="success">查询</el-button>
          </el-col>
        </el-row>
      </div>

      <!-- 消费单据 -->
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
</template>
<script>
import tableContainer from "../../../../components/common/tableView";
import pageCommon from "../../../../components/common/pageCommon"
export default {
  name: "xfdjView",
  data() {
    return {
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      input: "",
      checked: true,
      value1: "",
      loading: false,
      currentPage: 1, //当前页
      pageSize: 5,
      total: 0,
      showBgl: false
    };
  },
  components: {
    tableContainer,
    pageCommon
  },
  methods: {
    //翻页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.initData();
    }
  }
};
</script>
<style scoped lang="scss">
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
.mxmxsj-top {
  height: 100px;
  // line-height: 150px;
  // border: 1px solid #fff;
  // float: right;
  padding: 10px;
  .top {
    padding-bottom: 10px;
  }
}

.mxmxsj-content {
  position: absolute;
  top: 130px;
  left: 10px;
  right: 10px;
  bottom: 50px;
}
</style>
<style>
.container .djglPanelClass {
  /* height: 640px; */
  height: 800px;
  color: #fff;
  width: 100%;
  text-align: left;
  background-color: rgba(37, 50, 56, 0.6);
}
</style>
