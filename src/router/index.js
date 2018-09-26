
import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import ArticleList from '@/components/ArticleList'
import BasicLayout from '@/layouts/BasicLayout'
import MyArticleList from '@/components/MyArticleList'
import ArticleDetail from '@/components/ArticleDetail'
import AvatarUpdate from '@/components/Avatar'
import ArticleEdit from '@/components/ArticleEdit'
import Login from '@/components/Login'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            // name: 'home',
            component: App,
            children: [
                {
                    path: 'article/',
                    // name: 'Article',
                    component: BasicLayout,
                    children: [
                        {path: 'list', name: 'ArticleList', component: ArticleList},
                        {path: 'create', name: 'ArticleCreate', component: ArticleEdit},
                        {path: 'edit/:id', name: 'ArticleEdit', component: ArticleEdit},
                        {path: 'my', name: 'MyArticleList', component: MyArticleList},
                        {path: ':id', name: 'ArticleDetail', component: ArticleDetail},
                        {path: '', redirect: {name: 'ArticleList'}}
                    ]
                },
                {
                    path: 'user/',
                    component: BasicLayout,
                    children: [
                        {path: 'avatar', name: 'AvatarUpdate', component: AvatarUpdate},
                    ]
                },
                {path: 'home', redirect: {name: 'ArticleList'}},
                {path: 'login', name: 'Login', component: Login},
                {path: '', redirect: {name: 'ArticleList'}}
            ]
        },
    ]
})