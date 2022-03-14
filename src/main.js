import Vue from 'vue'
// import VueRouter from 'vue-router'
// import routers from './routers'
import router from './router'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import echarts from 'echarts'
import * as echarts from 'echarts/lib/echarts'
import config from "./Config";//20220223配置接口
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor';
import maps from "qqmap"
import md5 from 'js-md5';  
// 表单验证被阻止
import 'default-passive-events'

Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts;
Vue.prototype.$globalConfig = config;//20220223配置接口
Vue.config.productionTip = false;
Vue.use(VueQuillEditor)
Vue.use(maps)

Vue.use(ElementUI)
// const Router = new VueRouter({
//   mode: 'history',
//   routes: Routers
// })
new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')