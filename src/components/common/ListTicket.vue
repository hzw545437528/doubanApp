<template>
    <div class="list-ticket">
        <button class="btn ticket" :class="{booking: !pub}">{{hasPub}}</button>
        <p class="extra">{{handleExtra}}</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
@Component
export default class ListTicket extends Vue {
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
    get hasPub() {
        let bool = false,
            str = "预售";
        if (this.pubdate) {
            let now = new Date(),
                pubdate = new Date(this.pubdate);
            if (now > pubdate) {
                this.pub = true;
                str = "购票";
            }
        }
        return str;
    }
}
</script>
<style lang="scss">
.list-ticket {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(48% - 1.5rem);

    .btn {
        width: 1.2rem;
        max-width: 110.875px;
        border: 1px solid;
        border-radius: 4px;
        padding: 5px;
        font-size: 12px;
        background-color: transparent;
        &.ticket {
            color: rgb(248, 19, 19);
        }
        &.booking {
            color: rgb(241, 159, 52);
        }
    }
    .extra {
        font-size: 11px;
        color: #bebdbd;
    }
}
@media screen and (min-width: 768px) {
    .list-ticket {
        width: 208px;
    }
}
</style>