<template>
  <div id="tabBar" @click="itemClick">
    <div v-if="isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabbaritem",
  data() {
    return {
      // isActive: false,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path);
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  methods: {
    itemClick() {
      // console.log(1213);
      this.$router.replace(this.path) !== -1;
    },
  },
};
</script>
<style scoped>
#tabBar {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
#tabBar img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
/* 
.active {
  color: red;
} */
</style>