import { createApp } from 'vue'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
const app = createApp(App)
import '@/styles/index.scss'
//@ts-expect-error 忽略ts类型检测 否则打包会失败
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
import pinia from './store'
//注册整个项目全局组件
import allCom from '@/components'
import router from '@/router/index'

//安装自定义插件
app.use(ElementUI, {
  locale: zhCn,
})
app.use(pinia)
app.use(allCom)
app.use(router)
app.mount('#app')
