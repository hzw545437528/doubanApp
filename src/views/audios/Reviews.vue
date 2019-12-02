<template>
    <div class="reviews">
        <div class="reviews-head">
            <div class="reviews-headlist">
                <div class="reviews-headlist-item active">
                    影评
                    <span class="reviews-headlist-itemextra">{{reviewsInfo.total}}</span>
                </div>
                <div class="reviews-headlist-item">
                    讨论
                    <span class="reviews-headlist-itemextra">44</span>
                </div>
            </div>
        </div>
        <div class="reviews-main">
            <div class="reviews-maintitle">
                <span>影评列表</span>
                <div class="btns">
                    <SortBtns></SortBtns>
                </div>
            </div>
            <div class="reviews-mainlist">
                <div
                    class="reviews-mainlist-item"
                    v-for="(item, index) in reviewsInfo.reviews"
                    :key="index"
                >
                    <div class="reviews-mainlist-itemhead">
                        <img :src="item.author.avatar" alt />
                        <span>{{item.author.name}}</span>
                        <span>看过</span>
                        <RateStar class="rate" :max="item.rating.max" :value="item.rating.value"></RateStar>
                    </div>
                    <div class="reviews-mainlist-itemtitle">{{item.title}}</div>
                    <div class="reviews-mainlist-iteminfo">{{item.summary}}</div>
                    <div class="reviews-mainlist-itemextra">{{reviewsExtra(item)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
@Component
export default class Reviews extends Vue {
    @Prop(Object) reviewsInfo!: any;
    reviewsExtra(item: any) {
        let str = "";
        if (item.comments_count) {
            str = item.comments_count + "回复";
        }
        if (item.useful_count) {
            str += str
                ? " · " + item.useful_count + "有用"
                : item.useful_count + "有用";
        }
        return str;
    }
    created() {
        console.log(this.reviewsInfo);
    }
}
</script>
<style lang="scss" scoped>
.reviews {
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;

    // height: calc(100vh - 45px);
    .reviews-head {
        position: relative;
        border-bottom: 1px solid #e0e0e0;
        border-radius: 10px 10px 0 0;
        padding: 20px 10px 0 15px;
        background-color: #f1f1f1;
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
                padding-bottom: 10px;
                &extra {
                    position: absolute;
                    font-size: 12px;
                    color: #999999;
                    top: 0;
                    right: -18px;
                }
                &.active {
                    color: #333333;
                    border-bottom: 2px solid black;
                }
            }
        }
    }
    .reviews-main {
        &title {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            justify-content: space-between;
            font-size: 14px;
            color: #333333;
            background-color: #f1f1f1;
        }
        &list {
            &-item {
                margin-bottom: 10px;
                padding: 15px;
                background-color: #ffffff;
                &head {
                    display: flex;
                    align-items: center;
                    img {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        border: 1px solid #e0e0e0;
                    }
                    span {
                        margin-left: 5px;
                    }
                    .rate {
                        margin-left: 5px;
                    }
                }
                &title {
                    font-size: 17px;
                    color: #333333;
                    font-weight: 700;

                    margin: 5px 0;
                }
                &info {
                    font-size: 14px;
                    color: #666666;
                }
                &extra {
                    margin-top: 5px;
                    color: #777777;
                }
            }
        }
    }
}
</style>