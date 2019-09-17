<template>
  <div class="home-wrap">
    <!-- nav导航 -->
    <van-nav-bar title="首页" />
    <!-- tab标签页 频道区域-->
    <van-tabs v-model="tabActive">
      <van-tab v-for="item in channelList"
               :title="item.name"
               :key="item.id">
        <!-- 内容下拉list菜单 -->
        <!-- 下拉刷新组件 -->
        <van-pull-refresh v-model="item.pullLoading"
                          @refresh="onRefresh">
          <van-list v-model="item.dropLoading"
                    :finished="item.finished"
                    finished-text="没有更多了"
                    @load="onLoad">
            <van-cell v-for="(subitem,index) in item.article"
                      :key="index"
                      :title="subitem.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 字体图标插槽 -->
      <van-icon name="wap-nav"
                slot="nav-right"
                @click="doShow" />
    </van-tabs>
    <!-- popup弹出层 -->
    <van-popup v-model="isShow"
               position="bottom"
               :style="{ height: '90%' }">
      <!-- Grid 宫格 -->
      <van-grid>
        <van-grid-item icon="photo-o"
                       text="文字" />
        <van-grid-item icon="photo-o"
                       text="文字" />
        <van-grid-item icon="photo-o"
                       text="文字" />
        <van-grid-item icon="photo-o"
                       text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
//导入频道的api
import { getChannel } from '@/api/channel'
import { getArticle } from '@/api/article'

export default {
  name: 'home',
  data() {
    return {
      //频道激活项目
      tabActive: 0,
      // dropLoading: false,
      // finished: false,
      // pullLoading: false,
      // 下拉菜单list
      // list: [],
      //是否显示popup弹出层
      isShow: false,
      //频道数据
      channelList: []
    }
  },
  methods: {
    //list列表 页面一加载就执行
    async onLoad() {
      //当前激活的频道对象
      console.log('1111')
      let activeChannle = this.channelList[this.tabActive]

      //判断数据是否加载完毕pre_timestamp 返回为null
      if (activeChannle.pre_timestamp == null) {
        //数据加载完毕 修改状态为结束
        activeChannle.finished = true
        activeChannle.dropLoading = false
        return
      }
      //判断是否第一次方法
      if (activeChannle.pre_timestamp === 0) {
        // 动态请求文章数据
        let res = await getArticle({
          channel_id: activeChannle.id,
          timestamp: Date.now(),
          with_top: 1
        })
        activeChannle.article = res.results
        activeChannle.pre_timestamp = res.pre_timestamp
      } else {
        // 第二次进入
        let res = await getArticle({
          channel_id: activeChannle.id,
          timestamp: activeChannle.pre_timestamp,
          with_top: 1
        })
        // 将得到的数据源进行追加到article中
        activeChannle.article = [...activeChannle.article, ...res.results]
        activeChannle.pre_timestamp = res.pre_timestamp
      }

      //加载完毕后  修改dropLoading的状态为false
      activeChannle.dropLoading = false
    },
    //下拉刷新函数
    onRefresh() {
      // window.console.log('下拉执行了')
      //得到当前激活的频道
      let activeChannle = this.channelList[this.tabActive]
      //重置属性
      activeChannle.article = []
      activeChannle.dropLoading = false
      activeChannle.finished = false
      activeChannle.pre_timestamp = 0
      //刷新状态改为false
      activeChannle.pullLoading = false
      //重新请求数据
      this.onLoad()
    },
    //点击显示popup弹出层显示所有频道
    doShow() {
      this.isShow = true
    },
    //动态给频道添加其他属性
    setChannelItem() {
      this.channelList.forEach(item => {
        //这样添加 动态添加的属性也会响应.
        this.$set(item, 'article', [])
        // //添加上拉属性
        this.$set(item, 'dropLoading', false)
        // //添加上拉加载完毕
        this.$set(item, 'finished', false)
        // //添加下拉刷新
        this.$set(item, 'pullLoading', false)
        // //添加上一页的时间戳
        this.$set(item, 'pre_timestamp', 0)
        // //添加文章列表
        // item.article = []
        // //添加上拉属性
        // item.dropLoading = false
        // //添加上拉加载完毕
        // item.finished = false
        // //添加下拉刷新
        // item.pullLoading = false
        // //添加上一页的时间戳
        // item.pre_timestamp = 0
      })
    },
    //获取频道
    async getChannel() {
      //判断用户是否登录
      let { use } = this.$store.state
      if (use) {
        let res = await getChannel()
        this.channelList = res.channels
      } else {
        // 没有登录
        // 获取 localstorage 中的频道数据
        let channelCache = JSON.parse(window.localStorage.getItem('channel'))
        //如果缓存存在
        if (channelCache) {
          this.channelList = channelCache
        } else {
          //不存在 发送请求获取
          let res = await getChannel()
          this.channelList = res.channels
        }
      }

      // 给频道动态添加其它属性
      this.setChannelItem()
      // console.log(this.channelList)
    }
  },
  mounted() {
    //dom渲染最早完成的钩子函数
    this.getChannel()
  }
}
</script>

<style lang="less" scoped>
.home-wrap {
  margin-top: 90px;
  margin-bottom: 50px;
}
.van-nav-bar {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
}

.home-wrap /deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0px;
  width: 90%;
  z-index: 999;
}

.van-icon {
  position: fixed;
  top: 55px;
  right: 5px;
  font-size: 20px;
}

.van-cell {
  height: 100px;
}
</style>