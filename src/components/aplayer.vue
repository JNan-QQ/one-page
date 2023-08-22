<script setup>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import {onMounted, ref} from "vue";

const audioList = ref([])

onMounted(() => {
    const audio = localStorage.getItem('audio')
    if (audio !== null) {
        audioList.value = JSON.parse(audio)
    }
    new APlayer({
        container: document.getElementById('a-player'),
        fixed: true,
        audio: audioList.value
    })
})


</script>

<template>
    <div id="a-player" v-show="audioList.length>0"></div>
</template>