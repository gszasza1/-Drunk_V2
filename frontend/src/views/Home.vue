<template>
    <div class="home">
        <md-app>
            <img alt="Vue logo" src="../assets/logo.png" />
            <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        </md-app>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
    components: {
        HelloWorld
    }
})
export default class Home extends Vue {}
</script>
