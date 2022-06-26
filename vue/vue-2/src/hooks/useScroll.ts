import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
} from "@vue/composition-api";
// import { toRefs } from "vue";

export const useScroll = () => {
  const position = reactive({
    initY: 0,
    y: 0,
    direction: "up",
    //     percentage: 100,
  });

  const percentage = computed(() => {
    return Math.abs(position.y - position.initY);
  });

  const getOffsetY = () => {
    const a = window.pageYOffset;
    const b = document.documentElement.scrollTop;
    const c = document.body.scrollTop;
    return a || b || c;
  };

  const handleScroll = () => {
    const curY = getOffsetY();
    if (curY > position.y) {
      position.direction = "down";
    } else {
      position.direction = "up";
    }
    position.y = curY;
    console.log("eee", getOffsetY());
  };

  onMounted(() => {
    console.log("onMount");
    position.initY = getOffsetY();
    position.y = getOffsetY();
    console.log("===init", position);
    document.addEventListener("scroll", handleScroll, true);
  });

  onUnmounted(() => {
    document.removeEventListener("scroll", handleScroll);
  });
  return { ...toRefs(position), percentage };
};
