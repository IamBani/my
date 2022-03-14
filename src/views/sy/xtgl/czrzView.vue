<template>
  <div class="container">
    <!-- 会员列表 -->

    <div class="hyglPanelClass">
      <div class="hygl-padding">
        <!-- 搜素 -->
        <div class="hygl-top-conten">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-date-picker
                style="width: 260px;"
                v-model="getTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd "
                value-format="yyyy-MM-dd "
              ></el-date-picker>
            </el-col>
            <el-col :span="3">
              <el-input v-model="username" placeholder="请输入操作员" style="width: 180px;"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="operationmodule" placeholder="操作模块" style="width: 180px;"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="ipdz" placeholder="IP地址" style="width: 180px;"></el-input>
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="storename"
                placeholder="请选择门店"
                style="width: 180px;"
                ref="selectOption"
              >
                <el-option :value="treeData" style="height:auto">
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
              <el-select v-model="description" placeholder="全部操作" style="width: 180px;" @change="CZcheng">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.description"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="success" @click="getTableData">查询</el-button>
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
              <el-table-column width="350" label="创建时间" prop="creattime">
                <template slot-scope="scope">
                  <label>{{scope.row.creattime|formatDate}}</label>
                </template>
              </el-table-column>
            </table-container>
          </div>
          <page-common :pageSize="pageSize" :total="total" @currentChange="handleCurrentChange"></page-common>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tableContainer from "../../../components/common/tableView";
import pageCommon from "../../../components/common/pageCommon";
import {
  CZqueryByPage,
  MDGetStoreByPage,
  FqueryByPageDict,
  FcZqueryAllByDict
} from "../../../api/index";
export default {
  name: "hyglVliew",
  data() {
    return {
      treeData: "",
      storename: "",
      datalist: [],
      defaultProps: {
        children: "children",
        label: "storename",
        id: "id"
      },
      label: "",
      mdid: "",
      operationmodule: "",
      ipdz: "",
      username: "",
      currentPageList: 1, //当前页
      pageSizeLits: 20,
      //
      operationtype: "",
      //

      options: [{
        id:'',
        description:'',
      }
      
      ],
      description:'',
      value: "",
      getTime: "",
      input2: "",
      input: "",
      tableTitle: [
        {
          name: "门店",
          key: "storename"
        },
        { name: "操作人员", key: "username" },
        {
          name: "操作模块",
          key: "operationmodule"
        },
        {
          // operationtype
          name: "操作类型",
          key: "operationtype"
        },

        {
          name: "ip地址",
          key: "ipdz"
        },

        // {
        //   name: "创建时间",
        //   key: "creattime"
        // },
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
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getTableData();
    this.getMdData();
    this.getOperation();
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
    pageCommon
  },
  mounted() {
    // 门店
    
  },
  methods: {
    // 根据字典表 dictid中的 操作
    getOperation() {
      let params = {
        pageno: this.currentPageList, //当前页
        pagesize: this.pageSizeLits
      };
      FqueryByPageDict(params).then(res => {
        if (res && res.code) {
          let array = res.data;
          array.forEach(val => {
            if (val.dictid == "operation") {
              this.DictZJ(val.dictid);
            }
          });
        }
      });
    },
    //操作查询 设置
    DictZJ(val) {
      let params = {
        pageno: this.currentPageList, //当前页
        pagesize: this.pageSizeLits,
        dictid:val
      };
      FcZqueryAllByDict(params).then(res => {
        if (res && res.code) {
          this.options=res.data;
        }
      });
    },
     //操作  赋值
    CZcheng(val) {
      for (let i = 0; i <= this.options.length; i++) {        
        if (val === this.options[i].id) {
          this.operationtype = this.options[i].description;
        }
      }

    },
    //门店列表 查询
    getMdData() {
      // MDqueryByPage
      let params = {
        pageno: this.currentPageList, //当前页
        pagesize: this.pageSizeLits
      };
      MDGetStoreByPage(params).then(res => {
        if (res && res.code) {
          if (res.data != null) {
            this.datalist = res.data;
            // this.total = res.count;
          }
        } else {
          this.$message.error("查询下拉失败");
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

    // 查询 操作日志
    getTableData() {
      console.log("this.label", this.label);
      console.log("this.label", this.label);
      let params = {
        pageno: this.currentPage, //当前页
        pagesize: this.pageSize,
        ostarttime: this.getTime[0],
        oendtime: this.getTime[1],
        operationmodule: this.operationmodule,
        ipdz: this.ipdz,
        storeid: this.mdid,
        username: this.username,
        operationtype: this.operationtype
      };
      console.log("params", params);
      CZqueryByPage(params).then(res => {
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