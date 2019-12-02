<template>
    <div class="rate-star">
        <div>
            <star :key="4" :color="color" :size="size" @set-width="setWidth"></star>
            <star v-for="(item, index) in 4" :key="index" :color="color" :size="size"></star>
        </div>
        <div class="rate-star-active" ref="active">
            <div v-for="(item, index) in showValue" :key="index + 5">
                <star :color="color1" :size="size"></star>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
@Component
export default class RateStar extends Vue {
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
    @Prop({
        type: String,
        default: "#fc9816"
    })
    color1!: string;
    @Prop({
        type: [Number, String],
        default: 10
    })
    max!: number | string;
    @Prop({
        type: [Number, String],
        default: 0
    })
    min!: number | string;
    @Prop({
        type: [Number, String],
        default: 9
    })
    value!: number | string;
    @Provide() divWidth: any = 0;
    @Provide() width: any = 0;
    get showValue() {
        let num: any = 0;
        num = ((this.value as number) / (this.max as number)) * 5;
        let preNum = num;
        num = Math.ceil(num);
        if (preNum == num) {
            this.divWidth = this.width;
        } else {
            this.divWidth = (num - preNum) * this.width;
        }
        let el = this.$refs["active"];

        this.$nextTick(() => {
            if (el) {
                // (el as any).lastChild.style.height = this.width + "px";
                (el as any).lastChild.style.width = this.divWidth + "px";
            }
        });
        return num;
    }
    setWidth(width: any) {
        this.width = width;
    }
}
</script>
<style lang="scss">
.rate-star {
    position: relative;

    & div {
        display: flex;
        align-items: center;
        height: 100%;
    }
}
.rate-star-active {
    position: absolute;
    display: flex;
    align-items: center;

    left: 0;
    top: 0;
    & > div:last-child {
        overflow: hidden;
    }
}
</style>