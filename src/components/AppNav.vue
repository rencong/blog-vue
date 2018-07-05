<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <router-link :to="{name:'ArticleList'}" class="navbar-brand">
                首页
            </router-link>
            <router-link v-show="is_login" :to="{name:'MyArticleList'}" class="navbar-brand">
                我的文章
            </router-link>
            <a class="navbar-brand">关于我</a>
            <a v-show="is_login" class="navbar-brand" v-on:click="logout()">注销</a>
            <router-link v-show="!is_login" class="navbar-brand" :to="{name:'Login'}">登录</router-link>
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

</style>