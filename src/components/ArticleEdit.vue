<template>
    <div class="content">
        <h1 v-if="this.$route.params.id">编辑文章</h1>
        <h1 v-else>创建新文章</h1>
        <div class="form-group">
            <label>Title</label>
            <input class="form-control" v-model="params.title">
        </div>
        <div class="form-group">
            <label>Category</label>
            <select class="form-control" v-model="params.category">
                <option value="">空</option>
                <option v-for="category in categories" v-bind:value="category.title">{{category.title}}</option>
            </select>
        </div>
        <div class="form-group">
            <label>Content</label>
            <textarea ref="markdownCreate" id="markdownCreate" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label>Published_at</label>
            <input type="date" class="form-control" v-model="params.published_at">
        </div>
        <button class="btn btn-primary btn-block" v-on:click="saveArticle()">发表文章</button>
    </div>
</template>

<script>
    import SimpleMDE from "simplemde/debug/simplemde"
    import "simplemde/dist/simplemde.min.css"
    import 'font-awesome/css/font-awesome.min.css'
    import 'github-markdown-css/github-markdown.css'
    import {articleEdit, articleSave} from "../api/article";

    export default {
        name: "ArticleEdit",
        data() {
            return {
                categories: {},
                params: {
                    title: '',
                    category: '',
                    content: '',
                    published_at: '',
                    id: ''
                },
                markdown: {}
            }
        },
        mounted() {
            this.simplemd();
            this.initData();
        },
        methods: {
            initData() {
                articleEdit(this.$route.params.id).then(response => {
                    this.categories = response.category;
                    let article = response.article;
                    if (article !== null) {
                        this.params.title = article.title;
                        this.params.content = article.content;
                        this.params.category = article.category;
                        this.params.published_at = this.getDate(new Date(article.published_at));
                        this.params.id = article.id;
                        this.markdown.value(this.params.content);
                    } else {
                        this.params.published_at = this.getDate(new Date());
                    }
                }).catch(error => {
                    alert(error);
                });
            },
            saveArticle() {
                this.params.content = this.markdown.value();
                articleSave(this.params).then(response => {
                    this.$router.push('/article/my');
                }).catch(error => {
                    alert(error);
                });
            },
            simplemd() {
                let that = this;
                this.markdown = new SimpleMDE({
                    autoDownloadFontAwesome: false,
                    element: that.$refs.markdownCreate,
                    status: false,
                    forceSync: true,
                    showIcons: ["code", "table"],
                    tabSize: 4,
                    promptURLs: true,
                    renderingConfig: {
                        codeSyntaxHighlighting: true
                    },
                    toolbar: ["bold", "italic", "|", 'link', "quote", "code", 'image', "|", 'unordered-list', 'ordered-list', "|", 'clean-block', 'table'
                        , 'horizontal-rule', 'preview', 'side-by-side', 'fullscreen', "strikethrough", "heading", 'heading-smaller', 'heading-bigger',
                        // 'heading-1', 'heading-2', 'heading-3',
                        'guide',
                        {
                            name: 'title1',
                            action: function customFunction(editor) {
                                var cm = editor.codemirror;
                                this._toggleHeading(cm, "title", 1);
                            },
                            className: 'glyphicon glyphicon-align-left',
                            title: 'title1'
                        },
                        {
                            name: 'title2',
                            action: function customFunction(editor) {
                                var cm = editor.codemirror;
                                _toggleHeading(cm, "title", 2);
                            },
                            className: 'glyphicon glyphicon-align-left',
                            title: 'title2'
                        },
                    ]
                });
                document.getElementsByClassName('editor-preview-side')[0].className += ' markdown-body'
            },
            _toggleHeading(cm, direction, size) {
                if (/editor-preview-active/.test(cm.getWrapperElement().lastChild.className))
                    return;

                var startPoint = cm.getCursor("start");
                var endPoint = cm.getCursor("end");
                var textNew = '';
                for (var i = startPoint.line; i <= endPoint.line; i++) {
                    (function (i) {
                        var text = cm.getLine(i);
                        textNew += text;
                    })(i);
                }
                if (size === 1) {
                    textNew === '' ? textNew = "标题文字\n====" : textNew += "\n====";
                } else if (size === 2) {
                    textNew === '' ? textNew = "标题文字\n----" : textNew += "\n----";
                }
                cm.replaceSelection(textNew);
                cm.focus();
            },
            getDate(time) {
                //格式化日，如果小于9，前面补0
                let day = ("0" + time.getDay()).slice(-2);
                //格式化月，如果小于9，前面补0
                let month = ("0" + (time.getMonth() + 1)).slice(-2);
                //拼装完整日期格式
                return time.getFullYear() + "-" + (month) + "-" + (day);
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-size: 18px;
        margin: 10px 0 15px;
    }
    .form-group > label {
        margin-bottom: 5px;
    }
</style>