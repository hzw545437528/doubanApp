<template>
    <div id="search">
        <div class="search-head">
            <SearchInput :showScan="false" @input="input"></SearchInput>
            <div class="head-btn">
                <a href="javascript:" @click="$router.go(-1)">取消</a>
            </div>
        </div>
        <Panel :top250Data="top250Data" v-if="top250Data"></Panel>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop, Watch } from "vue-property-decorator";
import SearchInput from "../components/common/SearchInput.vue";
import Panel from "../components/search/Panel.vue";

@Component({
    components: {
        SearchInput,
        Panel
    }
})
export default class Search extends Vue {
    @Provide() top250Data: any = null;
    @Provide() searchVal: any = "";
    @Watch("searchVal")
    handleInput() {
        // (this as any).$service
        //     .getService("/api/movie/search", {
        //         q: this.searchVal
        //     })
        //     .then((res: any) => {
        //         console.log(res);
        //     });
        // console.log(this.searchVal);
    }
    ajaxTop250() {
        (this as any).$service
            .getService("/api/movie/top250", {
                count: 10,
                start: 0
            })
            .then((res: any) => {
                this.top250Data = res.data;
                console.log(res);
            });
    }
    input(val: any) {
        this.searchVal = val;
    }

    created() {
        this.ajaxTop250();
    }
}
</script>
<style lang="scss" scoped>
#search {
    background-color: rgb(245, 245, 245);
    height: 100vh;
}
.search-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #ffffff;
    a {
        font-size: 16px;
        color: rgb(23, 184, 31);
    }
}
</style>