<template>
    <div id="app" :class="{isSafari: $store.state.isSafari}">
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class App extends Vue {
    created() {
        if (
            /Safari/.test(navigator.userAgent) &&
            !/Chrome/.test(navigator.userAgent)
        ) {
            localStorage.setItem("isSafari", "1");
        } else {
            localStorage.setItem("isSafari", "0");
        }
    }
}
</script>
<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100vh;
}
</style>
