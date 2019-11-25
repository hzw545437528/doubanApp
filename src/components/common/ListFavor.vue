<template>
    <div class="list-favor">
        <p class="extra">{{handleExtra}}</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
@Component
export default class ListFavor extends Vue {
    @Prop([String, Number]) extra!: string | number;
    @Prop(String) pubdate!: string;
    @Provide() pub: boolean = false;
    get handleExtra() {
        let str = "",
            num: string | number = 0;
        if (this.extra >= 10000) {
            num = ((this.extra as number) / 10000).toFixed(1);
            str = num + "万人看过";
        } else {
            num = this.extra;
            str = num + "人看过";
        }
        if (!this.pub) {
            str = str.replace("看过", "想看");
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

    .extra {
        font-size: 11px;
        color: #bebdbd;
    }
}
</style>