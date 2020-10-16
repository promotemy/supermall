<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="@/assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="items"
        @click="detailClick(index)"
        :class="{ active: currentIndex === index }"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </nav-bar>
</template>
<script>
import NavBar from "@/components/common/navbar/navbar.vue";
export default {
  name: "detailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    detailClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
      // console.log(this.currentIndex);
    },

    backClick() {
      this.$router.go(-1);
      // this.$router.back();
    },
  },
};
</script>
<style scoped>
.title {
  display: flex;
}
.items {
  flex: 1;
  padding: 0;
}
.active {
  color: red;
}
.active span {
  padding: 5px;
  border-bottom: 1px solid red;
}

.back img {
  margin-top: 20%;
  margin-left: 30%;
}
</style>