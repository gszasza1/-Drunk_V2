<template>
    <div id="app">
        <md-toolbar md-elevation="0">
            <md-button to="/registration" class="md-primary"
                >Regisztráció</md-button
            >
            <md-button to="/login" class="md-primary">Bejelentkezés</md-button>
        </md-toolbar>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
#app {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    > .content {
        flex: 1;
        display: flex;
        > * {
            flex: 1;
        }
    }
}
</style>
