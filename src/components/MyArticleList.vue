<template>
    <div class="form-group">
        <router-link class="btn btn-success" :to="{name:'ArticleCreate'}">创建文章</router-link>
        <div class="panel panel-default">
            <div class="panel-heading title-meta">
                我的文章
            </div>
            <div class="panel-body">
                <ul class="list-group">
                    <li class="list-group-item" v-for="article in articles">
                        <router-link :to="{name:'ArticleDetail',params:{id:article.id}}" class="title-meta">
                            {{article.title}}
                        </router-link>
                        <div class="article-excerpt markdown-body">{{article.content}}</div>
                        <div class="item-meta">
                            {{article.published_at+' /分类：'+(article.category?article.category:'default')}}
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
                let that=this;
                articleUserList({'user_id':that.$store.state.user.id}).then(response => {
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

</style>