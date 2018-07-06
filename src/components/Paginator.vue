<template>
    <div class="page-bar">
        <ul>
            <li v-if="currentPage>1">
                <a v-on:click="pageClick(--currentPage)">上一页</a>
            </li>
            <li v-else>
                <a class="banclick">上一页</a>
            </li>
            <li v-for="index in indexs" v-bind:class="{ 'active': currentPage === index}">
                <a v-on:click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="currentPage!==lastPage">
                <a v-on:click="pageClick(++currentPage)">下一页</a>
            </li>
            <li v-if="currentPage === lastPage">
                <a class="banclick">下一页</a>
            </li>
            <li><a>共<i>{{lastPage}}</i>页</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Paginator',
        props: ['current', 'last'],
        data() {
            return {
                currentPage: this.current,
                lastPage: this.last,
                showPage: 5
            }
        },
        computed: {
            indexs: function () {
                let left = 1, right = this.lastPage, arr = [];
                if (this.lastPage >= this.showPage) {
                    if (this.showPage - 2 < this.currentPage < this.lastPage - 2) {
                        left = this.currentPage - 2;
                        right = this.currentPage + 2;
                    } else if (this.currentPage <= this.showPage - 2) {
                        left = 1;
                        right = this.showPage;
                    } else {
                        right = this.lastPage;
                        left = this.lastPage - this.showPage + 1
                    }
                }

                while (left <= right) {
                    arr.push(left);
                    left++
                }
                return arr
            }

        },
        methods: {
            btnClick: function (data) {//页码点击事件
                if (data !== this.currentPage) {
                    this.currentPage = data;
                    this.$emit('change', this.currentPage);
                }
            },
            pageClick: function () {
                this.$emit('change', this.currentPage);
            }
        },
        watch: {//监听
            current(val) {
                this.currentPage = val;
            },
            last(val) {
                this.lastPage = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .page-bar {
        /*margin: 40px;*/
        margin-top: 2em;
        margin-bottom: 5em;
    }

    ul, li {
        margin: 0px;
        padding: 0px;
    }

    li {
        list-style: none
    }

    .page-bar li:first-child > a {
        margin-left: 0;
    }

    .page-bar a {
        border: 1px solid #ddd;
        text-decoration: none;
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #555;
        cursor: pointer;
    }

    .page-bar a:hover {
        background-color: #eee;
    }

    .page-bar a.banclick {
        cursor: not-allowed;
    }

    .page-bar .active a {
        color: #000;
        cursor: default;
        background-color: #e6e6e6;
        border-color: #e6e6e6;
    }

    .page-bar i {
        font-style: normal;
        color: #d44950;
        margin: 0 4px;
        font-size: 16px;
    }
</style>
