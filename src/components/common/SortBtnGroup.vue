<template>
    <div class="sort btns">
        <span :class="{active: sort==0}" @click="sort = 0">热门</span>
        <span :class="{active: sort==1}" @click="sort = 1">最新</span>
        <span class="sort-active" :class="{left:sort==0,right:sort==1}"></span>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
@Component
export default class SortBtnGroup extends Vue {
    @Provide() sort: number = 0;
}
</script>
<style lang="scss" scoped>
.sort {
    span {
        position: relative;
        z-index: 2;
        font-weight: 400;
        &.active {
            color: #333333;
        }
    }
    span:nth-child(1) {
        margin-right: 10px;
    }
    span:nth-child(2) {
        margin-left: 10px;
    }
    position: relative;
    background-color: #e6e5e5;
    color: #999999;
    .sort-active {
        position: absolute;
        display: block;
        border-radius: 20px;
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #ffffff;
        z-index: 1;
        transition: left 0.2s ease-in-out;
        &.left {
            left: 0;
            border-right: 1px solid rgb(238, 237, 237);
        }
        &.right {
            left: 50%;
            border-left: 1px solid rgb(238, 237, 237);
        }
    }
}
.btns {
    border-radius: 20px;
    border: 1px solid rgb(238, 237, 237);
    padding: 5px 10px;
}
</style>
