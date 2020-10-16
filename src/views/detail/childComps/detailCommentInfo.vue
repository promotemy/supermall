<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="header">
      <div>用户评价</div>
      <div>更多 >></div>
    </div>
    <div class="user">
      <img :src="commentInfo.user.avatar" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="comment">
      {{ commentInfo.content }}
    </div>
    <div class="other-info">
      <div class="time">{{ commentInfo.created }}</div>
      <div class="style">{{ commentInfo.style }}</div>
    </div>
    <div class="picture">
      <div v-for="(item, index) in commentInfo.images" :key="index">
        <img :src="item" mode="widthFix" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
    },
  },
};
</script>
<style scoped>
.comment-info {
  padding: 10px 10px;
  border-bottom: 1px solid #f2f2f2;
}

.header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  font-size: 20px;
  border-bottom: 1px solid #eee;
}

.user {
  margin: 10px 0;
  /* height: 100px; */
}

.user img {
  width: 84px;
  height: 84px;
  vertical-align: middle;
  border-radius: 42px;
}

.user sapn {
  vertical-align: middle;
  margin-left: 16px;
  font-size: 20px;
  color: #666;
}

.comment {
  font-size: 16px;
  text-indent: 1.5em;
  line-height: 1.5;
}

.other-info {
  display: flex;
  font-size: 16px;
  margin-top: 20px;
  color: #888;
}

.other-info .time {
  margin-right: 10px;
}

.picture {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.picture img {
  max-width: 30%;
}
</style>