<template>
  <div class="recommend">
    <div class="items" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div class="text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 15px 0 15px;
  border-bottom: 5px solid gainsboro;
}
.items {
  flex: 1;
  /* width: 0%; */
}
img {
  height: 74%;
  width: 80%;
  margin-bottom: 5px;
}
.text {
  font-size: 16px;
}
</style>