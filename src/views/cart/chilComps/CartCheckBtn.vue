<template>
  <div class="content">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-check="isSelectAll"
        @click.native="ClickBtn"
      >
      </check-button>
      <span>全选</span>
    </div>
    <div class="total">合计:{{ totalPrice }}</div>
    <div class="caclculate" @click="calcClick">去计算({{ CheckLength }})</div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartCheckBtn",
  components: {
    CheckButton,
  },
  methods: {
    ClickBtn() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.showToast("请选择要购买的商品");
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    CheckLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // 使用filter
      // return !this.cartList.filter((item) => !item.checked).length;
      if (this.cartList.length == 0) {
        return false;
      }
      // 使用find
      // return !this.cartList.find((item) => !item.checked);

      // 使用普通遍历
      for (const item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>
<style scoped>
.content {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;
  font-size: 16px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 30%;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.total {
  flex: 1;
  text-align: center;
}
.caclculate {
  width: 30%;
  text-align: center;
  color: black;
  background-color: red;
}
</style>