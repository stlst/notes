<script>
import { h } from "@vue/runtime-core";
export default {
  props: {
    counter: {
      type: Number,
      default: 0,
    },
  },
  render() {
    console.log("======", this.counter);
    return h("div", [
      h(
        "div",
        {
          onClick: () => {
            this.$emit("update:counter", this.counter + 1);
          },
        },
        [
          `I am RenderTest: ${this.counter}`,
          this.$slots.default(),
          this.$slots.content(),
        ]
      ),
    ]);
  },
};
</script>

<style></style>
