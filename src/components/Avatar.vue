<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="text-center">
                <div id="validation-errors"></div>
                <croppa v-model="myCroppa">
                    <img slot="initial" :src="user.avatar"/>
                </croppa>
                <div class="text-center">
                    <button type="button" class="btn btn-success avatar-button" v-on:click="uploadCroppedImage">上传新的头像
                    </button>
                </div>

                <div class="span5">
                    <div id="output" style="display:none">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {avatarUpdate} from "../api/user";

    export default {
        name: 'avatar',
        data() {
            return {
                myCroppa: {}
            }
        },
        computed: {
            user: function () {
                return this.$store.state.user.user;
            },
        },
        methods: {
            uploadCroppedImage() {
                this.myCroppa.img.setAttribute("crossOrigin", 'Anonymous');
                avatarUpdate(this.myCroppa.generateDataUrl('image/jpeg')).then(response => {
                    //todo:导航条不刷新
                    this.$router.push('/');
                }).catch(error => {
                    alert(error);
                });
            }
        }
    }
</script>

