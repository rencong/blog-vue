<template>
    <div class="content">
        <h1 class="title">{{article.title}}</h1>
        <router-link  v-if="is_me" class="btn btn-success" :to="{name:'ArticleEdit',params:{id:article.id}}">编辑文章
        </router-link>
        <button  v-if="is_me" class="btn btn-success" v-on:click="deleteArticle()">删除文章</button>
        <div class="title-info">
            {{article.published_at+' /分类：'+(article.category?article.category:'default')}}
        </div>
        <hr>
        <div v-html="article.content" v-highlight class="markdown-body"></div>
    </div>
</template>

<script>
    import {articleDelete, articleDetail} from "../api/article";

    export default {
        name: "ArticleDetail",
        data() {
            return {
                article: {},
            }
        },
        computed:{
            is_me:function () {
                return this.article.user_id === this.$store.state.user.id
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                let that = this;
                articleDetail(this.$route.params.id).then(response => {
                    that.article = response.data;
                }).catch(error => {
                    alert(error);
                });
            },
            deleteArticle() {
                articleDelete({'id': this.$route.params.id}).then(response => {
                    this.$router.push('/article/my');
                }).catch(error => {
                    alert(error);
                });
            },
        }
    }
</script>

<style scoped>

</style>