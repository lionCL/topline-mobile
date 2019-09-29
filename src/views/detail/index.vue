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
        <div class="artContet"
             v-html="articleDetailList.content"></div>
      </template>
    </van-cell>

    <!--点赞&不喜欢-->
    <likebtn :articleDetailList='articleDetailList'></likebtn>

    <!-- 评论渲染区域 comment-->
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="getAllComment">
      <div v-for="(item, index) in commentList"
           :key="index">
        <comment :commentItem="item"
                 :firstComment='true'></comment>
      </div>
    </van-list>

    <!-- 文章评论留言区域 message-->
    <message :artid='$route.params.artid'
             @setComment="getComment"
             :firstMessage='true'></message>

    <!-- 回复评论 popub弹出层 -->
    <van-popup v-model="isShow"
               position="bottom"
               @open="openPopup"
               @closed='closePopup'
               :style="{ height: '60%' }">
      <!-- 当前评论: -->
      <comment :commentItem="currentCommentObj"
               :firstComment='false' />
      <!-- 留言回复区的留言组件 -->
      <van-cell>
        <template slot="title">
          <h4>评论列表:</h4>
        </template>
      </van-cell>
      <!-- 渲染服务器返回的评论 -->
      <van-list v-model="replayLoading"
                :finished="replayFinished"
                finished-text="没有更多了"
                @load="getAllReplayComment">
        <div v-for="(item, index) in replayComment"
             :key="index">
          <comment :commentItem="item"
                   :firstComment='false'></comment>
        </div>
      </van-list>
      <!-- 发表评论message组件:  评论回复里面的 -->
      <message :firstMessage='false'
               :artid='$route.params.artid'
               :commentid="currentCommentId"
               @setComment="getReplayComment"></message>
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
      isShow: false,

      //当前评论的id
      currentCommentId: 0,
      //当前的评论回复数据
      replayComment: [],
      replayendId: -1,
      replayoffset: 0,
      //评论回复组件里的list
      replayLoading: false,
      replayFinished: false
    }
  },
  mounted() {
    this.getAllDetail()

    //挂在eventBus 事件  注意箭头函数 不然this指向vueBus
    vueBus.$on('showPopup', obj => {
      this.isShow = obj.show
      this.currentCommentObj = obj
      //保存当前的评论id
      this.currentCommentId = this.currentCommentObj.com_id
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
    //获取文章评论数
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
    //获取评论回复
    async getAllReplayComment() {
      // console.log('11111111')
      // console.log('执行了第2个list')
      if (this.replayoffset == this.replayendId) {
        this.replayLoading = false
        this.replayFinished = true
        return
      }
      //第一次请求
      if (this.replayoffset === 0) {
        let res = await getComments({
          type: 'c',
          source: this.currentCommentId,
          limit: this.limit
        })
        this.replayComment = res.results
        // console.log('-----------评论的响应回的数据')
        // console.log(res)
        this.replayoffset = res.last_id
        this.replayendId = res.end_id
      } else {
        let res = await getComments({
          type: 'c',
          source: this.currentCommentId,
          offset: this.replayoffset,
          limit: this.limit
        })
        //追加评论
        this.replayComment = [...this.replayComment, ...res.results]
        // console.log(this.replayComment + '----------------')
        this.replayoffset = res.last_id
        this.replayendId = res.end_id
      }
      //关闭加载
      this.replayLoading = false
    },
    //子组件传递过来的评论 动态添加到评论列表中
    getComment(value) {
      this.commentList.unshift({
        ...value.new_obj,
        art_id: value.art_id,
        com_id: value.com_id
      })
    },
    //得到评论回复完成之后的响应数据
    getReplayComment(value) {
      this.replayComment.unshift({
        ...value.new_obj,
        art_id: value.art_id,
        com_id: value.com_id
      })
    },
    //关闭弹出层
    closePopup() {
      // console.log('11111111')
      this.replayComment = []
      this.replayendId = -1
      this.replayoffset = 0
      this.replayFinished = false
      this.replayLoading = false
    },
    openPopup() {
      // console.log('222222')
      this.getAllReplayComment()
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
.van-cell__title {
  width: 100%;
  .artContet {
    width: 100%;
    .pgc-img {
      width: 100%;
    }
  }
}

.van-list {
  margin-bottom: 65px;
}
</style>