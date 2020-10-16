import { debounce } from "@/common/utils.js";
import BackTop from "components/content/back-Top/BackTop.vue";
export const itemListenerMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListen = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListen);
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // console.log("sss");
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  },
}