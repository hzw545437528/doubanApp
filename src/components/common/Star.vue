<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        with="190"
        height="180"
        ref="svg"
        viewBox="0 0 190 180"
    >
        <polygon points="100,0 160,180 10,60 190,60 40,180" :style="style" />
    </svg>
</template>
<script lang="ts">
import { Component, Vue, Provide, Prop, Emit } from "vue-property-decorator";
@Component
export default class Star extends Vue {
    @Prop({
        type: Number,
        default: 9
    })
    size!: number;

    @Prop({
        type: String,
        default: "#e9e9e9"
    })
    color!: string;

    get width() {
        let width = (9.5 * this.size) / 9;
        this.emit(width);
        return width;
    }
    get style() {
        return {
            fill: this.color,
            stroke: this.color,
            "stroke-width": 1
        };
    }

    @Emit("set-width")
    emit(width: any) {}

    mounted() {
        this.$nextTick(() => {
            (this.$refs["svg"] as any).style.width = this.width;
            (this.$refs["svg"] as any).style.height = this.size;
        });
    }
}
</script>
<style lang="scss">
svg {
    color: #fc9816;
}
</style>