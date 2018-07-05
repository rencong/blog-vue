<template>
    <div>
        <div style="text-align: center">
            <img style="width: 80px;height: 80px"
                 src="https://lvwenhan.com/content/templates/HappyCodding/images/logo.png">
        </div>
        <div class="panel panel-default">
            <div class="panel-heading title-meta ">
                所有文章
                <div class="fr">
                    <input placeholder="search" type="text" class="" v-model="keyword"/>
                    <button class="btn btn-success" v-on:click="getList">搜索</button>
                </div>
            </div>
            <div class="panel-body">
                <ul class="list-group">
                    <li class="list-group-item" v-for="article in articles">
                        <router-link :to="{name:'ArticleDetail',params:{id:article.id}}" class="title-meta">
                            {{article.title}}
                        </router-link>
                        <div class="article-excerpt markdown-body">{{article.content}}</div>
                        <div class="item-meta row">
                            <label class="col-lg-3">发布时间：{{article.published_at}}</label>
                            <label class="col-lg-3">分类：{{article.category?article.category:'default'}}</label>
                            <label class="col-lg-3">作者：{{article.user===null?'null':article.user.name}}</label>
                        </div>
                    </li>
                </ul>
            </div>
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

</style>