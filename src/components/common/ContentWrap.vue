<template>
    <div class="content-wrap" id="scrollwrap" ref="scrollwrap">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BScroll from "better-scroll";
@Component
export default class ContentWrap extends Vue {
    mounted() {
        const scroll = new BScroll(this.$refs["scrollwrap"], { click: true });
    }
    created() {}
}
</script>
<style lang="scss">
.content-wrap {
    height: calc(100vh - 146px);
    overflow: hidden;
}

.isSafari {
    height: calc(100vh - 218px);
}
</style>