import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stroe'

import FastClick from 'fastclick'
import toast from 'components/common/toast/index.js'
Vue.config.productionTip = false
// 添加时间总线对象
Vue.prototype.$bus = new Vue()

// 解决移动端300ms延迟
FastClick.attach(document.body)
// 安装toast插件
Vue.use(toast)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
