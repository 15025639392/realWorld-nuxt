import request from "@/utils/request";

// 获取公共文章列表
export function getArticles(params){
    return request({
        method:'GET',
        url:'/api/articles',
        params
    })
}

// 获取关注的用户文章列表
export function getFeedArticles(params){
    return request({
        method:'GET',
        url:'/api/articles/feed',
        params
    })
}

// 添加点赞
export function addFavorite(slug){
    return request({
        method:'POST',
        url:`/api/articles/${slug}/favorite`,
    })
}

// 取消点赞
export function deleteFavorite(slug){
    return request({
        method:'DELETE',
        url:`/api/articles/${slug}/favorite`,
    })
}

// 获取文章详情
export function getArticleDetail(slug){
    return request({
        method:'GET',
        url:`/api/articles/${slug}`,
    })
}

// 获取文章评论
export function getArticleComments(slug){
    return request({
        method:'GET',
        url:`/api/articles/${slug}/comments`,
    })
}

// 评论文章
export function commentArticle(data,slug){
    return request({
        method:'POST',
        url:`/api/articles/${slug}/comments`,
        data
    })
}

// 发布文章
export function addArticle(data){
    return request({
        method:'POST',
        url:`/api/articles`,
        data
    })
}






