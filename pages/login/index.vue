<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{isLogin?'登陆':'注册'}}</h1>
        <p class="text-xs-center">
          <nuxt-link v-if="isLogin"  to="/register">没有账户?</nuxt-link>
          <nuxt-link v-else to="/login">已有账户?</nuxt-link>
        </p>

        <ul class="error-messages">
            <template v-for="(messages,filed) in errors">
                <li v-for="(message,index) in messages" :key="index">{{filed}} {{message}}</li>
            </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group">
            <input v-model="user.username" v-if="!isLogin" class="form-control form-control-lg" type="text" placeholder="用户名" required>
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="邮箱" required>
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="密码" required>
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{isLogin?'登陆':'注册'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>

</template>

<script>
import {login,register} from "@/api/user"
const Cookie = process.client?require('js-cookie'):undefined
export default {
     // 在匹配组件渲染之前会限制性中间件处理
    middleware:['notAuthenticate'],
    name:'LginIndex',
    computed:{
        isLogin(){
            return this.$route.name === 'login'
        }
    },
    data(){
        return {
            "user":{
                username:'',
                "email": "",
                "password": ""
            },
            errors:{

            }
        }
    },
    methods:{
        async onSubmit(){
            // 提交表单请求登陆
            // 不建议在项目中直接写请求代码，接口改动需要在项目中各个地方去找请求的地方，非常麻烦。
            // 统一组织管理，更多的是为了方便维护，为了方便，将请求封装称方法
            // const {data} = await request({
            //     method:'POST',
            //     url:'/api/users/login',
            //     data:{
            //         user:this.user
            //     }
            // })
           try {
                const {data} = this.isLogin?await login(this.user):await register(this.user)
                console.log(data)
                // TODO 保存用户登陆状态
                this.$store.commit('setUser',data.user)
                // 为了 防止刷新浏览器 数据丢失，我们需要把数据持久化
                Cookie.set('user',data.user)
                //跳转到首页
                this.$router.push('/')
           } catch (err) {
               this.errors = err.response.data.errors
           }
        }
    }
}
</script>

<style>

</style>