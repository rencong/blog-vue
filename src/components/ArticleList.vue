<template>
    <div>
        <div style="text-align: center">
            <img style="width: 80px;height: 80px"
                 src="https://lvwenhan.com/content/templates/HappyCodding/images/logo.png">
        </div>
        <div class="post-all">
            <div class="post-type clearfix">
                <div class="post-type-title">所有文章</div>
                <div class="post-search">
                    <input placeholder="search" type="text" class="search-input mr5" v-model="keyword"/>
                    <button class="btn btn-default" v-on:click="getList">搜索</button>
                </div>
            </div>
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
                        <span class="post-author">
                            <span class="post-meta-divider">|</span>
                            <span class="post-meta-item-icon">
                                <i class="menu-item-icon fa fa-user"></i>
                            </span>
                             <span class="post-meta-item-text">作者 {{article.user===null?'null':article.user.name}}</span>
                        </span>
                    </div>
                    <div class="article-excerpt markdown-body">{{article.content}}</div>
                    <div class="post-button tc">
                        <router-link :to="{name:'ArticleDetail',params:{id:article.id}}">
                            <button class="btn btn-default">阅读全文 »</button>
                        </router-link>
                    </div>
                    <!--<div class="item-meta row">-->
                        <!--<label class="col-lg-3">发布时间：{{article.published_at}}</label>-->
                        <!--<label class="col-lg-3">分类：{{article.category?article.category:'default'}}</label>-->
                        <!--<label class="col-lg-3">作者：{{article.user===null?'null':article.user.name}}</label>-->
                    <!--</div>-->
                </li>
            </ul>
        </div>
        <paginator :current="currentPage" :last="lastPage" @change="pageChange"></paginator>
    </div>
</template>

<script>
    import Paginator from './Paginator'
    import {articleList} from '../api/article'

    export default {
        name: 'ArticleList',
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
                const query = {
                    'keyword': this.keyword,
                    'page': this.currentPage
                };
                articleList(query).then(response => {
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
    }
</script>

<style scoped>
    .post-type {
        display: flex;
        align-items: center;
        background-color: #e5e5e5;
        padding: 5px 8px;
        justify-content: space-between;
    }
    .post-type-title {
        flex: 1;
    }
    .post-search {
        display: flex;
        justify-content: flex-end;
    }
    .search-input {
        padding: 5px 8px;
        font-size: 14px;
    }
</style>