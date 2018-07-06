<template>
    <div class="form-group">
        <router-link class="btn btn-default mb20" :to="{name:'ArticleCreate'}">创建文章</router-link>
        <div class="article-all">
            <div class="post-type">我的文章</div>
            <ul class="post-list">
                <li class="" v-for="article in articles">
                    <div class="post-title">
                        <router-link :to="{name:'ArticleDetail',params:{id:article.id}}" class="post-title-link">
                            {{article.title}}
                        </router-link>
                    </div>
                    <div class="post-meta">
                        <span class="post-time">
                            <span class="post-meta-item-icon">
                                <i class="fa fa-calendar-o"></i>
                            </span>
                            <span class="post-meta-item-text">发表于 {{article.published_at}}</span>
                        </span>
                        <span class="post-category">
                            <span class="post-meta-divider">|</span>
                            <span class="post-meta-item-icon">
                                <i class="fa fa-folder-o"></i>
                            </span>
                            <span class="post-meta-item-text">分类于 {{article.category?article.category:'default'}}</span>
                        </span>
                    </div>
                    <div class="article-excerpt markdown-body">{{article.content}}</div>
                    <div class="post-button tc">
                        <router-link :to="{name:'ArticleDetail',params:{id:article.id}}">
                            <button class="btn btn-default">阅读全文 »</button>
                        </router-link>
                    </div>
                    <!--<div class="item-meta">-->
                        <!--{{article.published_at+' /分类：'+(article.category?article.category:'default')}}-->
                    <!--</div>-->
                </li>
            </ul>
        </div>
        <paginator :current="currentPage" :last="lastPage" @change="pageChange"></paginator>
    </div>
</template>

<script>
    import Paginator from './Paginator'
    import {articleUserList} from "../api/article";

    export default {
        name: 'MyArticleList',
        data() {
            return {
                articles: [],
                currentPage: 1,
                lastPage: 1,
                keyword: ''
            }
        },
        mounted() {
            this.getList()
        },
        computed: {},
        methods: {
            pageChange(page) {
                this.currentPage = page;
                this.getList()
            },
            getList() {
                let that = this;
                articleUserList({'user_id': that.$store.state.user.id}).then(response => {
                    let result = response.data;
                    that.articles = result.data;
                    that.currentPage = result.current_page;
                    that.lastPage = result.last_page;
                }).catch(error => {
                    alert(error);
                });
            }
        },
        components: {
            Paginator
        },
        props: [],
    }
</script>

<style scoped>
    .post-type {
        padding: 12px 8px;
    }
</style>