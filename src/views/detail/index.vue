<template>
  <div>
    <!-- nav顶部 -->
    <van-nav-bar fixed
                 title="文章详情"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 标题部分 -->
    <van-cell>
      <template slot="title">
        <div class="mytitle">{{articleDetailList.title}}</div>
      </template>
    </van-cell>
    <!-- 作者信息展示区 -->
    <author :articleDetailList='articleDetailList'></author>
    <!-- 文章内容 -->
    <van-cell>
      <template slot="title">
        <div v-html="articleDetailList.content"></div>
      </template>
    </van-cell>
    <!--点赞&不喜欢-->
    <likebtn :articleDetailList='articleDetailList'></likebtn>
    <!-- 评论区域-->
    <comment></comment>
    <!-- 留言区域-->
    <message></message>
  </div>
</template>

<script>
//导入子组件
import author from '@/views/detail/components/author.vue'
import likebtn from '@/views/detail/components/likebtn.vue'
import comment from '@/views/detail/components/comment.vue'
import message from '@/views/detail/components/message.vue'
//导入获取文章详情方法
import { getArticleDetail } from '@/api/article'
export default {
  name: 'detail',
  data() {
    return {
      //文章详情数据
      articleDetailList: ''
    }
  },
  mounted() {
    this.getAllDetail()
  },
  methods: {
    //获取文章详情
    async getAllDetail() {
      //获取文章id
      let article_id = this.$route.params.artid
      //发送请求
      let res = await getArticleDetail(article_id)
      // console.log(res)
      this.articleDetailList = res
    }
  },
  components: {
    author,
    likebtn,
    comment,
    message
  }
}
</script>

<style lang="less" scoped>
.van-icon-arrow-left {
  color: #fff;
}
.mytitle {
  margin-top: 46px;
  font-weight: 700;
  font-size: 20px;
}
</style>