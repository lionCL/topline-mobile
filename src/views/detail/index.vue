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
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="getAllComment">
      <div v-for="(item, index) in commentList"
           :key="index">
        <comment :commentItem="item"></comment>
      </div>
    </van-list>

    <!-- 留言区域-->
    <message :artid='$route.params.artid'
             @setComment="getComment"></message>

    <!-- 回复评论 popub弹出层 -->
    <van-popup v-model="isShow"
               position="bottom"
               :style="{ height: '60%' }">
      <comment :commentItem="currentCommentObj" />
    </van-popup>
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
//获取评论
import { getComments } from '@/api/comment'
//引入eventBus
import vueBus from '@/utils/eventBus'

export default {
  name: 'detail',
  data() {
    return {
      //文章详情数据
      articleDetailList: {},
      //文章评论数据
      commentList: [],
      //每页评论的条数
      limit: 10,
      //评论数据加载完毕标识
      end_id: -1,
      //分页表示
      offset: 0,
      //list组件参数
      loading: false,
      finished: false,
      //当前的评论数据源
      currentCommentObj: {},
      //popup的显示隐藏
      isShow: false
    }
  },
  mounted() {
    this.getAllDetail()
    // this.getAllComment()

    //挂在eventBus 事件  注意箭头函数 不然this指向vueBus
    vueBus.$on('showPopup', obj => {
      this.isShow = obj.show
      this.currentCommentObj = obj
      console.log(this.currentCommentObj)
    })
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
    },
    //获取评论数
    async getAllComment() {
      //第一次请求
      if (this.offset === 0) {
        //获取文章id
        let art_id = this.$route.params.artid
        let res = await getComments({
          type: 'a',
          source: art_id,
          limit: this.limit
        })
        // console.log(res)
        this.commentList = res.results
        // console.log(this.commentList)
        // console.log(this)
        this.offset = res.last_id
        this.end_id = res.end_id
      } else {
        //第二次以后请求需要带上offset
        let art_id = this.$route.params.artid
        let res = await getComments({
          type: 'a',
          source: art_id,
          offset: this.offset,
          limit: this.limit
        })
        //数据追加到commentList中
        this.commentList = [...this.commentList, ...res.results]
        this.offset = res.last_id
        this.end_id = res.end_id
      }

      //判断是否加载完毕
      if (this.offset == this.end_id) {
        this.loading = false
        this.finished = true
        return
      }

      this.loading = false
    },
    //子组件传递过来的评论 动态添加到评论列表中
    getComment(value) {
      this.commentList.unshift({
        ...value.new_obj,
        art_id: value.art_id,
        com_id: value.com_id
      })
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

.van-list {
  margin-bottom: 65px;
}
</style>