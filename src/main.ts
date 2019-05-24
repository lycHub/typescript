import Vue from 'vue'
import App from './App.vue'
import { createRouter } from "./router";
import vant from 'vant';
Vue.use(vant);
Vue.config.productionTip = false

import './components';
import './styles/index.less';



export function createApp () {
  const router = createRouter();
  const app = new Vue({
    router,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app,router }
}