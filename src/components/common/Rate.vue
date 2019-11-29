<template>
    <div class="rate_item">
        <div class="level-wrap">
            <i class="level-icon" v-for="(item, index) in 5" :key="index"></i>
        </div>
        <div class="level-wrap-active" :style="getWidth">
            <i class="level-icon" v-for="(item, index) in 5" :key="index"></i>
        </div>
        <span class="level">{{level.toFixed(1)}}</span>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
@Component
export default class Rate extends Vue {
    @Prop({
        type: Number,
        default: 0
    })
    level!: number;
    @Prop({
        type: Number,
        default: 5.5
    })
    percent!: number;

    get getWidth() {
        let width;
        if (this.level) {
            width = (this.level as number) * this.percent;
        } else {
            width = 0;
        }
        return {
            width: width + "px"
        };
    }
    created() {}
}
</script>
<style lang="scss">
.rate_item {
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    height: 11px;
    line-height: 11px;

    .level-wrap {
        &,
        &-active {
            width: 55px;
            .level-icon {
                display: inline-block;
                width: 11px;
                height: 11px;
            }
        }
        .level-icon {
            background: url("/img/my-icons/level-icon.png");
            background-size: cover;
        }
        &-active {
            position: absolute;
            width: 0px;
            max-width: 55px;
            overflow: hidden;
            white-space: nowrap;
            .level-icon {
                background: url("/img/my-active-icons/level-icon.png");
                background-size: cover;
            }
        }
    }
    .level {
        margin-left: 0.1rem;
    }
}
</style>