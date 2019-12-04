<template>
    <div class="input-wrap">
        <Icon class="search-icon"></Icon>
        <input type="text" :placeholder="title" @input="$emit('input',$event.target.value)" />
        <Icon class="scan-icon" v-if="showScan"></Icon>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class searchInput extends Vue {
    @Prop({
        type: String,
        default: "文学作品中的衰老描写"
    })
    title!: String;
    @Prop({
        type: Boolean,
        default: true
    })
    showScan!: boolean;
}
</script>
<style lang="scss">
.input-wrap {
    display: flex;
    align-items: center;
    position: relative;
    width: 87%;
    input {
        width: 100%;
        text-indent: 40px;
        height: 30px;
        box-sizing: border-box;
        border: 1px solid #dfdfdf;
        border-radius: 20px;
        background-color: #f7f7f7;
        outline: none;
    }
    .icon {
        position: absolute;

        &.search-icon {
            left: 4px;
            background: url("/img/my-icons/search-icon.svg") no-repeat;
            background-size: cover;
        }
        &.scan-icon {
            right: 6px;
            background: url("/img/my-icons/scan-icon.svg") center no-repeat;

            background-size: 18px 18px;
        }
    }
}
</style>