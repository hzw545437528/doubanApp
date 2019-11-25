<template>
    <div id="index">
        <div class="search-wrap" :class="{'home-search-wrap': $store.getters.isHome}">
            <SearchInput></SearchInput>
            <Icon class="email-icon" :class="{'home-search-wrap': $store.getters.isHome}"></Icon>
        </div>
        <div class="main-container">
            <router-view></router-view>
        </div>
        <div class="tabbar-wrap">
            <Tabbar></Tabbar>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchInput from "../components/common/SearchInput.vue";
import Tabbar from "../components/common/Tabbar.vue";
@Component({
    components: {
        SearchInput,
        Tabbar
    }
})
export default class index extends Vue {}
</script>
<style lang="scss">
.index {
    height: 100%;
}
.search-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem 0.3rem;
    box-sizing: border-box;
    height: 45px;
    &.home-search-wrap {
        background-color: #0e932e;
    }
    .icon {
        &.email-icon {
            background: url("/img/my-icons/email-icon.svg") center no-repeat;
            background-size: 30px 30px;
        }
        &.home-search-wrap {
            background: url("/img/my-icons/email-icon-white.svg") center
                no-repeat;
            background-size: 30px 30px;
        }
    }
}
.search-wrap,
.tabbar-wrap {
    position: fixed;
    left: 0;
}
.search-wrap {
    top: 0;
    width: 100vw;
}
.tabbar-wrap {
    bottom: 0;
    width: 100vw;
}
.main-container {
    width: 100vw;
    margin-top: 45px;
    height: calc(100vh - 105px);
    overflow: hidden;
}
</style>