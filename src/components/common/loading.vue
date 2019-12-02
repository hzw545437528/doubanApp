<template>
    <div class="load">
        <div class="load-content" ref="rotate">
            <div>
                <span class="load-content-left"></span>
                <span class="load-content-right"></span>
            </div>
            <div class="load-wrap">
                <div class="load-icon"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "Load",
    data() {
        return {
            el: null,
            s: 0,
            timer: Function
        };
    },
    methods: {
        handleRotate() {
            this.s += 2;
            if (this.s >= 360) {
                this.s = 0;
            }
            (this.el as any).style.transform = "rotate(" + this.s + "deg)";
            this.timer = requestAnimationFrame(this.handleRotate) as any;
        }
    },
    created() {
        this.$nextTick(() => {
            this.el = this.$refs["rotate"] as any;
            this.timer = requestAnimationFrame(this.handleRotate) as any;
        });
    }
});
</script>
<style lang="scss">
.load {
    display: flex;
    justify-content: center;
    align-items: center;
}
.load-content {
    position: relative;
    // animation: rotate 5s ease-in-out;
    // -webkit-animation: rotate 5s ease-in-out;
    span {
        position: absolute;
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #999999;
        &.load-content-left {
            left: 0;
        }
        &.load-content-right {
            right: 0;
        }
    }
}
.load-wrap {
    width: 40px;
    height: 40px;
    overflow: hidden;
    position: relative;
    margin-top: 10px;
    .load-icon {
        position: absolute;
        width: 40px;
        height: 40px;
        top: -20px;
        border: 3px solid #999999;
        border-radius: 50%;
    }
}

// @keyframes rotate {
//     0% {
//         transform: rotate(0deg);
//     }
//     5% {
//         transform: rotate(18deg);
//     }
//     25% {
//         transform: rotate(90deg);
//     }
//     50% {
//         transform: rotate(180deg);
//     }
//     75% {
//         transform: rotate(270deg);
//     }
//     100% {
//         transform: rotate(360deg);
//     }
// }
</style>