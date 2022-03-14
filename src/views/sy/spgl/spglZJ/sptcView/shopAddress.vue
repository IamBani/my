<template>
  <el-dialog
    :visible="visible"
    @close="close"
    :fullscreen="true"
    :close-on-click-modal="false"
    class="dialog"
    :destroy-on-close="true"
  >
    <el-row :gutter="15">
      <el-col :span="3">
        <el-upload
          action="#"
          accept="image/jpeg,image/gif,image/png"
          :limit="limit"
          class="avatar-uploader"
          :show-file-list="true"
          list-type="picture-card"
          :auto-upload="false"
          :on-remove="remove"
          :on-change="change"
          :on-preview="handlePictureCardPreview"
          :class="{ hide: hideUploadEdit }"
        >
          <div class="upload-content">
            <i class="el-icon-plus"></i>
            <div>点击上传图片</div>
          </div>
        </el-upload>
      </el-col>
      <el-col :span="6">
        <el-form
          :inline="false"
          label-width="100px"
          ref="formInline"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item
            prop="numbering"
            :rules="[
              { required: true, message: '请输入套餐编号', trigger: 'blur' },
            ]"
            label="套餐编号"
          >
            <el-input
              size=""
              v-model="formInline.numbering"
              placeholder="请输套餐编号"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="name"
            :rules="[
              { required: true, message: '请输入套餐名称', trigger: 'blur' },
            ]"
            label="套餐名称"
          >
            <el-input
              v-model="formInline.name"
              placeholder="请输套餐名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="number"
            :rules="[
              { required: true, message: '请输入套餐数量', trigger: 'blur' },
            ]"
            label="套餐数量"
          >
            <el-input
              v-model="formInline.number"
              placeholder="请输套餐数量"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="amount"
            :rules="[
              { required: true, message: '请输入套餐金额', trigger: 'blur' },
            ]"
            label="套餐金额"
          >
            <el-input
              v-model="formInline.amount"
              placeholder="请输套餐金额"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="discount"
            :rules="[
              { required: true, message: '请输入最低折扣', trigger: 'blur' },
            ]"
            label="最低折扣"
          >
            <el-input
              v-model="formInline.discount"
              placeholder="请输最低折扣"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="integral"
            :rules="[
              { required: true, message: '请输入积分方式', trigger: 'blur' },
            ]"
            label="积分方式"
          >
            <el-input
              v-model="formInline.integral"
              placeholder="请输积分方式"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="remark"
            :rules="[{ required: false, message: '备注', trigger: 'blur' }]"
            label="备注"
          >
            <el-input
              type="textarea"
              maxlength="30"
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 6 }"
              v-model="formInline.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="15">
        <el-button
          icon="el-icon-plus"
          size="mini"
          @click="visiblepackage = true"
          >添加套餐商品</el-button
        >
        <el-table :data="tableData" border style="width: 100%" class="table">
          <el-table-column
            prop="commoditycode"
            label="商品编号"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="commodityname"
            label="商品名称"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="inventory" label="数量" align="center">
          </el-table-column>
          <el-table-column prop="wholesaleprice" label="售价" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <img width="100%" :src="imageUrl" alt="" />
    </el-dialog>

    <packageShop @sure="showOrderShop" :key="key" v-model="visiblepackage"></packageShop>
    <div style="text-align: center">
      <el-button type="primary" @click="sava">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fileupload } from '@/api'
import packageShop from './packageShop.vue'
const set = new Set()
export default {
  name: '',
  components: {
    packageShop,
  },
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
      limit: 1,
      imageUrl: '',
      dialogVisible: false,
      filelist: [],
      hideUploadEdit: false,
      formInline: {
        numbering: '',
        name: '',
        number: 0,
        amount: 0,
        discount: 0,
        integral: '',
        remark: '',
      },
      tableData: [],
      visiblepackage: false,
      key:0,
    }
  },
  watch:{
    visiblepackage(newValue){
      if(!newValue){
        this.key++
      }
    }
  },
  methods: {
    close() {
      this.$emit('change', false)
    },
    remove(file, fileList) {
      this.filelist = fileList
      this.hideUploadEdit = fileList.length >= this.limit
    },
    change(file, fileList) {
      const isJPG =
        file.raw.type === 'image/jpg' ||
        file.raw.type === 'image/jpeg' ||
        file.raw.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能为jpg或png格式')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过2MB')
      }
      if (isJPG && isLt2M) {
        this.filelist = fileList
        this.hideUploadEdit = fileList.length >= this.limit
      } else {
        fileList.splice(-1, 1)
      }
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url
      this.dialogVisible = true
    },
    handleEdit() {},
    handleDelete() {},
    showOrderShop(val) {
      if(set.size===0){
        val.forEach(ele=>{
          set.add(ele.id)
        })
        this.tableData = val
      }else{
        let arr = []
        val.forEach(ele=>{
          if(!set.has(ele.id)){
            arr.push(ele)
          }
        })
        this.tableData =[...this.tableData,...arr]
      }
      this.visiblepackage = false
    },
    async sava() {
      console.log(this.filelist)
      if (this.filelist.length <= 0) {
        this.$message({
          message: '请先上传图片',
          type: 'warning',
        })
        return
      }
     const valid =  await this.$refs.formInline.validate()
     console.log(valid)
     if(!valid){
         this.$message({
          message: '请完善表单',
          type: 'warning',
        })
        return
     }
      if (this.tableData.length <= 0) {
        this.$message({
          message: '请先添加套餐商品',
          type: 'warning',
        })
        return
      }
      try {
        const { data } = await fileupload(this.filelist[0].raw)
        console.log(data)
        console.log(this.formInline)
        console.log(this.tableData)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  position: absolute;
  text-align: left;
  .avatar-uploader {
    ::v-deep .el-upload--picture-card {
      line-height: normal;
    }

    .upload-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .table {
    margin-top: 10px;
  }
  .hide {
    ::v-deep .el-upload--picture-card {
      display: none;
    }
  }
}
</style>
