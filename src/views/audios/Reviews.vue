<template>
    <div class="reviews">
        <div class="reviews-head">
            <div class="reviews-headlist">
                <div class="reviews-headlist-item active">
                    影评
                    <span class="reviews-headlist-itemextra">61</span>
                </div>
                <div class="reviews-headlist-item">
                    讨论
                    <span class="reviews-headlist-itemextra">44</span>
                </div>
            </div>
        </div>
        <div>
            <ul>
                <li v-for="(item, index) in 100" :key="index">这是第{{item}}个li</li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
@Component
export default class Reviews extends Vue {}
</script>
<style lang="scss" scoped>
.reviews {
    background-color: #ffffff;
    border-radius: 10px 10px 0 0;

    // height: calc(100vh - 45px);
    .reviews-head {
        position: sticky;
        top: 45px;
        background-color: #dbdbdb;
        border-radius: 10px 10px 0 0;
        padding: 20px 10px 0 15px;
        &::before {
            content: "";
            position: absolute;
            display: inline-block;
            width: 40px;
            height: 5px;
            top: 5px;
            left: calc(50% - 20px);
            border-radius: 10px;
            background-color: #bebebe;
        }
        &list {
            display: flex;
            font-size: 16px;
            color: #999999;
            &-item {
                position: relative;
                margin-right: 40px;
                padding-bottom: 15px;
                &extra {
                    position: absolute;
                    font-size: 12px;
                    color: #999999;
                    top: 0;
                    right: -18px;
                }
                &.active {
                    color: #333333;
                    border-bottom: 2px;
                }
            }
        }
    }
}
</style>