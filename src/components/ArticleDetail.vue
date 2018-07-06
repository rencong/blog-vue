<template>
    <div class="content">
        <button class="btn btn-default" onclick="window.history.go(-1)" title="返回">返回</button>
        <router-link  v-if="is_me" class="btn btn-default" :to="{name:'ArticleEdit',params:{id:article.id}}">编辑文章
        </router-link>
        <button  v-if="is_me" class="btn btn-default" v-on:click="deleteArticle()">删除文章</button>
        <div class="detail-title">{{article.title}}</div>
        <div class="post-meta">
            <span class="post-time">
                <span class="post-meta-item-icon">
                    <i class="fa fa-calendar-o mr5"></i>发表于 {{article.published_at}}
                </span>
            </span>
            <span class="post-category">
                <span class="post-meta-divider">|</span>
                <span class="post-meta-item-icon">
                    <i class="fa fa-folder-o mr5"></i>分类于 {{article.category?article.category:'default'}}
                </span>
            </span>
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
    .title {
        font-size: 18px;
        margin-bottom: 15px;
    }
    .post-meta {
        color: #999;
        font-size: 12px;
        text-align: center;
    }
    .post-meta-divider {
        margin: 0 .5em;
    }
    .detail-title {
        margin: 15px 0;
        text-align: center;
        font-size: 22px;
        font-weight: 500;
    }
</style>