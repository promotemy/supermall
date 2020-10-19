<template>
  <nav-bar class="cartbavbar">
    <div slot="center">购物车({{ cartLength }})</div>
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/navbar.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartNavBar",
  components: {
    NavBar,
  },
  computed: {
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      // key : value
      // 自定义名称  ： getters里的函数名
      cartLength: "cartLength",
    }),
  },
};
</script>
<style scoped>
.cartbavbar {
  background-color: pink;
  color: aliceblue;
}
</style>