import {createRouter,createWebHashHistory} from 'vue-router'
let router = createRouter({
    //路由模式
    history:createWebHashHistory(),
    routes:[
        {
            path:'/login',
            name:'Login',
            component:()=>import('@/view/login/index.vue')
        },
         {
            path:'/home',
            name:'Home',
            component:()=>import('@/view/home/index.vue')
        }
    ],
    //滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    },
})

export default router