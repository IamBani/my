<template>
  <div class="container">
    <div class="ywgcPanelClass">
      <div class="ysgl-top">
        <!-- 通用头部 -->
        <div class="left-border">
          <div class="top">
            <div class="top-left">
              <el-divider direction="vertical"></el-divider>
              <span>基础统计</span>
            </div>
            <div class="top-right">
              <el-button-group style="background-color: rgba(37,50,56,0.6);">
                <el-button type="primary" class="color-botton">今天</el-button>
                <el-button type="primary" class="color-botton">近7天</el-button>
                <el-button type="primary" class="color-botton">近30天</el-button>
              </el-button-group>
            </div>
          </div>
          <!--  -->
          <div class="conten-top">
            <div class="conten-con">
              <div class="flot-right">
                <p>
                  <span class="text">56</span>
                </p>
                <p>
                  <span class="text">新增会员数量</span>
                </p>
              </div>
            </div>
            <div class="conten-con">
              <div class="flot-right">
                <p>
                  <span class="text">￥15600</span>
                </p>
                <p>
                  <span class="text">散客消费金额</span>
                </p>
              </div>
            </div>
            <div class="conten-con">
              <div class="flot-right">
                <p>
                  <span class="text">￥15600</span>
                </p>
                <p>
                  <span class="text">会员消费金额</span>
                </p>
              </div>
            </div>
            <div class="conten-con">
              <div class="flot-right">
                <p>
                  <span class="text">￥15600</span>
                </p>
                <p>
                  <span class="text">会员充值金额</span>
                </p>
              </div>
            </div>
            <div class="conten-con1">
              <div class="flot-right">
                <p>
                  <span class="text">￥1560000</span>
                </p>
                <p>
                  <span class="text">综合收入</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 模块 -->
      <div class="ysgl-conten">
        <div class="conten-left">
          <div class="left-border">
            <div class="top">
              <div class="top-left">
                <el-divider direction="vertical"></el-divider>
                <span>一周统计</span>
              </div>
            </div>
            <div class="ysgl-contClor">
              <!-- 柱状图 一周 -->
              <div id="YZCharts" class="top-echarts"></div>
            </div>
          </div>
        </div>
        <div class="conten-right">
          <!-- <div class="conten-bottom1">
            <div class="left-border">
              <div class="top">
                <div class="top-left">
                  <el-divider direction="vertical"></el-divider>
                  <span>系统公告</span>
                </div>
                <div class="top-right1">更多>></div>
              </div>
            </div>

            <div>
              <template >
                <table  class="table">
                  <tr>
                    <td>022.02.16更新说明</td>
                    <td>20222.02.16</td>
                  </tr>
                  <tr>
                    <td>022.02.16更新说明</td>
                    <td>20222.02.16</td>
                  </tr>
                  <tr>
                  <td>022.02.16更新说明</td>
                    <td>20222.02.16</td>
                  </tr>
                  <tr>
                   <td>022.02.16更新说明</td>
                    <td>20222.02.16</td>
                  </tr>
                </table>
              </template>
            </div>
          </div>-->
          <div class="conten-bottom2">
            <div class="left-border">
              <div class="top">
                <div class="top-left">
                  <el-divider direction="vertical"></el-divider>
                  <span>快捷菜单</span>
                </div>
              </div>
            </div>
            <div class="table">
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">1</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple-light">2</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">3</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">1</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple-light">2</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">3</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div class="ysgl-bottom">
        <div class="ysgl-bottom1">
          <div class="left-border">
            <div class="top">
              <div class="top-left">
                <el-divider direction="vertical"></el-divider>
                <span>员工业绩</span>
              </div>
              <div class="top-right">
                <el-button-group style="background-color: rgba(37,50,56,0.6);">
                  <el-button type="primary" class="color-botton">今天</el-button>
                  <el-button type="primary" class="color-botton">近7天</el-button>
                  <el-button type="primary" class="color-botton">近30天</el-button>
                </el-button-group>
              </div>
            </div>
            <div class="table-conten">
              <!-- :header-cell-style="{background:'rgba(37, 50, 56, 0.6)',color:'#fff', border:'1px solid #516973'}" -->
              <el-table :row-style="rowStyle" :data="tableData" border style="width: 100%;">
                <!-- background:rgba(37, 50, 56, 0.6) -->
                <el-table-column prop="Pm" label="排名" width="180" height="20"></el-table-column>
                <el-table-column prop="name" label="员工姓名" width="180"></el-table-column>
                <el-table-column prop="bm" label="所属部门"></el-table-column>
                <el-table-column prop="md" label="所属门店"></el-table-column>
                <el-table-column prop="xs" label="销售额"></el-table-column>
                <el-table-column prop="tc" label="提成现金"></el-table-column>
                <el-table-column prop="kk" label="开卡数"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="ysgl-bottom1-right">
          <div class="ysgl-bottom2">
            <div class="left-border">
              <div class="top">
                <div class="top-left">
                  <el-divider direction="vertical"></el-divider>
                  <span>商品消费分析</span>
                </div>
                <div class="top-right1">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <!-- echarts -->
              <!-- <div id="MDChart" style="width: 100%;height:30px"></div> -->
              <!-- 扇形图 一周 未来3天 今天-->
              <div class="bottom-style">
                <div id="SPChart" style="width: 100%;height:170px"></div>
              </div>
            </div>
          </div>
          <div class="ysgl-bottom3">
            <div class="left-border">
              <div class="top">
                <div class="top-left">
                  <el-divider direction="vertical"></el-divider>
                  <span>客户消费分析</span>
                </div>
                <div class="top-right1">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <!-- echarts -->
                <!-- <div id="MDChart" style="width: 100%;height:30px"></div> -->
              </div>
              <!-- 扇形图 一周 今天 3天 -->
              <div class="bottom-style">
                <div id="MDChart" style="width: 100%;height:170px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import {GetCode} from '../../../api/index'
export default {
  name: "sygl",
  data() {
    return {
      count: 0,
      options: [
        {
          value: "选项1",
          label: "今天"
        },
        {
          value: "选项2",
          label: "未来3天"
        },
        {
          value: "选项3",
          label: "未来7天"
        }
      ],
      value: "",
      tableData: [
        {
          Pm: "",
          name: "王小虎",
          bm: "店员",
          md: "VR竞技",
          xs: "0.00",
          tc: "0.00",
          kk: "0.00"
        },
        {
          pm: "",
          name: "王小虎",
          bm: "店员",
          md: "VR竞技",
          xs: "0.00",
          tc: "0.00",
          kk: "0.00"
        },
        {
          pm: "",
          name: "王小虎",
          md: "VR竞技",
          xs: "0.00",
          tc: "0.00",
          kk: "0.00"
        }
      ]
      // count:[],
    };
  },
  created () {
    this.getStoreList();
  },
  mounted() {
    let YZCharts = echarts.init(document.getElementById("YZCharts"));
    let MDChart = echarts.init(document.getElementById("MDChart"));
    let SPChart = echarts.init(document.getElementById("SPChart"));
    
    var YZoption = {
      toolbox: {
        feature: {
          // saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        data: [
          "2月15日",
          "2月16日",
          "2月17日",
          "2月18日",
          "2月19日",
          "2月20日",
          "2月21日"
        ]
      },
      yAxis: { type: "value" },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "bar"
        }
      ]
    };
 
    var MDoption = {
      // title: { text: "门店统计" },
      series: [
        {
          name: "访问来源", //饼图的名称
          type: "pie", //类型为饼图
          //饼图的半径
          radius: "70%", //55%指的是外半径为可视区（div盒子的宽高中较小的一项）的尺寸的55%长度
          //南丁格尔图
          //                    roseType:'angle',
          //数据的数组内容
          data: [
            { value: 120, name: "重庆超级布斯特卡丁车俱乐部" },
            { value: 300, name: "测试门店" },
            { value: 60, name: "平顶山俱乐部" }
          ],
          itemStyle: {
            // normal: {
              // shadowBlur: 20,
              // shadowColor: "rgba{0,0,0,0}" //阴影颜色
            // }
          }
        }
      ]
    };
    var SPoption = {
      series: [
        {
          name: "访问来源", //饼图的名称
          type: "pie", //类型为饼图
          //饼图的半径
          radius: "70%", //55%指的是外半径为可视区（div盒子的宽高中较小的一项）的尺寸的55%长度
          //南丁格尔图
          //                    roseType:'angle',
          //数据的数组内容
          data: [
            { value: 120, name: "重庆超级布斯特卡丁车俱乐部" },
            { value: 300, name: "测试门店" },
            { value: 60, name: "平顶山俱乐部" }
          ],
          itemStyle: {
            // normal: {
            //   shadowBlur: 20,
            //   shadowColor: "rgba{0,0,0,0}" //阴影颜色
            // }
          }
        }
      ]
    };

    YZCharts.setOption(YZoption);
    MDChart.setOption(MDoption);
    SPChart.setOption(SPoption);
     window.addEventListener('resize',function(){
      YZCharts.resize();
      MDChart.resize();
      SPChart.resize();
    });
  },
  methods: {
    getStoreList(){
      // let params={
      //   type:'1',
      // }
      // GetCode(params).then(res=>{
      //   console.log('触发接口',res)
      // })
    },
    // rowStyle({row, rowIndex}){
    rowStyle(row, rowIndex) {
      if (rowIndex % 2 === 0) {
        return "yellow";
      }
    },
    load() {
      this.count = 6;
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  height: 100%;
  color: #fff;
  width: 100%;
  text-align: left;
}
.ysgl-top {
  min-height: 175px;
  width: 100%;
  background-color: rgba(37, 50, 56, 0.6);
  .conten-top {
    display: flex;
    height: 144px;
  }
  .conten-con {
    width: 20%;
    height: 130px;
    // line-height: 130px;
    // border: 1px solid #fff;
    margin-right: 10px;
    // text-align: center;
  }
  .text {
    font-size: 18px;
  }
  .conten-con1 {
    width: 20%;
    height: 130px;
    // line-height: 144px;
    // text-align: center;
    // border: 1px solid #fff;
  }
  .flot-right {
    // margin-left: 120px;
    // margin: 30px 12px 30px 120px;
    margin-left: 45%;
    margin-top: 20px;
  }
}
.left-border {
  margin-left: 16px;
  margin-right: 12px;
  padding-top: 10px;
  // padding-bottom: 10px;
}

.top-row {
  height: 144px;
  margin: 0px 26px 0px 0px;
}
.top-left {
  height: 144px;
}
.top {
  height: 34px;
  line-height: 34px;
  padding-bottom: 10px;
}
.top-left {
  float: left;
  height: 32px;
  line-height: 32px;
  width: 140px;
  // border: 1px solid #fff;
}
.top-right {
  float: right;
  height: 32px;
  line-height: 32px;
  width: 232px;
}
.top-right1 {
  float: right;
  height: 32px;
  line-height: 32px;
  width: 60px;
}
.color-botton {
  // height: 32px;
  background-color: rgba(37, 50, 56, 0.6);
  border: 1px solid #2b96fe;
}
.ysgl-conten {
  min-height: 402px;
  width: calc(100% - 10px);
  margin: 10px 0px;
  .conten-left {
    float: left;
    width: 79%;
    min-height: 402px;
    background-color: rgba(37, 50, 56, 0.6);
  }
  .ysgl-contClor {
    min-height: 330px;
    border: 1px solid #39586c;
    background-color: #303e47;
  }
  .top-echarts {
    width: 100%;
    //  height: 100%;
    //  position: absolute;
    height: 300px;
  }
  .conten-right {
    float: right;
    // width: 20%;
    width: calc(100% - 80%);
    min-height: 402px;

    // margin-left: 10px;
  }
  .conten-bottom1 {
    width: 100%;
    // height: 49%;
    background-color: rgba(37, 50, 56, 0.6);
    margin-bottom: 10px;
  }
  .conten-bottom2 {
    width: 100%;
    min-height: 402px;
    // height: 50%;
    background-color: rgba(37, 50, 56, 0.6);
    //  margin-top: 5px;
  }

  .table {
    // width: 99%;
    height: 330px;
    // line-height: 312px;
    background-color: #303e47;
    border: 1px solid #516973;
    margin: 0px 10px;
    overflow: hidden;

    //  padding:0px 10px 0px 5px;
    // box-sizing: border-box;
  }
  .grid-content {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}

.ysgl-bottom {
  min-height: 244px;
  width: 100%;

  // border: 1px solid #fff;
  .ysgl-bottom1 {
    float: left;
    width: 49%;
    min-height: 244px;
    background-color: rgba(37, 50, 56, 0.6);
  }
  .ysgl-bottom1-right {
    float: right;
    // width: 50%;
    width: calc(100% - 49%);
    // margin-right: 10px;
  }
  .bottom-style {
    height: 178px;
    // line-height: 312px;
    background-color: #303e47;
    border: 1px solid #516973;
    // margin:0px 10px;
    // overflow: hidden;
  }
  .ysgl-bottom2 {
    float: left;
    width: 48%;
    min-height: 244px;
    margin-right: 5px;
    margin-left: 10px;
    background-color: rgba(37, 50, 56, 0.6);
  }
  .ysgl-bottom3 {
    float: right;
    width: 48%;
    // width: calc(100% - 51%);
    margin-right: 5px;
    min-height: 244px;
    background-color: rgba(37, 50, 56, 0.6);
  }
  .yellow {
    background: rgba(37, 50, 56, 0.6);
  }
}
.el-divider--vertical {
  display: inline-block;
  width: 2px;
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
  background-color: #2f9bff;
}
.table-conten {
  //  min-height: 244px;
  overflow: auto;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #212e3e !important;
}
.el-table .cell {
  height: 20px;
  line-height: 20px;
  padding: 0;
  margin: 0;
}
/deep/.el-table .el-table__cell {
  padding: 10px 0;
}
.el-table {
  background-color: rgba(37, 50, 56, 0.6);
}
/deep/ .el-table,
.el-table__expanded-cell {
  color: #fff;
  background-color: transparent;
}
/deep/.el-table th {
  // undefined
  background: #303e47 !important;
}
/deep/.el-table tr {
  // undefined
  background-color: #39586c !important;
}

/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  // undefined
  background-color: #49738b !important;
}
/deep/ .el-table--border {
  border: 1px solid #4c676e;
}
/deep/ .el-table--border,
.el-table--group {
  border: 1px solid #4c676e;
}
/deep/ .el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid #4c676e;
}
/deep/ .el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid #4c676e;
}

/deep/ .el-table--border .el-table__cell,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid #4c676e;
}
/deep/ .el-table--border::after {
  background-color: #4c676e;
}
/deep/.el-table::before {
  content: "";
  position: absolute;
  background-color: #4c676e;
  z-index: 1;
}
</style>
<style>
.container .ywgcPanelClass {
  height: 100%;
  color: #fff;
  width: 100%;
  text-align: left;
}
/* .ywgcPanelClass { */
/* height: 540px; */
/* height: 640px; */

/* background-color: rgba(37,50,56,0.6); */
/* } */

/* H217 */
</style>