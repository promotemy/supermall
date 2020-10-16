<template>
  <div class="toast" v-show="show">
    <div>{{ message }}</div>
  </div>
</template>
<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: "",
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data() {
    return {
      message: "",
      show: false,
    };
  },
  methods: {
    showToast(message = "默认文字", duration = 1500) {
      // console.log("---");
      this.show = true;
      this.message = message;

      setTimeout(() => {
        this.show = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;

  z-index: 999;

  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>