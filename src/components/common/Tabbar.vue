<template>
    <ul class="tabbar">
        <router-link
            :to="item.href"
            tag="li"
            class="tabbar-item"
            v-for="(item, index) in tabbarInfo"
            :key="index"
            @click="changeRoute(item,index)"
        >
            <img v-if="$route.path == item.href" :src="'/img/my-active-icons/'+item.iconname" alt />
            <img v-else :src="'/img/my-icons/'+item.iconname" alt />
            <span>{{item.title}}</span>
        </router-link>
    </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
@Component
export default class Tabbar extends Vue {
    @Prop({
        type: Array,
        default: function() {
            return [
                {
                    title: "首页",
                    iconname: "home-icon.svg",
                    href: "/home"
                },
                {
                    title: "书影音",
                    iconname: "audios-icon.svg",
                    href: "/audios"
                },
                {
                    title: "小组",
                    iconname: "group-icon.svg",
                    href: "/group"
                },
                {
                    title: "市集",
                    iconname: "fair-icon.svg",
                    href: "/fair"
                },
                {
                    title: "我的",
                    iconname: "mine-icon.svg",
                    href: "/mine"
                }
            ];
        }
    })
    tabbarInfo!: Array<any>;
    @Provide()
    i: Number = 0;

    changeRoute(item: { href: String }, index: Number): void {
        this.i = index;
        this.$router.push(item.href as any);
    }
}
</script>
<style lang="scss">
.tabbar {
    display: flex;
    justify-content: space-between;
    .tabbar-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        color: #999999;
        background-color: #f7f7f7;
        height: 60px;
        font-size: 12px;
        &.router-link-active {
            color: #0e932e;
        }
        img {
            margin-top: 5px;
            width: 30px;
            height: 30px;
            box-sizing: border-box;
        }
    }
}
</style>