import 'ant-design-vue/lib/style/index.less' // antd core styles
import './components/kit/vendors/antd/themes/default.less' // default theme antd components
import './components/kit/vendors/antd/themes/dark.less' // dark theme antd components
import './global.scss' // app & third-party component styles
import vueGoogleMapWrapper from '@/js/vue-google-map-wrapper'

import Vue from 'vue'
import VuePageTitle from 'vue-page-title'
import NProgress from 'vue-nprogress'
import VueLayers from 'vuelayers'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from './localization'
import './antd'
import './registerServiceWorker'

// mocking api
import './services/axios/fakeApi'

// moment
import vueMoment from 'vue-moment'

// naver map api
import naver from 'vue-naver-maps'
Vue.use(naver, {
  clientID: '0kmpf0u5gz',
  useGovAPI: false, // 공공 클라우드 API 사용 (선택)
  subModules: '', // 서브모듈 (선택)
})

Vue.use(vueMoment)
Vue.use(BootstrapVue)
Vue.use(VueLayers)
Vue.use(NProgress)
Vue.use(VuePageTitle, {
  prefix: 'Happy House | ',
  router,
})
Vue.use(vueGoogleMapWrapper, { apiKey: 'AIzaSyB6FYzXV_4wBKef7_bhyZVBHZGvNUV4U9Y' })

Vue.config.productionTip = false
const nprogress = new NProgress({ parent: 'body' })

new Vue({
  router,
  store,
  nprogress,
  i18n,
  render: h => h(App),
}).$mount('#app')
