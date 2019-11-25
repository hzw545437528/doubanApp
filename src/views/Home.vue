<template>
    <div class="home">
        <ToolBar class="home-toolbar"></ToolBar>
        <ContentWrap>
            <template #default>
                <div>
                    <div v-for="(item, index) in 100" :key="index">{{item}}</div>
                </div>
            </template>
        </ContentWrap>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BScroll from "better-scroll";
import ContentWrap from "../components/common/ContentWrap.vue";
@Component({
    components: {
        ContentWrap
    }
})
export default class Home extends Vue {
    public mounted() {}
}
</script>
<style lang="scss">
.home {
    padding-top: 41px;
    position: relative;
    height: 100%;
    .home-toolbar {
        font-size: 16px;
        justify-content: center;
        .toolbar-item {
            margin: 0 20px;
        }
        .active {
            color: #0e932e;
            border-bottom: 2px solid #0e932e;
            border-radius: 2px;
        }
    }
    .content {
        height: 100%;
        overflow: auto;
    }
}
</style>