module.exports={
    router:{
        linkExactActiveClass:'active',
        // middleware: ['authenticate'],
        // 自定义路由规则
        extendRoutes(routers,resolve){
            // 清除 nuxt.js 基于pages目录生成的路由表规则
            routers.splice(0)
            routers.push(...[
                {
                    path:'/',
                    component: resolve(__dirname,'pages/layout/'),
                    children:[
                        {
                            path:'',//默认子路由
                            name:'home',
                            component:resolve(__dirname,'pages/home/')
                        },
                        {
                            path:'/login',
                            name:'login',
                            component:resolve(__dirname,'pages/login/')
                        },
                        {
                            path:'/register',
                            name:'register',
                            component:resolve(__dirname,'pages/login/')
                        },
                        {
                            path:'/profile/:username',
                            name:'profile',
                            component:resolve(__dirname,'pages/profile/')
                        },
                        {
                            path:'/setting',
                            name:'setting',
                            component:resolve(__dirname,'pages/setting/')
                        },
                        {
                            path:'/editor',
                            name:'editor',
                            component:resolve(__dirname,'pages/editor/')
                        },
                        {
                            path:'/article/:slug',
                            name:'article',
                            component:resolve(__dirname,'pages/article/')
                        }
                    ]
                }
            ])
        }
    },
    server:{
        host:'0.0.0.0',
        port:3306
    },
    // 注册插件
    plugins: [
        '~plugins/request.js',
        '~plugins/day.js'
    ]
}