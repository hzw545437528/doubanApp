<template>
    <div id="panel">
        <h4 class="panel-title">热门</h4>
        <div class="panel-content">
            <div
                class="panel-contentitem"
                v-for="(item, index) in info"
                :key="index"
                @click="$router.push({name:'audios/detail',params:{
                id:item.id
            }})"
            >
                <img :src="item.images.large" alt />
                <div class="panel-contentitem-info">
                    <h3 class="panel-contentitem-infotitle">{{item.title}}</h3>
                    <div class="panel-contentitem-inforate">
                        <RateStar
                            :max="item.rating.max"
                            :value="item.rating.average"
                            color="#d3d1d1"
                        ></RateStar>
                        <span>{{item.rating.average}}</span>
                    </div>
                    <p>电影</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator";

class mixin extends Vue {}

@Component
export default class Panel extends Vue {
    @Prop(Object) top250Data!: any;
    @Provide() info: any = null;

    created() {
        this.info = this.top250Data.subjects;
    }
}
</script>
<style lang="scss" scoped>
#panel {
    background-color: #ffffff;
    margin-top: 10px;
    padding: 15px;

    .panel-content {
        display: flex;
        flex-wrap: wrap;
        .panel-contentitem {
            width: 50%;
            display: flex;
            padding-bottom: 10px;
            margin-top: 10px;

            img {
                border-radius: 5px;
                border: 1px solid #f1f1f1;

                width: 45px;
                height: 65px;
            }

            &-info {
                flex: 1;
                margin: 0 10px;
                &title {
                    width: 85%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                &rate {
                    margin-top: 4px;
                    display: flex;
                    align-items: center;
                    span {
                        display: inline-block;
                        height: 10px;
                        line-height: 12px;
                        margin-left: 10px;
                        font-size: 10px;
                    }
                }
                p {
                    margin-top: 8px;
                    color: #999999;
                }
            }
        }
    }
}
</style>