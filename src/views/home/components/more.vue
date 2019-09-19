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
                  clickable
                  @click="hideArticle" />
        <van-cell icon="warning-o"
                  title="举报"
                  is-link
                  @click="isShow=true" />
        <van-cell icon="warning-o"
                  title="拉黑"
                  clickable
                  @click="blackList" />
      </van-cell-group>
      <!-- 举报类型 -->
      <van-cell-group v-if="isShow">
        <van-cell icon="arrow-left"
                  @click="isShow=false" />
        <van-cell :title="item.name"
                  v-for="(item,index) in itemList"
                  :key="index"
                  icon="warning-o"
                  clickable
                  @click="report(item.value)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
//导入隐藏文章方法
import { disLike, setBlackList, reportArticle } from '@/api/article'
export default {
  name: 'more',
  props: ['value', 'activeArticleId', 'authorId'],
  data() {
    return {
      //举报文章类型参数
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
  },
  methods: {
    //隐藏文章
    async hideArticle() {
      try {
        //发送请求
        await disLike(this.activeArticleId)
        //告诉home组件删除被点击的元素
        this.$emit('delItem', this.activeArticleId)
        //设置提示成功信息
        this.$toast.success('取关成功')
      } catch (error) {
        this.$toast.fail('取关失败')
      } finally {
        //隐藏面板
        this.$emit('input', false)
      }
    },
    //举报文章
    async report(value) {
      try {
        await reportArticle({
          artId: this.activeArticleId,
          type: value
        })
        //提示信息
        this.$toast.success(
          '您的举报信息我们已经收到，感谢您为网络净化作出的贡献'
        )
      } catch (error) {
        //判断是否已经举报过
        if (error.message.indexOf('409')) {
          this.$toast.fail('当前文章已经被举报过')
        } else {
          this.$toast.fail('系统异常,请稍后再试')
        }
      } finally {
        //回到信息面板
        this.isShow = false
        //关闭更多功能面板
        this.$emit('input', false)
      }
    },
    //拉黑功能
    async blackList() {
      try {
        await setBlackList(this.authorId)
        this.$toast.success('拉黑成功')
      } catch (error) {
        this.$toast.fail('拉黑失败')
      } finally {
        //关闭更多功能面板
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style>
</style>