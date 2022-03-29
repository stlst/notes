<template>
  <div>class coupon</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Coupon extends Vue {
  @Prop({}) primary: boolean;

  @Watch("primary")
  handlePrimaryChange() {
    console.log("===primary", this.primary);
  }

  created() {
    console.log("===props", this.primary);
  }
}
</script>

<style scoped></style>
