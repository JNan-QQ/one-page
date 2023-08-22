<script setup>
import {onMounted, ref} from "vue";
import {bingImgUrl} from "@/api/bing.js";
import axios from "axios";
import Aplayer from "@/components/aplayer.vue";
import Setting from "@/components/setting.vue";

const backgroundImg = ref("")
const mouseOver = ref(false)
const oneNote = ref([])
const isPhone = ref(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))

function bai(flg) {
    bingImgUrl(flg).then(r => {
        backgroundImg.value = `url(${r})`
    })
}

// 获取并监听用户设备大小/类型
onMounted(() => {
    window.onresize = () => {
        return (() => {
            let flg = false
            if (document.body.clientHeight > document.body.clientWidth * 1.5) {
                flg = true
            }

            if (isPhone.value !== flg) {
                bai(isPhone.value)
                isPhone.value = flg
            }
        })()
    }

    // 加载背景图片
    bai(isPhone.value)

    // 加载一言
    axios.get("https://v1.hitokoto.cn/?c=a&c=b&c=c").then(r => {
        oneNote.value = [r.data['hitokoto'], r.data['from']]
    })
})

</script>

<template>
    <div class="main" :style="{backgroundImage:backgroundImg}">
        <div class="pc-main animate__animated animate__zoomIn">
            <div class="logo-btn">
                <div class="logo logo-img" @mouseover="mouseOver=true" @mouseleave="mouseOver=false">
                    <img class="logo png" :class="{over:mouseOver}"
                         src="@/assets/images/logo.png" alt=""/>
                </div>
                <div class="logo-text logo">
                    <h2>
                        Creativity
                    </h2>
                    <p>
                        2023 · 挑战
                    </p>
                </div>
            </div>
            <h1 class="title">JiangNan</h1>
            <p class="info-msg">Living with challenges</p>
            <hr>
            <p id="description">
                {{ oneNote[0] }}
                <br>
                -「<strong>{{ oneNote[1] }}</strong>」
            </p>
            <div class="item-btn">
                <a href="./hexo">
                    <el-button round>
                        <el-icon class="el-icon--left">
                            <i-logos-hexo/>
                        </el-icon>
                        HEXO
                    </el-button>
                </a>
                <a href="./alist">
                    <el-button round>
                        <el-icon class="el-icon--left">
                            <i-logos-base/>
                        </el-icon>
                        ALIST
                    </el-button>
                </a>
                <a href="./#">
                    <el-button round>
                        <el-icon class="el-icon--left">
                            <i-heroicons-outline-translate/>
                        </el-icon>
                        关于
                    </el-button>
                </a>
            </div>
        </div>
    </div>
    <Aplayer></Aplayer>
    <Setting></Setting>
</template>

<style scoped lang="less">
.main {
    width: 100%;
    height: 100%;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩 */
    background-size: center / cover;
    background-color: rgb(102, 102, 102);
    display: flex;
    justify-content: center;
    align-items: center;

    .pc-main {
        width: 38.75rem;
        margin: auto;

        .logo-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 7.5rem;


            .logo {
                border-radius: 50%;
                box-shadow: var(--el-box-shadow-lighter);
                width: 7.5rem;
                height: 7.5rem;
            }

            .png {
                @keyframes rotateImage {
                    from {
                        transform: rotate(0deg)
                    }
                    to {
                        transform: rotate(360deg)
                    }
                }
                animation: rotateImage 10s linear infinite;
            }

            .logo-text {
                background-color: #625f5f;
                color: white;

                h2 {
                    position: relative;
                    font-size: 1.125rem;
                    margin: 0 auto;
                    padding-top: 2.5rem;
                    height: 2.1875rem;
                    text-shadow: 0 0 1px white, 0 1px 2px rgba(0, 0, 0, 0.3);
                }

                p {
                    color: #bbb;
                    padding: 0;
                    font-style: italic;
                    font-size: 0.625rem;
                }

            }

            .logo-img {

                position: fixed;
                perspective: 20rem;
                transform-style: preserve-3d;
                z-index: 10;

                img.over {
                    transform-origin: 0 50%;
                    animation: turn 0.5s cubic-bezier(0.4, 0, 1, 1) 100ms 1 forwards alternate;
                    @keyframes turn {
                        from {
                            transform: rotateY(0);
                        }
                        to {
                            transform: rotateY(-180deg);
                        }
                    }
                }

            }
        }

        h1.title {
            font-family: "Old English Text MT", "Engravers' Old English BT", "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
            margin: 0 0 5px 0;
            font-size: 2.5em;
            color: white;
        }

        p.info-msg {
            font-family: "ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
            font-size: 1.2em;
            font-weight: lighter;
            letter-spacing: 3px;
            color: #e7dede;;
            -webkit-font-smoothing: antialiased;
        }

        #description {
            color: white;
        }

        .item-btn {
            margin-top: 2.625rem;
            display: flex;
            justify-content: center;
            align-items: center;
            a{
                margin: 0 0.5rem;
            }
        }

    }

    p {
        line-height: 1.7em;
    }

}

@font-face {
    font-family: "Engravers' Old English BT";
    src: url("@/assets/fonts/ysz.eot");
    /* IE9*/
    src: url("@/assets/fonts/ysz.eot?#iefix") format("embedded-opentype"),
        /* IE6-IE8 */ url("@/assets/fonts/ysz.woff2") format("woff2"),
        /* chrome firefox */ url("@/assets/fonts/ysz.woff") format("woff"),
        /* chrome firefox */ url("@/assets/fonts/ysz.ttf") format("truetype")
    /* chrome firefox opera Safari, Android, iOS 4.2+*/
}
</style>
