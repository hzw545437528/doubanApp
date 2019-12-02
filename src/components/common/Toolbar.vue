<template>
    <ul class="toolbar">
        <li
            class="toolbar-item"
            :class="{active: index==i}"
            v-for="(item, index) in toolbarInfo"
            :key="index"
            @click="changeTab(item,index)"
        >{{item}}</li>
    </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide, Emit } from "vue-property-decorator";

@Component
export default class Toolbar extends Vue {
    @Prop({
        type: Array,
        default: function() {
            return ["动态", "推荐"];
        }
    })
    toolbarInfo!: Array<any>;
    @Prop({
        type: Number,
        default: 0
    })
    selectTab!: Number;
    @Provide()
    i: Number = 0;

    @Emit("select-tab")
    changeTab(item: { href: String }, index: Number) {
        this.i = index;
        // this.$router.push(item.href as any);
        return this.i;
    }
    created() {
        if (this.selectTab) {
            this.i = this.selectTab;
        }
    }
}
</script>
<style lang="scss">
.toolbar {
    display: flex;
    // justify-content: space-between;
    // position: fixed;
    width: 100vw;
    top: 45px;
    left: 0;
    border-bottom: 1px solid #dbd9d9;
    height: 41px;
    .toolbar-item {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999999;
        background-color: #ffffff;
        height: 40px;
        outline: none;
    }
}
</style>