<template>
  <div>
    <van-cell>
      <template slot="title">
        <van-button type="danger"
                    size="small">点赞</van-button>
        <van-button type="default"
                    size="small">不喜欢</van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'likebtn'
}
</script>

<style lang="less" scoped>
.van-cell {
  text-align: center;
  .van-button {
    margin: 0 15px;
  }
}
</style>