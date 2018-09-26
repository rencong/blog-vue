// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Croppa from 'vue-croppa'
import App from './App'
import router from './router'
import store from './store'
import './permission'
import './bower_components/github-markdown-css/github-markdown.css'
import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/bootstrap.css'
import 'vue-croppa/dist/vue-croppa.css'
import './assets/js/bootstrap'
import './assets/js/jquery-3.2.1.min'

Vue.use(Croppa);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    // store,
    router,
    store,
    components: {App},
    template: '<App/>'
});


Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
});
