// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './permission'
import './bower_components/github-markdown-css/github-markdown.css'
import './assets/css/common.css'


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
