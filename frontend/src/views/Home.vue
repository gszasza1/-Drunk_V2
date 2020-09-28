<template>
    <div class="home">
        Drunk
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
@import '../variables.scss';
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 70px;
    text-transform: uppercase;
    color: $secondary;
    background: $primary;
    width: 100%;
    font-weight: 800;
}
</style>
