<template>
    <div class="panel">
        <slot name="tab"></slot>
        <div class="panel-tab" :class="{tabs: !onlyOneTab}">
            <div class="tab-wrap">
                <template v-if="!onlyOneTab">
                    <div
                        class="tab-item"
                        :class="{active: selectTab==index}"
                        v-for="(item, index) in tabInfo"
                        :key="index"
                        @click="handleSelectTab(item,index)"
                    >{{item}}</div>
                </template>
                <div class="tab-item active" v-else>{{tabInfo}}</div>
            </div>

            <div class="tab-item all" @click="showAll">
                <span>全部</span>
                <span v-if="total">{{total}}</span>
                <span>&gt;</span>
            </div>
        </div>
        <ul class="panel-content">
            <li class="panel-content-item" v-for="(item, index) in selectInfo" :key="index">
                <img :src="item.images.large" class="item-img" alt />
                <p class="item-name">{{item.title}}</p>
                <slot name="item-foot" :itemInfo="item">
                    <span
                        class="span-none"
                        v-if="hadlePubDate(item.mainland_pubdate)&&!item.rating.average"
                    >尚未上映</span>
                    <span class="span-none" v-else-if="!item.rating.average">暂无评分</span>
                    <Rate v-else :level="item.rating.average"></Rate>
                </slot>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide, Emit } from "vue-property-decorator";

@Component({
    components: {}
})
export default class Panel extends Vue {
    @Prop(Array)
    info!: Array<any>;
    @Prop(Array)
    info_!: Array<any>;
    @Prop({ type: Number, default: 0 }) total!: Number;
    @Prop({
        type: [Array, String]
    })
    tabInfo!: Array<any> | string;
    @Prop({
        type: Number,
        default: 0
    })
    selectTab!: number;
    get onlyOneTab() {
        let bool = typeof this.tabInfo === "string" ? true : false;
        return bool;
    }
    get selectInfo() {
        let info = this.info;
        if (this.selectTab) {
            info = this.info_;
        }
        return info;
    }
    handleSelectTab(item: string, index: number) {
        if (this.selectTab != index) {
            this.$emit("selectTab", item, index);
        }
    }
    hadlePubDate(pubdate: any): Boolean {
        let now = new Date();
        let relese = new Date(pubdate);
        return relese > now;
    }
    @Emit("show-all")
    showAll() {}
    created() {}
}
</script>
<style lang="scss">
.panel {
    padding: 10px;
    padding-top: 0;

    .panel-tab {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &.tabs {
            justify-content: flex-start;
            .active {
                border-bottom: 2px solid #333333;
            }
            .all {
                flex: 1;
            }
        }
        .tab-wrap {
            display: flex;
        }

        .tab-item {
            font-size: 20px;
            color: #999999;
            padding: 15px 0;
            height: 55px;
            margin-right: 10px;

            &.active {
                color: #333333;

                font-weight: 600;
            }
        }
        .all {
            font-size: 12px;
            color: #333333;

            text-align: right;
            line-height: 30px;
            margin-right: 0;
            span {
                margin: 3px;
                font-weight: 600;
            }
        }
    }
    .panel-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        &-item {
            width: 32%;
            margin: 10px 0 7px;
            .item- {
                &img {
                    width: 100%;
                    height: calc(100vw / 2);
                    max-height: 384px;
                    border-radius: 5px;
                }
                &name {
                    color: #333333;
                    margin: 2px 0 3px;
                    font-weight: 700;
                }
            }
        }
    }
}
</style>