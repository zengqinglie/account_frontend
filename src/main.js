import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

import store from './vuex/store'
import routes from './routes'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueResource)



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization','Bearer ' + localStorage.getItem('id_token'));
  next((response) => {
    if(response.status===401){
      router.replace('/login')
    }
    return response
  })
});
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
  //render: h => h(Login)
}).$mount('#app')
//router.replace('/login')