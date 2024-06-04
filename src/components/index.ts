import SvgIcon from './svgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allcom:any = {SvgIcon}
export default{
    install(app:any){
          //注册项目全部的全局组件
        Object.keys(allcom).forEach(item=>{
             //注册为全局组件
            app.component(item,allcom[item])
        })
         //将element-plus提供图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}