<template>
  <div id="category">
    <nav-bar>
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :tabMenu="list" @menuItemClick="menuItemClick"></tab-menu>
      <Scroll id="tab-content" ref="scroll">
        <category-list :list="goodsList" @imageLoad="imageLoad"></category-list>
      </Scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/navbar";
import Scroll from "components/common/bscroll/BScroll";

import TabMenu from "./childComps/TabMenu";
import CategoryList from "./childComps/CategoryList";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "@/network/category";
export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabMenu,
    CategoryList,
  },
  data() {
    return {
      list: [],
      goodsList: [],
      currentIndex: 0,
    };
  },
  created() {
    this.getCategories();
  },
  mounted() {},
  methods: {
    // 请求数据
    getCategories() {
      getCategory().then((res) => {
        console.log(res);
        this.list = res.data.category.list;

        this.getSubcategories(0);
      });
    },
    getSubcategories(index) {
      this.currentIndex = index;

      getSubcategory(this.list[index].maitKey).then((res) => {
        console.log(res);
        this.goodsList = res.data.list;
        console.log(res.data.list);
      });
    },
    // 分类菜单点击事件
    menuItemClick(index) {
      this.getSubcategories(index);
      this.$refs.scroll.scroll.scrollTo(0, 0, 100);
    },
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
  overflow: hidden;
}
#tab-content {
  height: 100%;
  flex: 1;
}
</style>