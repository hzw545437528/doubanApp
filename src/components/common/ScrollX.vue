<template>
    <div class="wrapperX" ref="wrapperX">
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import BScroll from "better-scroll";
export default Vue.extend({
    name: "ScrollX",
    data() {
        return {
            scroll: null
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs["wrapperX"], {
                click: true,
                scrollX: true,
                scrollY: false
            });
        });
    }
});
</script>
<style lang="scss">
.wrapperX {
    width: 100%;
    position: relative;
    overflow: hidden;
    & > div {
        float: left;
    }
}
</style>