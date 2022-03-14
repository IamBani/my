<template>
  <div
    ref="table"
    class="table-container"
    :style="tbclass=='relative'?'position:relative':(tbclass=='noPage'?'bottom:0':'')"
  >
    <!--  border
              default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"-->
    <el-table
      ref="multipleTable"
      :cell-style="cellStyle"
      v-loading="loading"
      :data="tableData"
      :max-height="maxHeight"
      @selection-change="handleSelectionChange"
      :stripe="true"
      row-key="id"
      border
      default-expand-all
      @cell-click="handle"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <template v-if="hasCheckbox">
        <!-- 修改 -->
        <el-table-column type="selection" width="55" ></el-table-column>
      </template>
      <el-table-column
        v-if="hasNum && pageSize"
        type="index"
        label="序号"
        :index="indexMethod"
        min-width="50"
      ></el-table-column>
      <template v-for="(item,index) in tableTitle">
        <!--switch按钮-->
        <template v-if="item.type && item.type==='switch'">
          <el-table-column
            :width="item.width?item.width:''"
            :show-overflow-tooltip="true"
            :prop="item.key"
            :label="item.name"
            :key="index"
          >
            <template slot-scope="scope">
              <el-switch
                :active-text="item.typeToName[scope.row[item.key]]"
                v-model="scope.row[item.key]"
              ></el-switch>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <template v-if="item.func">
            <el-table-column
              :width="item.width?item.width:''"
              :show-overflow-tooltip="true"
              :label="item.name"
              :key="index"
            >
              <template slot-scope="scope">
                <label
                  class="table-btn"
                  @click="itemClick(item.func,scope.row)"
                >{{item.contentText}}</label>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              :width="item.width?item.width:''"
              :show-overflow-tooltip="true"
              :prop="item.key"
              :label="item.name"
              :key="item.key"
            >
              <template slot-scope="scope">
                <label
                  v-if="item.type && item.type==='statusChange'"
                >{{item.typeToName[scope.row[item.key]]}}</label>
                <label v-else>{{scope.row[item.key]}}</label>
              </template>
            </el-table-column>
          </template>
        </template>
      </template>
      <!--操作列-->
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "tableContainer",
  data() {
    return {
      cellStyle: { "text-align": "center", "font-size": "12px" },
      multipleSelection: [],
      rgzhpzTbData: [],
      hasCheckbox: false,
      getName: "",
      maxHeight: "auto",
      stripe: false //是否为斑马纹
    };
  },
  watch: {
    checkbox(newVal) {

      if (newVal) {
        this.hasCheckbox = newVal;
      } else {
        this.hasCheckbox = false;
      }
    },
    tableData() {}
  },
  methods: {


    // 点击事件
    handle(row){
       this.$emit('handleClick',row.dictid,row)
    },
    //計算序号
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize;
    },
    //checkbox选择事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("getSelectedTab", val);
    },
    itemClick(func, rowData) {
      this.$emit(func, rowData);
    }
  },
  props: {
    pageSize: Number,
    currentPage: Number,
    tableTitle: Array,
    tableData: Array,
    hasNum: Boolean, //是否显示序号
    checkbox: Boolean,
    loading: Boolean,
    typeToName: Object, //数字转文字内容情况
    tbclass: String, //判断表格样式
  },
  mounted() {
    if (this.tbclass && this.tbclass === "noPage") {
      this.maxHeight = this.$refs.table.offsetHeight + "px";
    }
  }
};
</script>

<style scoped lang="scss">
.table-container {
  position: absolute;
  top: 0;
  bottom: 40px;
  left: 0;
  right: 0;
}

.tb-btn {
  padding: 0 10px;
  cursor: pointer;
}

.tb-btn:hover {
  text-decoration: underline;
  font-weight: bold;
}
</style>
<style lang="scss">
.table-container {
  /*height: calc(100% - 30px);*/
  overflow: auto;

  /******表格样式******/
  /*表格对齐*/
  .el-table th.gutter {
    display: table-cell !important;
  }
  .el-table thead {
    font-weight: normal;
  }

  .el-table th {
    padding: 6px 0;
    color: #333;
    background-color: #f2f2f2;
  }
  .ycclPanel-dealTable .el-table th {
    background-color: #ffffff;
    font-weight: normal;
  }
  .el-table td {
    padding: 6px 0;
    color: #333;
  }

  .el-table th,
  .el-table tr {
    text-align: center;
  }
}
</style>
