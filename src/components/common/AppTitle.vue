<template>
    <div class="app-title">
        <i class="back-btn" @click="$router.go(-1)"></i>
        <span class="title">{{title}}</span>
        <slot name="apptitle-right">
            <div class="share">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </slot>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AppTItle extends Vue {
    @Prop(String) title!: string;
    @Prop(Array) toolbar!: Array<any>;
}
</script>
<style lang="scss">
.app-title {
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 15px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 45px;
    .back-btn {
        display: inline-flex;
        width: 24px;
        height: 20px;
        background: url("/img/my-icons/left-icon.png") center;
        background-size: cover;
    }
    .title {
        font-size: 18px;
        color: #333333;
        font-weight: 700;
    }
    .share {
        width: 24px;
        span {
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: #333333;
            border-radius: 50%;
            margin-right: 4px;
        }
    }
}
</style>