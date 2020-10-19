<template>
  <div class="category-list-item">
    <img v-lazy alt />
  </div>
</template>

<script>
export default {
  props: {
    ListItem: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
</style>