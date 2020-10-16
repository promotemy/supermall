<template>
  <div class="tabControl">
    <div
      class="items"
      v-for="(item, index) in titles"
      :key="index"
      @click="itemClick(index)"
      :class="{ active: index === curentIndex }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      curentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.curentIndex = index;
      // console.log(this.curentIndex);
      this.$emit("tabClick", index);
    },
  },
};
</script>
<style scoped>
.tabControl {
  display: flex;
  text-align: center;
  font-size: 16px;
  z-index: 9;
  background-color: gainsboro;
}
.items {
  flex: 1;
  height: 44px;
  line-height: 44px;
}
.active {
  color: red;
}
.active span {
  padding: 5px;
  border-bottom: 1px solid red;
}
</style>