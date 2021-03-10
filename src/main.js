// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import L from "leaflet"
import 'leaflet.chinatmsproviders'
import "leaflet/dist/leaflet.css"
import map from './map/map.js'
import 'leaflet.pm'
import 'leaflet.pm/dist/leaflet.pm.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$map = map
console.log(Vue.prototype)
/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})
/* eslint-disable no-new */
/* eslint-disable */
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
