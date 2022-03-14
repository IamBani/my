<template>
  <div class="pageContent-bottom">
    <el-pagination
      background
      :page-size="pageSize"
      :current-page.sync="currentPage"
      layout="total, prev,pager, next, jumper"
      :total="total"
      @current-change="currentChange"
      style="float: right; "
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "pageCommon",
  props: {
    pageSize: Number,
    total: Number,
    currentPage: {
      // type: Number,
       type: Array,
      default: 1
    }
    // currentPage:Array,
  },
  data() {
    return {
      loading: false,
      cellStyle: { "text-align": "center", "font-size": "12px" }
    };
  },
  methods: {
    //列表翻页
    currentChange(val) {
      this.$emit("currentChange", val);
    }
  }
};
</script>

<style lang="scss">
.pageContent-bottom {
  position: absolute;
  height: 40px;
  right: 10px;
  bottom: 0px;
  width: calc(100% - 10px);
  color: #fff;
}
.el-pagination__jump {
  color: #fff;
}
.el-pagination__total {
  color: #fff;
}
</style>
