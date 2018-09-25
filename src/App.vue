<template>
    <div id="app">
        <router-view>
        </router-view>
    </div>
</template>

<script>

    export default {
        name: 'App',
        created() {
            //todo:如何保存用户信息，登录时会报错,token暴露在外面
            this.$store.dispatch('GetUserInfo').then((data) => {
            }).catch(error => {
                console.log(error);
                // alert(error);
            });
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        margin-top: 70px;
    }
</style>
