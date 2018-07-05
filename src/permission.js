import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from "./utils/auth";

const whiteList = ['/login', '/register']; // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/home'});
            NProgress.done()
        } else {
            next();
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next();
        } else {
            next({path: '/login'});
            NProgress.done()
        }
    }
});

router.afterEach(() => {
    NProgress.done()
});