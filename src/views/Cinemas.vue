<template>
    <div class="cinemas">
        <AppTitle title="院线电影"></AppTitle>
        <ToolBar
            @select-tab="handleSelcetTab"
            :toolbarInfo="toolBar"
            class="tabs"
            :selectTab="selectTab"
        ></ToolBar>
        <Loading v-if="loading"></Loading>
        <div
            class="cinemas-maincontainer"
            :class="{isSafari:$store.state.isSafari}"
            ref="container"
            v-else
        >
            <List
                :info="hot"
                v-show="selectTab == 0"
                @pulling-up="getMoreHot"
                :mountScroll="true"
                ref="hotList"
            >
                <template #list-right="{info}">
                    <ListTicket
                        class="list-right"
                        :extra="info.collect_count"
                        :pubdate="info.mainland_pubdate"
                    ></ListTicket>
                </template>
            </List>
            <!-- <List :info="upComing" v-show="selectTab == 1"></List> -->
            <UpComing :info="upComing" :total="getUpComingRes.total" v-show="selectTab==1"></UpComing>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import BScroll from "better-scroll";
import ListTicket from "../components/common/ListTicket.vue";
import UpComing from "./audios/UpComing.vue";
@Component({
    components: {
        ListTicket,
        UpComing
    }
})
export default class Cinames extends Vue {
    @Provide() toolBar: Array<any> = ["正在热映", "即将上映", "11月观影指南"];
    @Provide() selectTab: number = (this.$store as any).getters.audioPageTab;
    @Provide() loading: boolean = true;
    start: number = 0;
    getHotRes: any = {};
    getUpComingRes: any = {};
    hot: Array<any> = [];
    upComing: Array<any> = [];

    getHot() {
        (this as any).$service
            .getService("/api/movie/in_theaters", {
                city: "福州",
                start: this.start
            })
            .then((res: any) => {
                this.start += 20;
                this.getHotRes = res.data;
                this.hot = res.data.subjects;
                this.loading = false;
            });
    }
    getMoreHot() {
        if (this.getHotRes.total > this.start) {
            (this as any).$service
                .getService("/api/movie/in_theaters", {
                    city: "福州",
                    start: this.start
                })
                .then((res: any) => {
                    console.log(res);
                    this.start += 20;

                    (this.hot as any) = this.hot.concat(res.data.subjects);
                    (this.$refs["hotList"] as any).refresh();
                    (this.$refs["hotList"] as any).finishPullUp();
                });
        }
    }

    getUpComing() {
        (this as any).$service
            .getService("/api/movie/coming_soon", {
                city: "福州",
                start: 0
            })
            .then((res: any) => {
                this.start += 20;
                this.getUpComingRes = res.data;
                this.upComing = res.data.subjects;
                this.loading = false;
                console.log(this.upComing);
            });
    }
    handleSelcetTab(i: any) {
        this.selectTab = i;
        this.start = 0;
        if (this.selectTab == 0 && this.hot.length == 0) {
            this.loading = true;
            this.getHot();
        } else if (this.selectTab == 1 && this.upComing.length == 0) {
            this.loading = true;
            this.getUpComing();
        }
    }

    created() {
        if (this.selectTab) {
            this.getUpComing();
        } else {
            this.getHot();
        }
    }
    mounted() {
        /* 
            pullDownRefresh: {
                threshold: 50,
                stop: 20
            } */
        // const scroll = new BScroll(this.$refs["container"], {
        //     click: true
        // });
    }
}
</script>
<style lang="scss">
.cinemas {
    // margin-top: 86px;
    height: 100vh;
    overflow: hidden;
    .cinemas-maincontainer {
        position: relative;
        height: calc(100vh - 86px);
        &.isSafari {
            height: calc(100% - 156px);
        }
    }
    @media screen and (min-width: 768px) {
        .cinemas-maincontainer {
            width: 768px;
            margin: 0 auto;
        }
    }
}

.tabs {
    justify-content: space-around;
    font-size: 15px;
    .active {
        color: #2d2d2d !important;
        font-weight: 700;
        border-bottom: 2px solid #2d2d2d;
        border-radius: 2px;
    }
}
.load {
    height: calc(100vh - 86px);
}
</style>