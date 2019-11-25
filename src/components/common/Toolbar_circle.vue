<template>
    <ul class="toolbar-circle">
        <li class="circle-item" v-for="(item, index) in info" :key="index">
            <div class="img" :style="src(item.img)"></div>
            <span>{{item.title}}</span>
        </li>
    </ul>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Toolbar_circle extends Vue {
    @Prop({
        type: Array,
        default: function() {
            return [
                {
                    title: "找电影",
                    img: "searchicon-forAudios.png"
                },
                {
                    title: "豆瓣榜单",
                    img: "rank-icon.png"
                },
                {
                    title: "豆瓣猜",
                    img: "guess-icon.png"
                },
                {
                    title: "豆瓣片单",
                    img: "movie-icon.png"
                }
            ];
        }
    })
    info!: Array<{ title: String; img: String }>;

    src(item: any): any {
        return {
            "background-image": "url('/img/my-icons/" + item + "')"
        };
    }
}
</script>
<style lang="scss">
.toolbar-circle {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    .circle-item {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex: 1;
        &:nth-child(1) {
            .img {
                background-color: rgb(42, 107, 163);
            }
        }
        &:nth-child(2) {
            .img {
                background-color: rgb(250, 152, 23);
            }
        }
        &:nth-child(3) {
            .img {
                background-color: rgb(50, 204, 3);
            }
        }
        &:nth-child(4) {
            .img {
                background-color: rgb(168, 12, 240);
            }
        }
        .img {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            width: 0.72rem;
            height: 0.72rem;
            margin-bottom: 10px;
            background: center no-repeat;
            background-size: 0.32rem 0.32rem;
        }
        @media screen and (min-width: 768px) {
            .img {
                width: 73px;
                height: 73px;
                background-size: 32px 32px;
            }
        }
    }
}
</style>