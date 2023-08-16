<script setup>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import {onMounted, ref} from "vue";

const audioList = ref([
    {
        name: '前前前世',
        artist: 'RADWIMPS',
        url: 'http://music.163.com/song/media/outer/url?id=1956590637.mp3',
        cover: 'http://p2.music.126.net/9oe1CvAUG724wNQh6BOgtA==/109951167254470935.jpg'
    }
])

onMounted(() => {
    const audio = localStorage.getItem('audio')
    if (audio === null) {
        localStorage.setItem("audio", JSON.stringify(audioList.value))
    } else {
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
    <div id="a-player"></div>
</template>