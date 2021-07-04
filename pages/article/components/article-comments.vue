<template>
  <div class="col-xs-12 col-md-8 offset-md-2">
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          v-model="body"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button type="button" class="btn btn-sm btn-primary" @click="commentArticle">Post Comment</button>
      </div>
    </form>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{comment.body}}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link 
            class="comment-author"
            :to="{
                name:'profile',
                params:{
                    username:comment.author.username
                }
            }"
        >
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link 
            class="comment-author"
            :to="{
                name:'profile',
                params:{
                    username:comment.author.username
                }
            }"
        >{{comment.author.username}}</nuxt-link >
        <span class="date-posted">{{comment.createdAt | date('MMM DD,YYYY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleComments, commentArticle } from "@/api/article";
import {mapState} from 'vuex'
export default {
  name: "ArticeComments",
  props: {
    article: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
      return {
          body:'',
          comments: [],
      }
  },
  computed:{
    ...mapState(['user'])
  },
  async mounted() {
    const { data } = await getArticleComments(this.article.slug);
    this.comments = data.comments;
  },
  methods:{
    async commentArticle(){
      await commentArticle({
        comment:{
          body:this.body
        }
      },this.article.slug)
      this.comments.push({
        author:{
          ...this.user
        },
        createdAt:new Date(),
        body:this.body
      })
      this.body = ''
    }
  }
};
</script>

<style>
</style>