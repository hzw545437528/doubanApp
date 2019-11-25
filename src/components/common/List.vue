<template>
    <div class="list" ref="wrapper">
        <Scroll>
            <template #default>
                <div class="list-item" v-for="(item, index) in info" :key="index">
                    <img :src="item.images.large" alt />
                    <div class="list-iteminfo">
                        <h3 class="list-iteminfo-name">{{item.title}}</h3>
                        <Rate
                            class="rate"
                            :percent="5.2"
                            :level="item.rating.average"
                            v-if="item.rating.average"
                        ></Rate>
                        <span class="span-none" v-else-if="hasPub">暂无评分</span>
                        <p
                            class="list-iteminfo-extra"
                            :class="{'extra-upcoming': !hasPub}"
                        >{{itemExtra(item)}}</p>
                    </div>
                    <slot name="list-right" :info="item"></slot>
                </div>
            </template>
        </Scroll>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import BScroll from "better-scroll";
@Component
export default class List extends Vue {
    @Prop(Array) info!: Array<any>;
    @Prop({
        type: Boolean,
        default: true
    })
    hasPub!: boolean;
    @Provide() scroll: any = null;
    itemExtra(item: any) {
        let str = "",
            pubaddress = "",
            genres = "",
            directors = "",
            casts = "",
            i = 0,
            year = item.year;
        for (let el of item.pubdates) {
            if (
                el.includes(year) &&
                !el.includes("电影节") &&
                !el.includes("映")
            ) {
                pubaddress =
                    pubaddress + el.split("(")[1].replace(")", "") + " ";
            }
            if (!pubaddress && !el.includes("电影节") && !el.includes("映")) {
                pubaddress =
                    pubaddress + el.split("(")[1].replace(")", "") + " ";
            }
        }
        for (let el of item.genres) {
            genres = genres + el + " ";
        }
        for (let el of item.directors) {
            directors = directors + el.name + " ";
        }
        for (let el of item.casts) {
            if (i == 2) {
                break;
            }
            casts = casts + el.name + " ";
            i++;
        }
        str = `${year} / ${pubaddress} / ${genres} / ${directors} / ${casts}`;
        return str;
    }
    mounted() {
        // this.$nextTick(() => {
        //     this.scroll = new BScroll(this.$refs["wrapper"], { click: true });
        // });
    }
}
</script>
<style lang="scss">
@import "../../style/mixin.scss";
.list {
    height: 100%;
    padding-left: 15px;
    .list-item {
        position: relative;
        padding: 10px 0;
        display: flex;
        img {
            width: 1.5rem;
            height: 2.05rem;
            max-width: 154px;
            max-height: 210px;
            border-radius: 5px;
        }
        &::after {
            @include border1px;
        }
        .list-iteminfo {
            width: 52%;
            max-width: 392px;
            padding: 0 20px 0 15px;
            border-right: 1px dashed #d2d2d2;
            .rate,
            .span-none {
                margin: 5px 0;
            }
            .list-iteminfo-extra {
                margin: 0;
                font-size: 10px;
                color: #999999;
                &.extra-upcoming {
                    margin: 10px 0;
                }
            }
        }
        .list-iteminfo-name {
            margin: 0;
            font-size: 17px;
            color: #2d2d2d;
        }
    }
}
.rate_item {
    .level-icon {
        width: 9px !important;
        height: 9px !important;
        margin-right: 2px;
    }
    .level {
        font-size: 10px;
    }
}
</style>