<template>
  <div class="backtop">
    <img src="@/assets/img/common/top.png" alt="" />
  </div>
</template>
<script>
export default {
  name: "BackTop",
};
</script>
<style scoped>
.backtop {
  position: fixed;
  right: -40px;
  bottom: 50px;
}
.backtop img {
  width: 50%;
  height: 50%;
  /* transform: translateX(-50%); */
}
</style>