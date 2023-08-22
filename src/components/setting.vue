<script setup>

import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import APlayer from "aplayer";

const isActive = ref(false)
const isHover = ref(false)
const isUpload = ref(false)
const uploadMode = ref("")

const webList = ref([])

const colors = () => {
    const color = ["#61dafb", "#fcdc00", "#d6d6d6", "#ff449f"]
    return color[Math.floor(Math.random() * color.length)]
}

// 上传json文件
const uploadJson = (jsonType) => {
    isUpload.value = true
    uploadMode.value = jsonType
}

async function beforeUpload(file) {
    const f = new FileReader()
    f.readAsText(file, 'UTF-8')
    f.onload = (e) => {
        // 读取文件内容
        const fileString = e.target.result
        if (uploadMode.value === "music") {
            localStorage.setItem("audio", fileString)
        } else if (uploadMode.value === "web") {
            localStorage.setItem("web", fileString)
        }
        ElMessage.success("本地上传成功,请刷新查看")
    }
    return false
}

onMounted(() => {
    const web = localStorage.getItem('web')
    if (web !== null) {
        localStorage.setItem("web", JSON.stringify(audioList.value))
        webList.value = JSON.parse(web)
    }
})

</script>

<template>
    <div id="circularMenu" class="circular-menu" :class="{active:isActive}">
        <el-button circle class="circular-btn" @click="isActive=!isActive" size="large">
            <el-icon size="24">
                <i-ep-plus/>
            </el-icon>
        </el-button>
        <menu class="items-wrapper">
            <el-icon size="30" class="menu-item" :style="{'--neon-color':colors()}" @click="uploadJson('music')">
                <i-solar-music-notes-broken/>
            </el-icon>
            <el-icon size="30" class="menu-item" :style="{'--neon-color':colors()}">
                <i-ep-setting/>
            </el-icon>
            <el-icon size="30" class="menu-item" :style="{'--neon-color':colors()}"  @click="uploadJson('web')">
                <i-carbon-area-custom/>
            </el-icon>
        </menu>
    </div>

    <div class="web-list" :class="{hover:isHover}" @mouseover="isHover=true" @mouseleave="isHover=false"
         v-if="webList.length>0">
        <a :href="item.url" target="_blank" v-for="item in webList" :title="item.name">
            <img :src="item.cover" :alt="item.name"/>
        </a>
    </div>

    <el-dialog v-model="isUpload" :title="uploadMode" destroy-on-close center width="400px" modal-class="upload-file">
        <el-upload drag :auto-upload="true" accept=".json" :before-upload="beforeUpload" :show-file-list="false">
            <el-icon class="el-icon--upload">
                <i-ep-upload-filled/>
            </el-icon>
            <template #tip>
                <div class="el-upload__tip">
                    点击
                    <a :href="uploadMode==='music'?'/src/assets/json/music.json':'/src/assets/json/web.json'"
                       :download="uploadMode">
                        此处
                    </a>
                    获取json文件模板
                </div>
            </template>
        </el-upload>
    </el-dialog>
</template>

<style scoped lang="less">
.circular-menu {
    position: fixed;
    bottom: 1rem;
    right: 1rem;

    .menu-item {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        z-index: -1;
        color: hsl(0, 0%, 100%);
        background-color: hsla(0, 0%, 0%, 0);
        transition: transform .3s ease, background .2s ease;
        border-radius: 50%;
        border: 1px solid var(--neon-color);

        svg {
            border-radius: 50%;
            padding: 0.2rem;

            :deep(g,path) {
                fill: var(--neon-color);
            }


        }

        :hover {
            color: #06283d;
            background-color: var(--neon-color);
            box-shadow: 0 0 30px var(--neon-color), 0 0 50px var(--neon-color), 0 0 100px var(--neon-color);
            transition: 0s;
        }

    }

}

.circular-menu.active {
    .circular-btn {
        transform: rotate(-45deg);
    }

    .menu-item {
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .menu-item:nth-child(1) {
        transform: translate3d(1rem, -4rem, 0);
    }


    .menu-item:nth-child(2) {
        transform: translate3d(-2.9rem, -2.9rem, 0);
    }

    .menu-item:nth-child(3) {
        transform: translate3d(-4rem, 1rem, 0);
    }
}

.upload-file {
    box-shadow: var(--el-box-shadow-light);
}

.web-list {
    width: 10rem;
    height: 20rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 25px;
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
    backdrop-filter: saturate(180%) blur(20px);

    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    align-content: flex-start;
    align-items: center;

    padding: 0.1rem;

    position: fixed;
    z-index: 1;
    top: 25%;
    right: -9.5rem;

    img {
        width: 3rem;
        height: 3rem;
    }

}

.web-list.hover {
    animation: lightSpeedInRight;
    animation-duration: 1s;
    right: 0;
}


</style>