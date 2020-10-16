<template>
  <div id="cart">
    <cart-nav-bar></cart-nav-bar>
    <cart-list></cart-list>
    <cart-btn-bar></cart-btn-bar>
  </div>
</template>
<script>
import CartNavBar from "./chilComps/CartNavBar";
import CartList from "./chilComps/CartList";
import CartBtnBar from "./chilComps/CartCheckBtn";
export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartList,
    CartBtnBar,
  },
};
</script>
<style scoped>
#cart {
  height: 100vh;
}
</style>