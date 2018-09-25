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
            <!--<a v-show="is_login" class="navbar-brand cp" v-on:click="logout()"><i class="fa fa-sign-out"></i>注销</a>-->
            <!--<router-link v-show="!is_login" class="navbar-brand cp" :to="{name:'Login'}"><i class="fa fa-sign-in"></i>登录-->
            <!--</router-link>-->
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right" v-if="is_login">
                    <li>
                        <a id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                           class="dropdown-toggle">{{user.name}}</a>
                        <ul class="dropdown-menu" aria-labelledby="dLabel">
                            <li><a href="#"><i class="fa fa-cog"></i> 更换密码</a></li>
                            <li><a href="#"><i class="fa fa-user"></i> 更换头像</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a v-on:click="logout()"><i class="fa fa-sign-out"></i>注销</a></li>
                        </ul>
                    </li>
                    <li><img v-bind:src="user.avatar" class="img-circle" width="50">
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right" v-else>
                    <router-link v-show="!is_login" class="navbar-brand cp" :to="{name:'Login'}"><i class="fa fa-sign-in"></i>登录</router-link>
                    <router-link v-show="!is_login" class="navbar-brand cp" :to="{name:'Register'}"><i class="fa fa-sign-in"></i>注册</router-link>
                </ul>
            </div>
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
            },
            user: function () {
                return this.$store.state.user.user;
            },
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