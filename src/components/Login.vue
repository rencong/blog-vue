<template>
    <div class="row">

        <div class="col-md-4 col-md-offset-4">
            <div v-show="showLogin">
                <h3 class="login">登录</h3>
                <div class="form-group">
                    <label>姓名：</label>
                    <input class="form-control" type="text" v-model="loginForm.name">
                </div>
                <div class="form-group">
                    <label>密码：</label>
                    <input class="form-control" type="password" v-model="loginForm.password" @keyup.enter="login">
                </div>
                <div class="form-group">
                    <button class="btn btn-primary form-control" @click="login">登录</button>
                </div>
                <span v-on:click="ToRegister">没有账号？马上注册</span>
            </div>

            <div v-show="showRegister">
                <h3 class="login">注册</h3>
                <div class="form-group">
                    <label>姓名：</label>
                    <input class="form-control" type="text" v-model="loginForm.name">
                </div>
                <div class="form-group">
                    <label>邮箱：</label>
                    <input class="form-control" type="email" v-model="loginForm.email">
                </div>
                <div class="form-group">
                    <label>密码：</label>
                    <input class="form-control" type="password" v-model="loginForm.password" @keyup.enter="login">
                </div>
                <div class="form-group">
                    <button class="btn btn-primary form-control" @click="register">注册</button>
                </div>
                <!--<input type="text" placeholder="请输入用户名" v-model="registerForm.name">-->
                <!--<input type="email" placeholder="请输入邮件" v-model="registerForm.email">-->
                <!--<input type="password" placeholder="请输入密码" v-model="registerForm.password">-->
                <!--<button v-on:click="register">注册</button>-->
                <span v-on:click="ToLogin">已有账号？马上登录</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                showLogin: true,
                showRegister: false,
                loginForm: {
                    name: '',
                    password: ''
                },
                registerForm: {
                    name: '',
                    password: '',
                    email: ''
                },
            }
        },
        methods: {
            ToLogin: function () {
                this.loginForm = {
                    name: '',
                    password: ''
                };
                this.showLogin = true;
                this.showRegister = false;
            },
            ToRegister: function () {
                this.registerForm = {
                    name: '',
                    password: '',
                    email: ''
                };
                this.showLogin = false;
                this.showRegister = true;
            },
            login: function () {
                if (this.loginForm.name === "" || this.loginForm.password === "") {
                    alert("请输入用户名或密码")
                } else {
                    this.$store.dispatch('Login', this.loginForm).then(() => {
                        this.$router.push('/home')
                    }).catch(error => {
                        alert(error);
                    });
                }
            },
            register: function () {
                if (this.registerForm.name === "" || this.registerForm.email === "" || this.registerForm.password === "") {
                    alert("请输入用户名或密码")
                } else {
                    this.$store.dispatch('Register', this.registerForm).then(() => {
                        this.showRegister = false;
                        this.showLogin = true;
                    }).catch(error => {
                        alert(error);
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .login {
        text-align: center;
    }

    /*input {*/
    /*display: block;*/
    /*width: 250px;*/
    /*height: 40px;*/
    /*line-height: 40px;*/
    /*margin: 0 auto;*/
    /*margin-bottom: 10px;*/
    /*outline: none;*/
    /*border: 1px solid #888;*/
    /*padding: 10px;*/
    /*box-sizing: border-box;*/
    /*}*/

    p {
        color: red;
    }

    /*button {*/
        /*display: block;*/
        /*width: 250px;*/
        /*height: 40px;*/
        /*line-height: 40px;*/
        /*margin: 0 auto;*/
        /*border: none;*/
        /*background-color: #41b883;*/
        /*color: #fff;*/
        /*font-size: 16px;*/
        /*margin-bottom: 5px;*/
    /*}*/

    span {
        cursor: pointer;
    }

    span:hover {
        color: #41b883;
    }
</style>
