<template>
  <div>
    <van-dialog :value="value"
                @input="$emit('input',$event)"
                :showConfirmButton='false'
                closeOnClickOverlay
                closeOnPopstate>
      <!-- 更多操作-->
      <van-cell-group v-if="!isShow">
        <van-cell icon="warning-o"
                  title="隐藏此文章"
                  clickable />
        <van-cell icon="warning-o"
                  title="举报"
                  is-link
                  @click="isShow=true" />
        <van-cell icon="warning-o"
                  title="拉黑"
                  clickable />
      </van-cell-group>
      <!-- 举报类型 -->
      <van-cell-group v-if="isShow">
        <van-cell icon="arrow-left"
                  @click="isShow=false" />
        <van-cell :title="item.name"
                  v-for="(item,index) in itemList"
                  :key="index"
                  icon="warning-o"
                  clickable />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'more',
  props: ['value'],
  data() {
    return {
      itemList: [
        { value: 0, name: '其他问题' },
        { value: 1, name: '标题夸张' },
        { value: 2, name: '低俗色情' },
        { value: 3, name: '错别字多' },
        { value: 4, name: '旧闻重复' },
        { value: 5, name: '广告软文' },
        { value: 6, name: '内容不实' },
        { value: 7, name: '涉嫌违法犯罪' },
        { value: 8, name: '侵权' }
      ],
      //是否显示举报类型
      isShow: false
    }
  }
}
</script>

<style>
</style>