<template>
  <div>
    <p-button @click="modelOpen = true">弹出一个模态窗口</p-button>
    <!-- 设置要传送去的地方 -->
    <teleport to="body">
      <!-- 被传送的内容 -->
      <div v-if="modelOpen" class="modal">
        <div>
          一个弹窗
          <button @click="modelOpen = false">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  data() {
    return { modelOpen: false };
  },
  //   setup() {},
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
