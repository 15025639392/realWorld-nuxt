<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input v-model="title" type="text" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input v-model="description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea v-model="body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
            </fieldset>
            <button @click="addArticle" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>



</template>

<script>
import {addArticle} from "@/api/article"
const defalutArticle = {
  title: "",
  description: "",
  body: "",
  tagList: ""
}
export default {
    // 在匹配组件渲染之前会限制性中间件处理
    middleware:['authenticate'],
    name:'Editor',
    data(){
      return {
        ...defalutArticle
      }
    },
    methods:{
      async addArticle(){
        await addArticle({
          article: {
            "title":this.title,
            "description": this.description,
            "body": this.body,
            "tagList": this.tagList.length?this.tagList.split(';'):[]
          }
        })
        Object.assign(this,{},defalutArticle)
      }
    }
}
</script>

<style>

</style>