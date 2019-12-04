<template>
    <div class="detail">
        <AppTitle title="电影"></AppTitle>
        <div class="reviews-head" :class="{show: true}" v-if="showReviewsHead">
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
        <div class="scroll-wrap">
            <Scroll
                ref="scroll"
                @get-height="getHeight"
                :options="scrollOptions"
                @show-reviews="handleShowReviews"
                :containerHeight="containerHeight"
                @scroll-reviews="scrollReviews"
            >
                <template #default>
                    <div class="container" ref="container">
                        <div class="main-container" v-if="info">
                            <div class="movie-head">
                                <img :src="info.images.large" alt />
                                <div class="movie-headinfo">
                                    <h3
                                        class="movie-headinfo-item movie-headinfo-title"
                                    >{{info.title}}</h3>
                                    <p
                                        class="movie-headinfo-item movie-headinfo-originaltitle"
                                    >{{info.original_title}} ({{info.year}})</p>
                                    <p
                                        class="movie-headinfo-item movie-headinfo-extra"
                                    >{{getExtra(info)}}</p>
                                    <div class="movie-headinfo-btns">
                                        <button class="btn want">
                                            <i></i>
                                            想看
                                        </button>
                                        <button class="btn seen">
                                            <i></i>
                                            看过
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="movie-rate">
                                <div class="movie-rateinfo">
                                    <div class="movie-rateinfo-title">
                                        <h5>豆瓣评分 ™</h5>
                                        <span>></span>
                                    </div>
                                    <div class="movie-rateinfo-content">
                                        <div class="movie-rateinfo-contentleft">
                                            <p>{{info.rating.average}}</p>
                                            <Rate :level="info.rating.average" :percent="5"></Rate>
                                        </div>
                                        <div class="movie-rateinfo-contentright">
                                            <div class="extra">{{info.ratings_count}}人评分</div>
                                            <div
                                                class="level"
                                                v-for="(item, index) in 5"
                                                :key="index"
                                            >
                                                <div class="star-wrap">
                                                    <Star
                                                        v-for="(item, index) in item"
                                                        :key="index"
                                                        :size="6"
                                                    ></Star>
                                                </div>
                                                <div class="line-wrap">
                                                    <div class="line"></div>
                                                    <div
                                                        class="line-active"
                                                        :ref="[starClass[index]]"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="movie-rateinfo-extra">
                                        <span>{{collect_count}}人看过</span>
                                        <span>{{wish_count}}人想看</span>
                                    </div>
                                </div>
                            </div>
                            <div class="movie-ticket">
                                <i class="movie-ticket-icon"></i>
                                <span>选座购票</span>
                                <span class="float-right">></span>
                            </div>
                            <div class="movie-introduction margin">
                                <h4 class="title">剧情简介</h4>
                                <div
                                    class="movie-introduction-content hide-text"
                                    ref="movie-introduction-content"
                                >
                                    <span class="text"></span>
                                    <a
                                        href="javascript:;"
                                        style="float: right"
                                        v-if="more"
                                        @click="allIntroduce"
                                    >展开</a>
                                </div>
                            </div>
                            <div class="movie-casts margin">
                                <h4 class="title">
                                    演职员
                                    <span class="right">全部 {{casts.length}} ></span>
                                </h4>
                                <ScrollX>
                                    <template #default>
                                        <ul class="movie-castslist">
                                            <li
                                                class="movie-castslist-item"
                                                v-for="(item, index) in casts"
                                                :key="index"
                                            >
                                                <img :src="item.avatars.small" alt />
                                                <p class="movie-castslist-itemname">{{item.name}}</p>
                                            </li>
                                        </ul>
                                    </template>
                                </ScrollX>
                            </div>
                            <div class="movie-photos margin" v-if="photos.length">
                                <h4 class="title">
                                    预告片 / 剧照
                                    <span class="right">全部 {{photos[0].photos_count}} ></span>
                                </h4>
                                <ScrollX>
                                    <template #default>
                                        <ul class="movie-photoslist">
                                            <li
                                                class="movie-photoslist-item"
                                                v-for="(item, index) in photos"
                                                :key="index"
                                            >
                                                <img :src="item.image" alt />
                                            </li>
                                        </ul>
                                    </template>
                                </ScrollX>
                            </div>
                            <div class="movie-comments">
                                <h4 class="title movie-commentstitle">
                                    短评
                                    <img src="/img/my-icons/question-icon.png" alt />
                                    <span class="right">全部短评 {{info.comments_count}} ></span>
                                </h4>
                                <div class="movie-commentscontent">
                                    <div
                                        class="movie-commentscontent-item"
                                        v-for="(item, index) in info.popular_comments"
                                        :key="index"
                                    >
                                        <div class="movie-commentscontent-itemhead">
                                            <img :src="item.author.avatar" alt />
                                            <div class="itemhead-info">
                                                <h4 class="itemhead-info-name">{{item.author.name}}</h4>
                                                <div class="itemhead-info-rate">
                                                    <RateStar
                                                        :max="item.rating.max"
                                                        :value="item.rating.value"
                                                    ></RateStar>
                                                    <div
                                                        class="itemhead-info-ratetime"
                                                    >{{rateTime(item.created_at)}}</div>
                                                </div>
                                            </div>
                                            <a href="javascript:">
                                                <span v-for="(item, index) in 3" :key="index"></span>
                                            </a>
                                        </div>
                                        <div
                                            class="movie-commentscontent-iteminfo"
                                            :ref="'comment'+index"
                                        >{{handleComment(item.content,index)}}</div>
                                        <div class="movie-commentscontent-itemextra">
                                            <i class="icon praise"></i>
                                            <span>{{item.useful_count}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="movie-commentsall">
                                    查看全部短评
                                    <span class="right">></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="reviewsInfo" class="reviews-wrap" ref="reviews-wrap">
                        <Reviews :reviewsInfo="reviewsInfo"></Reviews>
                    </div>
                </template>
            </Scroll>
        </div>
        <div v-if="reviewsInfo && !showReviews" class="reviews-container">
            <Reviews :reviewsInfo="reviewsInfo"></Reviews>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
import Reviews from "./Reviews.vue";
@Component({
    components: {
        Reviews
    }
})
export default class MovieDetail extends Vue {
    @Provide() id: string = "";
    @Provide() info: any = null;
    @Provide() starClass: Array<string> = [
        "one",
        "two",
        "three",
        "four",
        "five"
    ];
    @Provide() more: boolean = false;
    @Provide() casts: Array<any> = [];
    @Provide() photos: Array<any> = [];
    @Provide() commentsInfo: any = null;
    @Provide() reviewsInfo: any = null;
    @Provide() scrollOptions: any = {
        pullUpLoad: {
            threshold: 50
        }
    };
    @Provide() showReviews: boolean = false;
    @Provide() showReviewsHead: boolean = false;
    @Provide() containerHeight: any = 0;
    @Provide() reviewsScroll: any = null;
    getMovieInfo() {
        (this as any).$service
            .getService("/api/movie/subject/" + this.id)
            .then((res: any) => {
                this.info = res.data;
                this.$nextTick(() => {
                    this.handleRating();
                    this.handleCasts();
                    this.handleintroduction();
                });
                console.log(res);
            });
    }
    getExtra(info: any) {
        let str: any = "";
        let country = info.countries[0],
            genres = "",
            pubdate = info.pubdates[info.pubdates.length - 1],
            durations = "";
        info.genres.filter((item: any) => {
            genres = genres + item + " ";
        });
        info.durations.filter((item: any) => {
            durations = durations + " / " + "片长" + item;
        });
        str += `${country} / ${genres} / ${pubdate}上映${durations} >`;

        return str;
    }
    allIntroduce() {
        let el: any = this.$refs["movie-introduction-content"],
            span: any = el.querySelector(".text");
        el.style.overflow = "visible";
        el.style.height = "auto";
        this.more = false;
        span.innerText = this.info.summary;
    }

    get collect_count() {
        let count = this.info.collect_count;
        let str = this.handleCount(count);
        return str;
    }
    get wish_count() {
        let count = this.info.wish_count;
        let str = this.handleCount(count);
        return str;
    }
    get showComments() {
        let arr = [],
            index = 0;
        for (let item of this.commentsInfo.comments) {
            arr.push(item);
            index++;
            if (index >= 4) {
                break;
            }
        }
        console.log(arr);
        return arr;
    }

    handleRating() {
        let ratings = this.info.rating.details,
            count = 0;
        for (let key in ratings) {
            count += ratings[key];
        }
        for (let key in ratings) {
            let el: any = (this.$refs[
                    this.starClass[(key as any) - 1]
                ] as any)[0],
                width = (ratings[key] / count) * 100;
            el.style.width = width + "%";
        }
    }

    handleintroduction() {
        let str = "",
            s = this.info.summary,
            el: any = this.$refs["movie-introduction-content"],
            span: any = el.querySelector(".text"),
            n = el.offsetHeight;
        for (let i = 0; i < s.length; i++) {
            span.innerHTML = s.substr(0, i);
            if (n < el.scrollHeight) {
                el.style.overflow = "hidden";
                el.querySelector(".text").innerHTML =
                    s.substr(0, i - 5) + "...";
                this.more = true;
                break;
            }
        }
    }
    handleCasts() {
        this.casts = this.info.directors.concat(this.info.casts);
    }
    handlePhotos() {
        (this as any).$service
            .getService("/api/movie/subject/" + this.id + "/photos")
            .then((res: any) => {
                this.photos = res.data.photos;
            });
    }

    // handleComments() {
    //     (this as any).$service
    //         .getService("/api/movie/subject/" + this.id + "/comments")
    //         .then((res: any) => {
    //             this.commentsInfo = res.data;
    //             console.log(res);
    //         });
    // }
    handleReviews() {
        (this as any).$service
            .getService("/api/movie/subject/" + this.id + "/reviews")
            .then((res: any) => {
                this.reviewsInfo = res.data;
                console.log(res);
            });
    }
    handleShowReviews(showReviews: boolean) {
        this.showReviews = showReviews;
    }
    handleComment(comment: any, index: any) {
        let str = "";
        this.$nextTick(() => {
            let str = "",
                s = comment,
                el: any = (this.$refs["comment" + index] as any)[0],
                n = el.offsetHeight,
                a = document.createElement("a");
            a.href = "javascript:";
            a.innerHTML = "展开";
            a.className = "show-comment right";
            a.addEventListener("click", () => {
                this.showComment(comment, index);
            });
            let style = window.getComputedStyle(el);

            for (let i = 0; i < s.length; i++) {
                el.innerHTML = s.substr(0, i + 1);
                n = el.offsetHeight;

                if (n < el.scrollHeight) {
                    el.style.overflow = "hidden";
                    el.innerHTML = s.substr(0, i - 5) + "...";
                    el.appendChild(a);
                    break;
                }
            }
        });
    }
    showComment(item: any, index: any) {
        let el = (this.$refs["comment" + index] as any)[0];
        el.style["max-height"] = "none";
        el.style.overflow = "visible";
        el.innerText = item;
    }
    rateTime(creatTime: any) {
        creatTime = creatTime.replace(/-/g, "/");
        let str: any = "",
            num: any = 0;

        let date = new Date(creatTime);
        let now = new Date();
        let difference = now.getTime() - date.getTime();
        let years = Math.floor(difference / (365 * 30 * 24 * 3600 * 1000)),
            months = Math.floor(difference / (30 * 24 * 3600 * 1000)),
            days = Math.floor(difference / (24 * 3600 * 1000)),
            hours = Math.floor(difference / (3600 * 1000)),
            minutes = Math.floor(difference / (60 * 1000)),
            seconds = Math.floor(difference / 1000);
        if (years > 0) {
            str = years + "年前";
        } else if (months > 0) {
            str = months + "个月前";
        } else if (days > 0) {
            str = days + "天前";
        } else if (hours > 0) {
            str = hours + "小时前";
        } else if (minutes > 0) {
            str = minutes + "分钟前";
        } else {
            str = seconds + "秒前";
        }
        return str;
    }

    handleCount(count: any) {
        let str = "";
        if (count > 10000) {
            str = (count / 10000).toFixed(1) + "万";
        } else {
            str = count;
        }
        return str;
    }
    getHeight() {
        let el = this.$refs["container"] as any;
        let style = window.getComputedStyle(el);
        this.containerHeight = style.height;
    }
    scrollReviews() {
        let el = this.$refs["reviews-wrap"];
        // this.reviewsScroll = new (this as any).$BScroll(el, { click: true });
    }

    created() {
        this.id = this.$route.params.id;
        this.getMovieInfo();
        this.handlePhotos();
        this.handleReviews();
    }
    mounted() {}
    updated() {
        // this.$nextTick(() => {
        //     setTimeout(() => {
        //         let el = this.$refs["container"] as any;
        //         let style = window.getComputedStyle(el);
        //         this.containerHeight = style.height;
        //         console.log(style.height);
        //     }, 500);
        // });
    }
}
</script>
<style lang="scss">
$border-bottom-color: #c2c2c2;
$right-color: #d8d6d6;

.detail {
    height: 100vh;
    .wrapper,
    .app-title {
        background-color: #eeecec;
    }
}
.scroll-wrap {
    height: calc(100% - 45px);
}

.margin {
    margin-top: 10px;
}

.title {
    padding: 10px 0;
    font-size: 18px;
    color: #333333;
    line-height: 1;
}
.right {
    float: right;
    font-size: 12px;
    color: #999999;
    font-weight: normal;
}
.container {
    max-width: 768px;
    margin: 0 auto;
    .main-container {
        margin: 0;

        width: 100%;
        padding: 15px;
        // 头部
        .movie-head {
            display: flex;
            img {
                width: 1.7rem;
                height: 2.5rem;
                max-width: 174px;
                max-height: 256px;
                border-radius: 5px;
            }
            .movie-headinfo {
                margin-left: 15px;
                position: relative;
                &-item {
                    margin: 0;
                    margin-bottom: 5px;
                }
                &-title {
                    font-size: 20px;
                }
                &-originaltitle {
                    font-weight: 700;
                    font-size: 13px;
                }
                &-extra {
                    margin-top: 5px;
                    font-size: 10px;
                    color: #999999;
                }
                &-btns {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .btn {
                        display: flex;
                        width: 45%;
                        align-items: center;
                        justify-content: center;
                        padding: 7px 0;
                        border: 1px solid #eeeded;
                        border-radius: 5px;
                        font-weight: 700;
                        line-height: 14px;
                        background-color: #ffffff;
                        color: #333333;
                        i {
                            display: inline-block;
                            width: 14px;
                            height: 14px;
                            line-height: 14px;
                            margin-right: 5px;
                        }
                        &.want {
                            i {
                                background: url("/img/my-icons/favor-icon.png")
                                    center;
                                background-size: cover;
                            }
                        }
                        &.seen {
                            i {
                                background: url("/img/my-icons/seen-icon.png")
                                    center;
                                background-size: 13px 13px;
                            }
                        }
                    }
                }
            }
        }

        //评分
        .movie-rateinfo {
            margin-top: 20px;
            padding: 10px 15px;
            border-radius: 5px;
            background-color: rgb(168, 165, 165);
            color: #ffffff;
            &-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
            }
            &-content {
                display: flex;
                position: relative;
                justify-content: center;
                align-items: stretch;
                margin-top: 5px;
                padding: 5px 0;

                border-bottom: 0.5px solid $border-bottom-color;
                &left {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: auto;
                    p {
                        font-size: 30px;
                        line-height: 1;
                        text-align: center;
                        margin-bottom: 8px;
                        font-weight: 500;
                    }
                    .level-wrap,
                    .level-wrap-active {
                        width: 50px;
                        .level-icon {
                            width: 10px;
                            height: 10px;
                            margin: 0;
                        }
                    }
                    .level {
                        display: none;
                    }
                }
                &right {
                    display: flex;
                    flex-direction: column-reverse;
                    width: 80%;
                    .level {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        height: 8px;
                        .star-wrap {
                            display: flex;
                            height: 6;
                            justify-content: flex-end;
                            align-items: center;
                            margin-right: 10px;
                            min-width: 48px;
                        }
                        .line-wrap {
                            flex: 0 1 auto;
                            width: 90%;
                            position: relative;
                            .line {
                                border-radius: 10px;
                                height: 6px;
                                width: 100%;
                                background-color: rgba(243, 243, 243, 0.5);
                            }
                            .line-active {
                                position: absolute;
                                border-radius: 10px;
                                top: 0;
                                left: 0;
                                height: 6px;
                                min-width: 1%;
                                background-color: rgb(255, 146, 4);
                            }
                        }
                    }
                    .extra {
                        text-align: right;
                        font-size: 11px;
                        color: rgba(219, 218, 218, 0.8);
                    }
                }
            }
            &-extra {
                margin-top: 5px;
                text-align: right;
                color: #dbdada;
                span {
                    margin-right: 10px;
                }
            }
        }

        //选座
        .movie-ticket {
            margin-top: 10px;
            padding: 15px 0;
            position: relative;
            display: flex;
            align-items: center;
            border-bottom: 0.5px solid $border-bottom-color;

            .movie-ticket-icon {
                display: inline-block;
                margin-right: 10px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: rgb(247, 130, 35)
                    url("/img/my-icons/lightning-icon.png") center no-repeat;
                background-size: 15px 15px;
            }

            span {
                font-size: 18px;
                font-weight: 600;
            }
            .float-right {
                font-weight: normal;
                position: absolute;
                right: 0;
            }
        }

        //简介
        .movie-introduction {
            &-content {
                font-size: 15px;
                letter-spacing: 0.3px;
                &.hide-text {
                    // overflow: hidden;
                    // display: -webkit-box;
                    // text-overflow: ellipsis;
                    // -webkit-line-clamp: 4;
                    // -webkit-box-orient: vertical;
                    // white-space: normal;

                    height: 100px;
                }
            }
        }

        //演职员
        .movie-casts {
            .title {
                span {
                    font-weight: normal;
                    line-height: 18px;
                }
            }
            &list {
                display: flex;
                &-item {
                    width: 75px;
                    margin-right: 15px;
                    &:last-child {
                        margin-right: 0;
                    }
                    img {
                        width: 100%;
                        height: 107px;
                        border-radius: 5px;
                    }
                    .movie-castslist-itemname {
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
        //剧照
        .movie-photos {
            &list {
                display: flex;
                &-item {
                    margin-right: 2px;
                    width: 250px;
                    img {
                        border-radius: 5px;
                        width: 100%;
                        height: 160px;
                    }
                }
            }
        }
        //短评
        .movie-comments {
            margin: 20px 0;
            padding: 15px;
            border-radius: 5px;
            background-color: #a8a5a5;
            color: #ffffff;
            &title {
                color: #ffffff;
                line-height: 18px;
                img {
                    width: 14px;
                    height: 14px;
                    vertical-align: text-top;
                }
                span {
                    color: $right-color;
                    line-height: 18px;
                }
            }
            &content {
                margin-top: 20px;
                &-item {
                    margin-top: 20px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid $border-bottom-color;
                    &head {
                        display: flex;
                        align-items: center;

                        img {
                            width: 35px;
                            height: 35px;
                            border-radius: 50%;
                            margin-right: 10px;
                        }
                        .itemhead-info {
                            flex: 1;
                            font-size: 15px;
                            &-rate {
                                display: flex;
                                align-items: center;
                                &time {
                                    font-size: 10px;
                                    margin-left: 5px;
                                }
                            }
                        }

                        a {
                            span {
                                display: inline-block;
                                width: 3px;
                                height: 3px;
                                border-radius: 5px;
                                margin-left: 2px;
                                background-color: $right-color;
                            }
                        }
                    }

                    &info {
                        margin-top: 10px;
                        font-size: 14px;
                        color: #ffffff;
                        overflow: auto;
                        @media screen and (max-width: 768px) {
                            & {
                                max-height: 106px;
                            }
                        }
                        .show-comment {
                            color: $right-color;
                            font-size: 14px;
                        }
                    }
                    &extra {
                        display: flex;
                        align-items: center;
                        margin-top: 10px;
                        .icon {
                            width: 14px;
                            height: 14px;
                        }
                        .praise {
                            background: url("/img/my-icons/praise-icon.png")
                                center no-repeat;
                            background-size: cover;
                        }
                        span {
                            margin-left: 5px;
                            color: $right-color;
                        }
                    }
                }
            }
            &all {
                margin-top: 15px;
                font-size: 16px;
                line-height: 16px;
                span {
                    line-height: 16px;
                    color: $right-color;
                }
            }
        }
    }
}
.reviews-wrap {
    // max-height: calc(100vh - 45px);
    // position: relative;
}
.reviews-container {
    position: absolute;
    top: calc(100vh - 60px);
    left: 0;
}

.reviews-head {
    position: relative;
    border-bottom: 1px solid #e0e0e0;
    border-radius: 10px 10px 0 0;
    padding: 20px 10px 0 15px;
    background-color: #f1f1f1;

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
                left: 35px;
            }
            &.active {
                color: #333333;
                border-bottom: 2px solid black;
            }
        }
    }
}
</style>