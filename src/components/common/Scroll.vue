<template>
    <div class="wrapper" ref="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import BScroll from "better-scroll";
export default Vue.extend({
    name: "Scroll",
    data() {
        return {
            scroll: null
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs["wrapper"], { click: true });
        });
    }
});
</script>
<style lang="scss">
.wrapper {
    height: 100%;
    position: relative;
}
</style>