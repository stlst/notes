<script lang="ts">
// vue3中函数式组件只能用函数方式声明,不添加template
import { h } from "vue";
const Heading = (props, context) => {
  console.log("context", context.attrs, context.slots);

  return h(`h${props.level}`, context.attrs, context.slots);
};
Heading.props = ["level"];
export default Heading;
</script>
