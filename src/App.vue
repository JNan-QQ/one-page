<script setup lang="ts">
import { loadFull } from "tsparticles"
import type { Engine } from 'tsparticles-engine'

const particlesInit = async (engine: Engine) => {
    await loadFull(engine)
}

const particlesLoaded = async (container: any) => {
    console.log('Particles container loaded', container)
}

</script>

<template>
    <Particles id="tsparticles"
               :particlesInit="particlesInit"
               :particlesLoaded="particlesLoaded"
               url="src/assets/s.json"
    />
    <div class="one">


    </div>
</template>

<style>
body {
    cursor: url(https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/default.cur), auto !important;
    background: radial-gradient(#313131, #0a0a0a);
}
</style>
