<template>
  <div class="category-list">
    <div class="item" v-for="(item,index) in list" :key="index">
      <a :href="item.link">
        <img v-lazy="item.image" alt @load="imageLoad" />
        <div class="item-title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imageLoad() {
      this.$emit("imageLoad");
    }
  }
};
</script>

<style scoped>
.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
}
.item {
  width: 48%;
  position: relative;
}
.item img {
  width: 100%;
}
</style>