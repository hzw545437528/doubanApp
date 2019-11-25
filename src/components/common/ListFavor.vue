<template>
    <div class="list-favor">
        <div class="favor-btn">
            <i></i>
            <p>想看</p>
        </div>
        <p class="extra">{{handleExtra}}</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
@Component
export default class ListFavor extends Vue {
    @Prop([String, Number]) extra!: string | number;
    @Prop(String) pubdate!: string;
    get handleExtra() {
        let str = "",
            num: string | number = 0;
        if (this.extra >= 10000) {
            num = ((this.extra as number) / 10000).toFixed(1);
            str = num + "万人想看";
        } else {
            num = this.extra;
            str = num + "人想看";
        }
        return str;
    }
}
</script>
<style lang="scss">
.list-favor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(48% - 1.5rem);

    .favor-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: rgb(247, 165, 44);
        i {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            max-width: 41px;
            max-height: 41px;
            background: url("/img/my-icons/favor-icon.png") center no-repeat;
            background-size: cover;
        }
        p {
            margin: 5px 0;
        }
    }

    .extra {
        margin-top: 0;
        font-size: 11px;
        color: #bebdbd;
    }
}
</style>