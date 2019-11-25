<template>
    <div class="audios">
        <ToolBar :toolbarInfo="toolbarInfo" class="audios-toolbar"></ToolBar>
        <Loading v-if="isLoadgin"></Loading>
        <ContentWrap v-else>
            <template #default>
                <div class="audio-container">
                    <toolbar-circle></toolbar-circle>
                    <Panel
                        :info="hot"
                        :total="total"
                        :tabInfo="['影院热映','即将上映']"
                        @selectTab="handleSelectTab"
                        :selectTab="selectTab"
                        :info_="upComing"
                        @show-all="showAll('cinemas', selectTab)"
                    >
                        <template #item-foot="{itemInfo}" v-if="selectTab == 1">
                            <p class="collect-count">{{itemInfo.collect_count}}人想看</p>
                            <span class="pubdate">{{showPubdate(itemInfo.mainland_pubdate)}}</span>
                        </template>
                    </Panel>
                </div>
            </template>
        </ContentWrap>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import Toolbar_circle from "../components/common/Toolbar_circle.vue";
import Panel from "../components/audios/panel.vue";

@Component({
    components: {
        "toolbar-circle": Toolbar_circle,
        Panel
    }
})
export default class Audios extends Vue {
    @Provide() loading: boolean = true;
    @Provide()
    toolbarInfo: Array<String> = [
        "电影",
        "电视",
        "读书",
        "原创小说",
        "音乐",
        "同城"
    ];
    hot: Array<any> = [];
    upComing: Array<any> = [];
    total: Number = 0;
    selectTab: number = (this.$store as any).getters.audioPageTab;

    handleHotMovie(): void {
        if (this.$store.getters.hotMovies) {
            this.hot = this.$store.getters.hotMovies.subjects.slice(0, 6);
            this.total = this.$store.getters.hotMovies.total;
        } else {
            (this as any).$service
                .getService("/api/movie/in_theaters", {
                    city: "福州",
                    start: 0,
                    count: 6
                })
                .then((res: any) => {
                    this.$store.dispatch("setHotMovies", res.data);
                    this.hot = res.data.subjects.slice(0, 6);
                    this.total = res.data.total;
                });
        }
    }
    handleUpComing(): void {
        if (this.$store.getters.upComingMovies) {
            this.total = this.$store.getters.upComingMovies.total;
            this.upComing = this.$store.getters.upComingMovies.subjects.slice(
                0,
                6
            );
        } else {
            (this as any).$service
                .getService("/api/movie/coming_soon", {
                    city: "福州",
                    start: 0,
                    count: 6
                })
                .then((res: any) => {
                    this.$store.dispatch("setUpComingMovies", res.data);
                    // this.hot = res.data.subjects.slice(0, 6);
                    this.total = res.data.total;
                    this.upComing = res.data.subjects.slice(0, 6);
                });
        }
    }

    handleSelectTab(val: string, selectTab: number): void {
        this.selectTab = selectTab;
        this.$store.dispatch("setAudioPageTab", selectTab);
        if (val == "即将上映") {
            this.handleUpComing();
        } else if (val == "影院热映") {
            this.handleHotMovie();
        }
    }
    showPubdate(pubdate: any): string {
        let arr = pubdate.split("-");
        let date = `${arr[1]}月${arr[2]}日`;
        return date;
    }
    showAll(route: string, selectTab: number) {
        (this.$router as any).push({
            name: route,
            params: {
                selectTab: selectTab
            }
        });
    }
    get isLoadgin() {
        let bool = true;
        if (this.hot.length != 0 && this.upComing.length != 0) {
            bool = false;
        }
        return bool;
    }

    public created() {
        (this as any).handleUpComing();
        (this as any).handleHotMovie();
    }
}
</script>
<style lang="scss">
.audios {
    margin-top: 41px;
    height: calc(100% - 41px);
}
.audios-toolbar {
    justify-content: space-around;
    background-color: #ffffff;
    font-size: 14px;
    .active {
        color: #2d2d2d !important;
        border-radius: 2px;
        border-bottom: 2px solid #2d2d2d;
    }
}
@media screen and (min-width: 768px) {
    .audio-container {
        width: 768px;
        margin: 0 auto;
    }
}

.collect-count {
    margin: 0;
    margin-bottom: 5px;
    font-size: 11px;
    color: #999999;
    line-height: 1;
}
.pubdate {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 1px 4px;
    color: #ff0000;
    border: 1px solid #ff0000;
    border-radius: 2px;
    border-color: #ff0000;
    font-size: 9px;
    font-weight: 500;
}
</style>