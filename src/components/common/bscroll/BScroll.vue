<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //点击事件
      probeType: this.probeType, //监听位置
      pullUpLoad: this.pullUpLoad, //上拉加载更多
      mouseWheel: true, //开启鼠标滚轮
      disableMouse: false, //启用鼠标拖动
      disableTouch: false, //启用手指触摸
    });

    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
    // 监听滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }

    // console.log(this.scroll);
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      // 提示本次加载完成(pullUpLoad)
      this.scroll && this.scroll.finishPullUp();
      // console.log(this.scroll.finishPullUp);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>
<style scoped>
</style>