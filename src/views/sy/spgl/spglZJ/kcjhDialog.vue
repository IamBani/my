<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="common-dialog "
    class="kcjh-dialog"
    :before-close="dialogClose"
  >
    <!-- <div class="hyglPanelClass"> -->
    <div class="hygl-padding">
      <!-- 搜素 -->
      <div class="hygl-top-conten">
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="7">
            <div>
              <el-input placeholder="请输入内容" v-model="input2" style="width:240px">
                <el-button slot="append" type="success">查询</el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="2">
            <el-button>选择商品</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 列表 -->
      <div class="mxmxsj-content">
        <div class="mxmxsj-table" ref="tableCont">
          <table-container
            v-loading="loading"
            :tableData="tableDatas"
            :tableTitle="tableTitles"
            :pageSize="pageSizes"
            :currentPage="currentPage"
            :total="totals"
          >
            <el-table-column width="180" label="操作">
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
        <page-common :pageSize="pageSizes" :total="totals" @currentChange="handleCurrentChanges"></page-common>
      </div>
    </div>
    <!-- </div> -->
  </el-dialog>
</template>
<script>
import { AddMenu, EditMenu } from "../../../../api/index";
// import tableContainer from "../../../../../components/common/tableView";
// import pageCommon from "../../../components/common/pageCommon";
import tableContainer from "../../../../components/common/tableView";
import pageCommon from "../../../../components/common/pageCommon";

export default {
  name: "",
  data() {
    return {
      //   editorOption: quillConfig,
      isShow: 1,
      input2: "",
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
      tableTitles: [
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
        }
      ],
      tableDatas: [
        {
          id: 0,
          date: "2016-05-02",
          name: "王小虎",
          djh: "000100",
          djlx: "A类型",
          hykh: "00001",
          xfje: "1000",
          yhje: "100",
          sh: "900"
        },
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          djh: "000100",
          djlx: "A类型",
          hykh: "00001",
          xfje: "1000",
          yhje: "100"
        },
        {
          id: 2,
          date: "2016-05-02",
          name: "王小虎",
          djh: "000100",
          djlx: "A类型",
          hykh: "00001"
        }
      ], //表格数据
      loading: false,
      currentPages: 1, //当前页
      pageSizes: 5,
      totals: 0
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
  watch: {},
  components: {
    tableContainer,
    pageCommon
  },
  methods: {
    //翻页
    handleCurrentChanges(page) {
      this.currentPages = page;
      this.initData();
    },
    TabClass(val) {
      this.isShow = val;
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    // submitForm(formData) {
    //   //   this.$refs[formData].validate(valid => {
    //   //     if (valid) {
    //   console.log("this.menuparentid", this.menuparentid);
    //   if (this.editType == "add") {
    //     let params = {
    //       menuparentid: this.menuparentid,
    //       ...this.formData
    //     };
    //     console.log("params", params);
    //     AddMenu(params).then(res => {
    //       if (res && res.code) {
    //         this.$message.success("保存成功");
    //         // 刷新列表
    //         // 关闭弹窗
    //         this.dialogClose();
    //         this.$emit("refresh");
    //       } else {
    //         this.$message.error("保存失败");
    //       }
    //     });
    //     //   });
    //     // }
    //   }
    //   if (this.editType == "edit") {
    //     let params = {
    //       //   menuparentid: this.menuparentid,
    //       ...this.formData
    //     };
    //     EditMenu(params).then(res => {
    //       console.log("binji", res);
    //       if (res && res.code) {
    //         this.$message.success("保存成功");
    //         // 刷新列表
    //         // 关闭弹窗
    //         this.dialogClose();
    //         this.$emit("refresh");
    //       } else {
    //         this.$message.error("保存失败");
    //       }
    //     });
    //   }
    // },

    //   关闭
    dialogClose() {
      this.$emit("dialogClose");
    }
  }
};
</script>
<style  lang="scss">
.kcjh-dialog {
  .el-dialog {
    // margin: calc((50% - 350px - 20px) / 2) auto !important;
    // margin: calc((50% - 500px - 10px) / 2) auto !important;
    // margin: calc((50% - 540px - 20px) / 2) auto !important;
    // height: 520px;
    height: 700px;
    width: 900px;
  }
  .button {
    width: 500px;
    height: 80px;
  }
  .botpo1 {
    float: left;
    width: 160px;
    height: 80px;
  }
  .botpo2 {
    float: right;
    width: 160px;
    height: 80px;
  }
  .ywgc-ruleForm {
    // padding: 10px 20px;
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
  }
  .hygl-padding {
    // padding: 10px;
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

    // padding: 20px 0px;
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
    top: 130px;
    left: 20px;
    right: 20px;
    bottom: 50px;
  }
  .el-pagination__jump {
    /* color: #fff; */
    color: #606266;
  }
}
</style>