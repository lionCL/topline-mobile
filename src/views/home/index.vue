<template>
  <div class="home-wrap">
    <!-- nav导航 -->
    <van-nav-bar title="首页" />
    <!-- tab标签页 频道区域-->
    <van-tabs v-model="tabActive">
      <van-tab v-for="item in channleList"
               :title="item.name"
               :key="item.id">
        <!-- 内容下拉list菜单 -->
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <van-cell v-for="item in list"
                    :key="item"
                    :title="item" />
          内容
        </van-list>
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
//导入频道的pai
import { getChannel } from '@/api/channel'
export default {
  name: 'home',
  data() {
    return {
      //频道激活项目
      tabActive: 0,
      loading: false,
      finished: false,
      // 下拉菜单list
      list: [],
      //是否显示popup弹出层
      isShow: false,
      //频道数据
      channleList: []
    }
  },
  methods: {
    //list列表 页面一加载就执行
    onLoad() {
      window.console.log('执行了')
    },
    //点击显示popup弹出层显示所有频道
    doShow() {
      this.isShow = true
    },
    //获取频道
    async getChannel() {
      //判断用户是否登录
      let { use } = this.$store.state
      if (use) {
        let res = await getChannel()
        this.channleList = res.channels
      } else {
        // 没有登录
        // 获取 localstorage 中的频道数据
        let channelCache = JSON.parse(window.localStorage.getItem('channel'))
        //如果缓存存在
        if (channelCache) {
          this.channleList = channelCache
        } else {
          //不存在 发送请求获取
          let res = await getChannel()
          this.channleList = res.channels
        }
      }
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
</style>