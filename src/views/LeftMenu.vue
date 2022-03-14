<template>
  <div class="left-menu">
    <!--class='el-menu-vertical'  active-text-color="#6f9ff5"  background-color="#081118"  text-color="#fff" -->
    <!-- :router='true' -->
    <el-menu
      class="el-menu-vertical-demo"
      active-text-color="#6f9ff5"
      background-color="#081118"
      :unique-opened="true"
      text-color="#fff"
      :router="true"
    >
      <!-- :route ='item.value' -->
      <template v-for="(item, index) in navMenu" style="height:100%">
        <el-submenu v-if="item.childs" :index="item.name" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title" class="menuTitle">{{item.alias}}</span>
            <!-- <i class='iconfont icon-shenpi edit' v-show='haha'></i> -->
          </template>
          <!-- <el-submenu  v-for='(item1) in item.childs' :key='item1.name' :index='item1.name' :route='item1.value'>
                    <template slot='title'>
                        <i :class='item1.icon'></i>
                        <span slot='title'>{{item1.alias}}</span>
                    </template>
                    <el-submenu v-for='(item2) in item1.childs' :key='item2.name' :index='item2.name' :route ='item2.value'>
                        <template slot='title'>
                            <i :class='item2.icon'></i>
                            <span slot='title'>{{item2.alias}}</span>
                        </template>
                        <el-submenu v-for='(item3) in item2.childs' :key='item3.name'  :index='item3.name' :route='item3.value'>
                            <template slot='title'>
                                <i :class='item3.icon'></i>
                                <span slot='title'>{{item3.alias}}</span>
                            </template>
                            <el-menu-item v-for='(item4) in item3.childs' :key='item4.name' :index='item4.name' :route='item4.value'>
                                <span>{{item4.alias}}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-for='(item3) in item2.childs' :key='item3.name'  :index='item3.name' :route = 'item3.value'>
                            <span>{{item3.alias}}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-for='(item2) in item1.childs' :key='item2.name'  :index='item2.name' :route = 'item2.value'>
                        <span>{{item2.alias}}</span>
                    </el-menu-item>
          </el-submenu>-->
          <el-menu-item
            v-for="(item1) in item.childs"
            :key="item1.name"
            :index="item1.name"
            :route="item1.value"
          >
            <span class="menuTitle">{{item1.alias}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-if="item.childs == null"
          :index="item.name"
          :key="index"
          :route="item.value"
        >
          <i :class="item.icon"></i>
          <span slot="title" class="menuTitle">{{item.alias}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  props: {
    // headerMenuPath: String
  },
  data() {
    return {
      isCollapse: true,
      menuWidth: 48,
      keyPath: "",
      navMenu: [
        {
          name: "首页",
          icon: "el-icon-location",
          alias: "首页",
          value: "/sy/sygl"
        },
        {
          name: "订单中心",
          icon: "el-icon-document",
          alias: "订单中心",
          value: "/sy/djglView",
          childs: [
            {
              name: "channelManage",
              icon: "el-icon-setting",
              alias: "单据管理",
              value: "/sy/djglView"
            },
            {
              name: "saveManage",
              icon: "",
              alias: "商城订单",
              value: "/sy/ScddView"
            }
          ]
        },
        {
          name: "YgglView",
          icon: "el-icon-location",
          alias: "员工管理",
          value: "/sy/YgglView",
          childs: [
            {
              name: "YgglView",
              icon: "el-icon-location",
              alias: "员工列表",
              value: "/sy/YgglView"
            },
            {
              name: "TcfaView",
              icon: "el-icon-location",
              alias: "提成方案",
              value: "/sy/TcfaView"
            }
          ]
        },
        {
          name: "会员管理",
          icon: "el-icon-location",
          alias: "会员管理",
          value: "/sy/HyglView",
          childs: [
            {
              name: "会员列表",
              icon: "el-icon-location",
              alias: "会员列表",
              value: "/sy/HyglView"
            },
            {
              name: "会员等级",
              icon: "el-icon-location",
              alias: "会员等级",
              value: "/sy/HydjView"
            }
          ]
        },
        {
          name: "SplbView",
          icon: "el-icon-location",
          alias: "商品管理",
          value: "/sy/SplbView",
          childs: [
            {
              name: "SplbView",
              icon: "el-icon-location",
              alias: "商品列表",
              value: "/sy/SplbView"
            },
            {
              name: "SpflView",
              icon: "el-icon-location",
              alias: "商品分类",
              value: "/sy/SpflView"
            },
            {
              name: "SptcView",
              icon: "el-icon-location",
              alias: "商品套餐",
              value: "/sy/SptcView"
            }
          ]
        },
        {
          name: "系统管理",
          icon: "el-icon-location",
          alias: "系统管理",
          value: "/sy/XtglView",
          childs: [
            {
              name: "菜单管理",
              icon: "el-icon-location",
              alias: "菜单管理",
              value: "/sy/CdglView"
            },
            {
              name: "字典表管理",
              icon: "el-icon-location",
              alias: "字典表管理",
              value: "/sy/ZdbglView"
            },
            {
              name: "角色管理",
              icon: "el-icon-location",
              alias: "角色管理",
              value: "/sy/JsglView"
            },
            // {
            //   name: "个人资料",
            //   icon: "el-icon-location",
            //   alias: "个人资料",
            //   value: "/sy/XtglView"
            // },
            {
              name: "用户管理",
              icon: "el-icon-location",
              alias: "用户管理",
              value: "/sy/YhglView"
            },

            {
              name: "门店管理",
              icon: "el-icon-location",
              alias: "门店管理",
              value: "/sy/MdglView"
            },
            {
              name: "操作日志",
              icon: "el-icon-location",
              alias: "操作日志",
              value: "/sy/CzrzView"
            }
          ]
        }
      ],

      // menuTree: [
      //   {
      //     path: "sy/sygl",
      //     name: "项目测试",
      //     id: "sygl",
      //     childern: [
      //       {
      //         path: "HelloWorld",
      //         name: "HelloWorld",
      //         id: "HelloWorld"
      //       }
      //     ]
      //   }

      //   // {
      //   //   path: "sy/sygl",
      //   //   name: "测试1",
      //   //   id: "HelloWorld"
      //   // }
      // ],

      publicMenuTree: {
        sy: [
          {
            path: "sy/sygl",
            name: "项目测试",
            id: "sygl"
          },
          {
            path: "sy/sygl",
            name: "项目测试1",
            id: "sygl"
          }
        ]
      }
    };
  },
  computed: {
    // menuTree: {
    // get() {
    //   return this.publicMenuTree[this.headerMenuPath];
    // },
    // set() {
    // },
    // },
    // activeIndex() {
    //   return this.publicMenuTree[this.headerMenuPath][0].path
    // }
  },
  methods: {
    handleSelect() {},
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo() {}
    // menuClick(key){
    // if (this.keyPath !== key) {

    // }
    // },
    // enter() {
    //   this.isCollapse = false;
    //   this.menuWidth = 160;
    //   // this.$emit("mouseMove", this.menuWidth)
    // },
    // leave() {
    //   this.isCollapse = true;
    //   this.menuWidth = 48;
    //   // this.$emit("mouseMove", this.menuWidth)
    // },

    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
    // },
    // menuClick(key, data, elem) {
    // if (this.keyPath !== key) {
    // this.keyPath = key;
    // this.$router.push({path: "/" + key});
    // this.$emit('leftMenuClick');
    // }
    // }
  },
  beforeMount() {
    // this.menuTree =this.publicMenuTree
    // console.log('his.publicMenuTree',this.publicMenuTree)
    // this.menuTree = this.publicMenuTree[this.headerMenuPath];
    // console.log('000',this.menuTree)
  }
};
</script>

<style scoped lang="scss">
.left-menu {
  width: 203px;
  height: 100%;
  position: relative;
  // border-right: solid 1px #081118;
  .el-menu-vertical-demo {
    height: 100%;
    border-right: solid 1px #081118;
    .menuIcon {
      height: 17px;
      width: 14px;
      margin-left: -3px;
    }
    .menuTitle {
      display: inline-block;
      height: 17px;
      line-height: 17px;
      // margin-left: 17px;
    }
  }
  .menuTitle:hover,
  .el-menu-item.is-active {
    // border-color: #FE930F !important;
    // background: rgba(255, 255, 255, 0.2) !important;
    background: rgba(43, 150, 254, 0.2) !important;
    // a {
    //   outline: 0;
    // }
    .el-menu-item {
      min-width: 180px;
    }
  }
}
</style>
<style>
/* .left-menu .el-menu--collapse {
  width: 48px;
  width: 160px;
} */

.el-menu {
  border-right: solid 1px #081118;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  /* background-color: #fff; */
}
.el-submenu .el-menu-item {
  /* width: 150px; */
  min-width: 180px;
}
</style>
