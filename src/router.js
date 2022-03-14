import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue'
import Login from './views/Login.vue'

import Sy from './views/sy/sy'
import Sygl from './views/sy/syxm/sygl'

// 订单管理
import DjglView from './views/sy/djgl/djglView'
import ScddView from './views/sy/djgl/scddView'

// // 员工管理 
import YgglView from './views/sy/yggl/yglbView'
import TcfaView from './views/sy/yggl/tcfaView'

// // 会员管理
import HyglView from './views/sy/hygl/hyglView'
import HydjView from './views/sy/hygl/hydeView'

// //系统管理
// import XtglView from './views/sy/xtgl/grzlView'
import CzrzView from './views/sy/xtgl/czrzView'
import YhglView from './views/sy/xtgl/yhglView'
import CdglView from './views/sy/xtgl/cdglView'
import MdglView from './views/sy/xtgl/mdglView'

// // 角色管理
 import JsglView from './views/sy/xtgl/jsglView'

// // 字典表
import ZdbglView from './views/sy/xtgl/zdbglView'

// //商品管理
import SplbView from './views/sy/spgl/splbView'
import SpflView from './views/sy/spgl/spflView'
import SptcView from './views/sy/spgl/sptcView'


const routerPush =VueRouter.prototype.push
VueRouter.prototype.push=function push(location){
    return routerPush.call(this,location).catch(error=>error)
}
Vue.use(VueRouter);

const routes = [
    {
        path:'/Login',
        name: 'Login',
        component: Login,
        header:true, 
}, 
 {
    path: '/',
    name:'home',
    component: Home,
    redirect: "/sy/sygl",
    children: [
    {
        path: "/sy",
        name: "sy",
        component: Sy ,
        redirect: "/sy/sygl",
        children: [{
            path: "sygl",
            name: "首页",
            component: Sygl,
        },{
            path: "djglView",
            name: "订单中心",
            component: DjglView,
        },{
            path:'ScddView',
            name:'商城订单',
            component:ScddView,
        },
        {
            path: "HyglView",
            name: "会员列表",
            component: HyglView,
        },{
            path: "HydjView",
            name: "会员等级",
            component: HydjView,

        },{
           path: "YgglView",
            name: "员工管理",
            component: YgglView,
        },
        {
            path: "TcfaView",
             name: "员工管理",
             component: TcfaView,
         },
        //  {
        //     path: "XtglView",
        //     name: "个人资料",
        //     component: XtglView,
        //  },
         {
            path: "CzrzView",
            name: "操作日志",
            component: CzrzView,
         },{
            path: "YhglView",
            name: "用户管理",
            component: YhglView,
         },{
            path: "CdglView",
            name: "用户管理",
            component: CdglView,
         },{
            path: "MdglView",
            name: "门店管理",
            component: MdglView,
         },{
            path: "SplbView",
            name: "商品列表",
            component: SplbView,
         },{
             path:'SpflView',
             name: "商品分类",
             component: SpflView,
         },{
            path:'SptcView',
            name: "商品套餐",
            component: SptcView,
         },{
            //  JsglView
            path:'JsglView',
            name: "角色管理",
            component: JsglView,
         },{
            //  ZdbglView
            path:'ZdbglView',
            name: "字典表管理",
            component: ZdbglView,
         }
        ],
    }],
},
   
    
    // {
    //     // path: '/',
    //     name: 'Login',
    //     component: Login,
    //     header:true
       
    //     // meta: {
    //     //     header: "login",
    //     // },
    // },
   
];
const router = new VueRouter({
    base: "",
    mode: "history",
    routes
});

// //设置路由导航拦截：
// router.beforeEach((to,from,next)=>{
    // let token = store.state.user.token;
//   if (token || to.name === 'Login') {
//     next();
//   } else {

//     next({
//       path: "/login"
//     });
//   }
//   })
export default router