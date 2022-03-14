import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Zhpg from '@/components/dbpg/zh/zh'
import yhgl from '@/components/xtgl/yhgl/yhgl'
import SlpgInfo from '@/components/dbpg/slpg/slpg'
import Szpg from '@/components/dbpg/szpg/sz'
import JkpgInfo from '@/components/dbpg/jkpg/jkpg'
import Glpg from '@/components/dbpg/glpg/gl'
import Xtrz from '@/components/xtgl/xtrz/xtrz'
import Jsgl from '@/components/xtgl/jsgl/jsgl'
import Xtbf from '@/components/xtgl/xtbf/xtbf'
import szfx from '@/components/gzsjfx/szfx/szfx'
import slfx from '@/components/gzsjfx/slfx/slfx'
import qxhj from '@/components/gzsjfx/qxhj/qxhj'
import ygyx from '@/components/gzsjfx/ygyx/ygyx'
import Szyj from '@/components/yjfw/szyj/Szyj'
import Slyj from '@/components/yjfw/Slyj'
import YjczPdf from '@/components/yjfw/YjczPdf'
import ssjk from '@/components/gzsjfx/ssjk/ssjk'
import zkcjxx from '@/components/znkz/zkcjxx'
import zksjgl from '@/components/znkz/zksjgl'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'szfx',
          name: "感知数据分析",
          components: {
            main: szfx
          }
        },
        {
          path: 'qxhj',
          name: "感知数据分析",
          components: {
            main: qxhj
          }
        },
        {
          path: 'slfx',
          name: "感知数据分析",
          components: {
            main: slfx
          }
        },
        {
          path: 'ygyx',
          name: "遥感影像",
          components: {
            main: ygyx
          }
        },
        {
          path: 'ssjk',
          name: "实时监控",
          components: {
            main: ssjk
          }
        },
        {
          path: 'zkcjxx',
          name: "闸控采集信息",
          components: {
            main: zkcjxx
          }
        },
        {
          path: 'zksjgl',
          name: "闸控数据管理",
          components: {
            main: zksjgl
          }
        },
        {
          path: 'zh',
          name: "评估—综合",
          components: {
            main: Zhpg
          },
        },
        {
          path: 'slpg',
          name: "评估—水量评估",
          components: {
            main: SlpgInfo
          }
        },
        {
          path: 'szpg',
          name: "评估—水质评估",
          components: {
            main: Szpg
          }
        },
        {
          path: 'jkpg',
          name: "评估—监控评估",
          components: {
            main: JkpgInfo
          }
        },
        {
          path: 'glpg',
          name: "评估—管理评估",
          components: {
            main: Glpg
          }
        },
        {
          path: 'yhgl',
          name: "用户管理",
          components: {
            main: yhgl
          }
        },
        {
          path: 'jsgl',
          name: "角色管理",
          components: {
            main: Jsgl
          }
        },
        {
          path: 'xtrz',
          name: "系统日志",
          components: {
            main: Xtrz
          }
        },
        {
          path: 'xtbf',
          name: "系统备份",
          components: {
            main: Xtbf
          }
        },
        {
          path: 'szyj',
          name: "水质预警",
          components: {
            main: Szyj
          }
        },
        {
          path: 'slyj',
          name: "水量预警",
          components: {
            main: Slyj
          },
        },
        {
          path: 'yjczPdf',
          name: "应急处置",
          components: {
            main: YjczPdf
        },
      }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

  ]
});

router.beforeEach((to, from, next) => {
  let token = store.state.user.token;
  if (token || to.name === 'Login') {
    next();
  } else {

    next({
      path: "/login"
    });


  }
});
export default router
