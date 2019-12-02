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
    props: {
        options: {
            type: Object,
            default: {}
        },
        containerHeight: Number
    },
    data() {
        return {
            scroll: null
        };
    },
    methods: {
        scrollConfig(key: any, value: any) {
            console.log(key, value);
            (this.scroll as any)[key] = value;
        }
    },
    mounted() {
        this.$nextTick(() => {
            let options = {
                click: true
            };
            options = Object.assign(options, this.options);
            this.scroll = new BScroll(this.$refs["wrapper"], options);
            // (this.scroll as any).on("pullingUp", () => {
            //     console.log(1);
            //     this.$emit("show-reviews", true);
            //     (this.scroll as any).finishPullUp();
            // });
            (this.scroll as any).on("scroll", () => {
                console.log((this.scroll as any).y);
            });
        });
    },
    updated() {}
});
</script>
<style lang="scss">
.wrapper {
    height: 100%;
    overflow: hidden;
    position: relative;
}
</style>