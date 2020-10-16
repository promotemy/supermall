<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImg" :key="index">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "@/components/common/swiper/index.js";
export default {
  name: "detaiSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImg: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>