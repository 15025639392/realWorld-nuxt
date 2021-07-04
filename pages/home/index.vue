<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">TODO</h1>
        <p>拉钩教育</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                >
                  我的分享
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                >
                  公共分享
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'tag',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag
                    },
                  }"
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.updatedAt | date('MMM DD,YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>查看更多...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                v-for="index in totalPage"
                :key="index"
                :class="{
                  active: page === index,
                }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      tag: tag,
                      tab: tab,
                      page: index,
                    },
                  }"
                  >{{ index }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div>
        <div class="sidebar">
          <p>流行标签</p>
          <div class="tag-list">
            <nuxt-link
              v-for="tag in tags"
              :key="tag"
              class="tag-pill tag-default"
              :to="{
                name: 'home',
                query: {
                  tab:'tag',
                  tag: tag,
                },
              }"
            >
              {{ tag }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles,getFeedArticles,addFavorite, deleteFavorite } from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  watchQuery: ["page", "tag","tab"],
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page) || 1;
    const limit = 10;
    const { tag } = query;
    const tab = query.tab||'global_feed'
    const loadArticles = store.state.user&& tab==='your_feed'?getFeedArticles:getArticles
    const [articelRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        tag,
        offset: (page - 1) * limit,
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articelRes.data;
    const { tags } = tagRes.data;
    articles.forEach(r=>{
      r.favoriteDisabled = false
    })
    return {
      tab:tab||'global_feed',
      tag,
      tags,
      page,
      limit,
      articles,
      articlesCount,
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods:{
    async onFavorite(article){
      const favorited = article.favorited;
      const callBack = favorited?deleteFavorite:addFavorite;
      article.favoriteDisabled = true
      await callBack(article.slug)
      article.favorited = !favorited
      const count = favorited?-1:1;
      article.favoritesCount += count
      article.favoriteDisabled = false
    }
  }
};
</script>

<style>
</style>