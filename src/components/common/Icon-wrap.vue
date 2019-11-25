<template>
    <i class="icon"></i>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class iconWrap extends Vue {
    @Prop(String) className!: String;
}
</script>
<style lang="scss">
</style>