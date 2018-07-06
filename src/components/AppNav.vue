<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <router-link :to="{name:'ArticleList'}" class="navbar-brand">
                <span><i class="fa fa-home"></i>首页</span>
            </router-link>
            <router-link v-show="is_login" :to="{name:'MyArticleList'}" class="navbar-brand">
                <span><i class="fa fa-file-text"></i></span>我的文章
            </router-link>
            <a class="navbar-brand"><i class="fa fa-user"></i>关于我</a>
            <a v-show="is_login" class="navbar-brand cp" v-on:click="logout()"><i class="fa fa-sign-out"></i>注销</a>
            <router-link v-show="!is_login" class="navbar-brand cp" :to="{name:'Login'}"><i class="fa fa-sign-in"></i>登录</router-link>
        </div>
    </nav>
</template>

<script>

    export default {
        name: "AppNav",
        data() {
            return {}
        },
        computed: {
            is_login: function () {
                return this.$store.state.user.token !== '';
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push('/login');
                }).catch(error => {
                    alert(error);
                });
            }
        }
    }
</script>

<style scoped>
    .navbar-brand {
        font-size: 16px;
    }
    .navbar .fa {
        margin-right: 5px;
    }
</style>