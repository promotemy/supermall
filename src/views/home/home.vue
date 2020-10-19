<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contenScroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImgLoad="SwiperImgLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <fearture></fearture>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import HomeSwiper from "./ChilrenComponent/homeSwiper";
import RecommendView from "./ChilrenComponent/RecommendView";
import Fearture from "./ChilrenComponent/fearture";

import NavBar from "components/common/navbar/navbar.vue";
import TabControl from "components/content/TabControl/TabControl.vue";

import GoodsList from "components/content/Goods/GoodsList.vue";

import { getHomeMultidata, getHomeGoods } from "@/network/home.js";

import Scroll from "components/common/bscroll/BScroll.vue";
import BackTop from "components/content/back-Top/BackTop.vue";

import { itemListenerMixin, backTopMixin } from "@/common/mixin.js";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      curentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListen: null,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    HomeSwiper,
    RecommendView,
    Fearture,
    NavBar,
    TabControl,
    GoodsList,

    Scroll,
  },
  computed: {
    showGoods() {
      return this.goods[this.curentType].list;
    },
  },
  created() {
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  destroyed() {
    console.log("destroyed");
  },
  activated() {
    // 进来时将离开时获取的值传入scrollTo函数
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
    // console.log("进来");
  },
  deactivated() {
    // 离开时获取当前的滚动值
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);

    // 取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListen);
  },
  methods: {
    // 事件监听相关

    tabClick(index) {
      switch (index) {
        case 0:
          this.curentType = "pop";
          break;
        case 1:
          this.curentType = "new";
          break;
        case 2:
          this.curentType = "sell";
          break;
      }
      this.$refs.tabControl1.curentIndex = index;
      this.$refs.tabControl2.curentIndex = index;
    },

    contenScroll(position) {
      // 判断backtop是否显示
      this.isShowBackTop = -position.y > 300;

      // 判断tabcontrol是否吸顶（position：fixed）
      // 获取tabControl的offsetTop属性
      // 所有的组件都有一个属性$el 用于获取组件中的元素
      this.isTabFixed = -position.y > this.tabOffsetTop;
      // console.log(this.isTabFixed);
    },
    loadMore() {
      this.getHomeGoods(this.curentType);
      // this.$refs.scroll.refresh();
      this.$refs.scroll.finishPullUp();

      // console.log(111);
    },

    SwiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      this.$refs.scroll.refresh();
      // console.log(this.tabOffsetTop);
    },
    // 网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // this.titles = res.data;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>
<style scoped>
#home {
  padding-top: 44px;
  /* vh视图窗口 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: deeppink;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tabControl {
  position: sticky;
  /* z-index: 10; */
  top: 44px;
}

.content {
  /* height: calc(100% - 49px);
  overflow: hidden; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>