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
            default: function() {
                return {};
            }
        },
        containerHeight: [String, Number]
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

            (this.scroll as any).on("scroll", () => {
                this.$emit("get-height");
                let el: any = this.$refs["wrapper"];
                let height: any = parseFloat(window.getComputedStyle(el)
                    .height as any);

                let scrollHeight = (this.scroll as any).y - height + 62;

                if (
                    Math.abs(scrollHeight) >=
                    parseFloat(this.containerHeight as any)
                ) {
                    this.$emit("show-reviews", true);
                } else {
                    this.$emit("show-reviews", false);
                }

                if (
                    (this.scroll as any).y <=
                    -parseFloat(this.containerHeight as any)
                ) {
                    // (this.scroll as any).disable();
                    this.$emit("scroll-reviews");
                }
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