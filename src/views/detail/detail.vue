<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contenScroll">
      <detail-swiper :top-img="topImg"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shops"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="params"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comments"
      ></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar
      class="bottom-nav"
      @addCart="addToCart"
    ></detail-bottom-bar>
    <!-- <toast></toast> -->
  </div>
</template>
<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";

import detailNavBar from "./childComps/detailNavBar";
import detailSwiper from "./childComps/detailSwiper";
import detailBaseInfo from "./childComps/DetailBaseInfo";
import detailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/detailCommentInfo";
import DetailBottomBar from "./childComps/detailBottomBar";

import Scroll from "components/common/bscroll/BScroll.vue";
import GoodsList from "components/content/Goods/GoodsList.vue";
// import Toast from "components/common/toast/toast.vue";

import { itemListenerMixin, backTopMixin } from "@/common/mixin.js";
import { debounce } from "common/utils.js";
import { mapActions } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      iid: "",
      topImg: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      itemImgListen: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: "",
      // toastshow: false,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
  methods: {
    ...mapActions({
      addCart: "addCart",
    }),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },

    contenScroll(position) {
      // 判断backtop是否显示
      this.isShowBackTop = -position.y > 300;
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },

    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },

    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImg[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // console.log(product);33

      // this.addCart("addCart", product).then((res) => {
      //   console.log(res);
      // });
      // 映射
      this.addCart(product).then((res) => {
        // console.log(res);
        // this.toastshow = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.toastshow = false;
        //   this.message = "";
        // }, 1500);
        this.$toast.showToast(res, 1500);
        // console.log(this.$toast);
      });
    },
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;

    // 根据传入的iid请求数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // 获取顶部轮播图
      this.topImg = data.itemInfo.topImages;
      // console.log(this.topImg);

      // 获取商品信息;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺信息
      this.shops = new Shop(data.shopInfo);
      // 获取详情信息
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
        // console.log(this.themeTopYs);
      }, 100);
    });

    getRecommend().then((res) => {
      // console.log(res);
      this.recommend = res.data.list;
    });
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListen);
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  /* left: 0;
  top: 0;
  right: 0; */
  background-color: #fff;
}
.content {
  height: calc(100% - 88px);
  overflow: hidden;
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
}

.bottom-nav {
  position: fixed;
  z-index: 9;
  width: 100%;
  bottom: 0;
  height: 49px;
  background-color: #fff;
}
</style>