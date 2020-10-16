<template>
  <scroll class="cartconten" ref="scroll">
    <list-item
      v-for="(item, index) in cartList"
      :key="index"
      :product="item"
    ></list-item>
  </scroll>
</template>
<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/bscroll/BScroll.vue";
import ListItem from "./ListItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    ListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>
<style scoped>
.cartconten {
  height: calc(100% - 133px);
  overflow: hidden;
}
</style>