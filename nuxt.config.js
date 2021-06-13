module.exports={
    router:{
        // 自定义路由规则
        extendRoutes(routers,resolve){
            // 清除 nuxt.js 基于pages目录生成的路由表规则
            routers.splice(0)
            routers.push(...[{
                path:'/',
                component: resolve(__dirname,'pages/layout/'),
                children:[
                    {
                        path:'',//默认子路由
                        name:'home',
                        component:resolve(__dirname,'pages/home/')
                    }
                ]
            }])
        }
    }
}