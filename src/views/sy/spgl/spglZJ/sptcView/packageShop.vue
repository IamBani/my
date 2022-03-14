<template>
  <el-dialog
    title="选择商品"
    :visible="visible"
    @close="close"
    width="70%"
    append-to-body
    :close-on-click-modal="false"
    class="package"
    :destroy-on-close="true"
    @open="getclassify"
  >
    <el-row class="row" :gutter="10">
      <el-col :span="6">
        <el-tree
          icon-class="el-icon-folder-add"
          :data="data"
          node-key="id"
          ref="vueTree"
          :highlight-current="true"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-col>
      <el-col :span="18">
        <el-form
          size="small"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="">
            <el-input
              prefix-icon="el-icon-search"
              placeholder="商品编号"
              size="small"
              v-model="formInline.commoditycode"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input
              prefix-icon="el-icon-search"
              placeholder="商品名称"
              v-model="formInline.commodityname"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="
                () => {
                  this.getOrder()
                }
              "
              >查询</el-button
            >
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          row-key="id"
          style="width: 100%"
          border
          size="mini"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            :reserve-selection="true"
            type="selection"
            width="45"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="commoditycode" label="商品编号" align="center">
          </el-table-column>
          <el-table-column
            prop="commodityname"
            show-overflow-tooltip
            align="center"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column prop="wholesaleprice" align="center" label="售价">
          </el-table-column>
          <el-table-column prop="commoditytype" align="center" label="商品类型">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          background
          layout="total, prev, pager, next"
          :total="total"
          class="pagination"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getOrderClassify, getOrderList } from '@/api'

export default {
  name: 'packageShop',
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      formInline: {
        commoditycode: '',
        commodityname: '',
      },
      data: [
        {
          shortdesc: '全部分类',
          id: 1,
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'shortdesc',
      },
      tableData: [],
      commodityclassdictid: '',
      multipleSelection: [],
    }
  },
  methods: {
    async getclassify(dictid = 3) {
      const { data } = await getOrderClassify({
        dictid,
      })
      this.data = [...this.data, ...data]
      this.$nextTick(() => {
        this.$refs.vueTree.setCurrentKey(this.data[0].id)
      })
      this.getOrder()
    },
    async getOrder(commodityclassdictid = this.commodityclassdictid) {
      const { commoditycode, commodityname } = this.formInline
      try {
        const { data, code, count } = await getOrderList({
          pageno: this.currentPage,
          pagesize: this.pageSize,
          commoditycode,
          commodityname,
          commodityclassdictid,
        })
        this.tableData = data
        if (count) {
          this.total = count
        }
      } catch (error) {
        console.log(error)
      }
    },
    close() {
      this.$emit('change', false)
    },
    sure() {
      this.$emit('sure',this.multipleSelection)
    },
    handleNodeClick(data) {
      if (data.id === 1) {
        this.commodityclassdictid = ''
      } else {
        this.commodityclassdictid = data.id
      }
      this.getOrder()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOrder()
    },
  },
}
</script>

<style lang="scss" scoped>
.package {
  .row {
    min-height: 500px;
    .pagination {
      margin-top: 10px;
      ::v-deep .el-pagination__total {
        color: #000;
      }
    }
  }
}
</style>
