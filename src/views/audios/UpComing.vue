<template>
    <div class="upcoming">
        <div class="upcoming-head">
            <div class="upcoming-headname">
                影视
                <span>{{total}}</span>
            </div>
            <div class="upcoming-headsort btn">
                <span :class="{active: sort==0}" @click="sort = 0">时间</span>
                <span :class="{active: sort==1}" @click="sort = 1">热度</span>
                <span class="sort-active" :class="{left:sort==0,right:sort==1}"></span>
            </div>
            <div class="upcoming-headtime btn">
                <span>上映时间</span>
                <i class="icon-down"></i>
            </div>
        </div>
        <div class="upcoming-main-container" ref="wrapper">
            <div>
                <template v-if="sort == 0">
                    <div v-for="(item,key, index) in sortByTime" :key="index">
                        <div class="list-head">{{getDate(key)}}{{getDay(key)}}</div>
                        <List :info="item" :hasPub="false">
                            <template #list-right="{info}">
                                <ListFavor :extra="info.collect_count"></ListFavor>
                            </template>
                        </List>
                    </div>
                </template>
                <template v-else>
                    <div v-for="(item, index) in sortByHot" :key="index">
                        <div
                            class="list-head"
                        >{{getDate(item.mainland_pubdate)}}{{getDay(item.mainland_pubdate)}}</div>
                        <List :info="[item]" :hasPub="false">
                            <template #list-right="{info}">
                                <ListFavor :extra="info.collect_count"></ListFavor>
                            </template>
                        </List>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import BScroll from "better-scroll";
import ListFavor from "../../components/common/ListFavor.vue";
export default Vue.extend({
    name: "Upcoming",
    data() {
        return {
            sort: 0,
            scroll: null,
            sortByTime: {},
            sortByHot: [],
            chooseSort: 0
        };
    },
    props: {
        info: Array,
        total: Number
    },
    components: {
        ListFavor
    },
    methods: {
        handleSortByTime() {
            let obj: any = {};
            this.info.forEach((item: any, index: any) => {
                if (!obj[item.mainland_pubdate]) {
                    obj[item.mainland_pubdate] = [item];
                } else {
                    obj[item.mainland_pubdate].push(item);
                }
            });
            this.sortByTime = Object.assign({}, this.sortByTime, obj);
            // console.log(this.sortByTime);
        },
        hadnleSortByHot() {
            console.log(this.info);
            let sortByHot: any = this.info;

            sortByHot.sort((pre: any, curr: any) => {
                return curr.collect_count - pre.collect_count;
            });
            this.sortByHot = sortByHot;
            console.log(sortByHot);
        },
        getDate(date: any) {
            let d = "";
            let arr = date.split("-");
            d = arr[1] + "月" + arr[2] + "日，";
            return d;
        },
        getDay(date: any) {
            let time = new Date(date);
            let day = time.getDay();
            return "星期" + "日一二三四五六".charAt(day);
        }
    },
    watch: {
        info() {
            this.handleSortByTime();
        }
    },
    created() {
        this.handleSortByTime();
        this.hadnleSortByHot();
    },
    mounted() {
        this.$nextTick(() => {
            this.scroll = new (this as any).$BScroll(this.$refs["wrapper"], {
                click: true
            });
        });
    }
});
</script>
<style lang="scss">
.upcoming {
    height: 100%;
    position: relative;
}
.upcoming-head {
    position: relative;
    z-index: 999;
    display: flex;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    font-size: 12px;
    font-weight: 700;
    background-color: #ffffff;
    .upcoming-headname {
        flex: 1;
        span {
            color: #999999;
            font-weight: 400;
        }
    }
    .upcoming-headsort {
        span {
            position: relative;
            z-index: 2;
            font-weight: 400;
            &.active {
                color: #333333;
                font-weight: 700;
            }
        }
        span:nth-child(1) {
            margin-right: 10px;
        }
        span:nth-child(2) {
            margin-left: 10px;
        }
        position: relative;
        margin-right: 20px;
        background-color: #fafafa;
        color: #999999;
        .sort-active {
            position: absolute;
            display: block;
            border-radius: 20px;
            width: 50%;
            height: 100%;
            top: 0;
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
    .upcoming-headtime {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        .icon-down {
            margin-left: 5px;
            display: inline-block;
            background: url("/img/my-icons/down-icon.png") center;
            width: 10px;
            height: 8px;
            background-size: cover;
        }
    }
    .btn {
        border-radius: 20px;
        border: 1px solid rgb(238, 237, 237);
        padding: 5px 10px;
    }
}
.upcoming-main-container {
    overflow: hidden;
    height: calc(100% - 48px);
}

.list-head {
    padding: 5px 15px;
    background: #ececec;
    color: #999999;
}
</style>