// 客户端入口，创建应用程序，并且将其挂载到 DOM 中
import { createApp } from './main'

const { app, router  } = createApp()

router.onReady(() => {
  app.$mount('#app')
})