<template>
  <div id="content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {};
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content {
  display: flex;
  background-color: #f6f6ff;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;

  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.3);
}
</style>
