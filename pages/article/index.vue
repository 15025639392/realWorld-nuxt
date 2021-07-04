<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions"><article-meta :article="article" />></div>

      <div class="row">
        <artice-comments :article="article"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/article";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta.vue";
import ArticeComments from "./components/article-comments.vue";

export default {
  // 在匹配组件渲染之前会限制性中间件处理
  middleware: ["authenticate"],
  name: "Article",
  components: {
    ArticleMeta,
    ArticeComments
  },
  async asyncData({ params }) {
    const result = await getArticleDetail(params.slug);
    const { article } = result.data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article,
    };
  },
  head(){
    return {
      title:`${this.article.title} Realworld`,
      meta:[
        {
          hid:'description',
          name:'discription',
          content: this.article.discription
        }
      ]
    }
  }
};
</script>

<style>
</style>