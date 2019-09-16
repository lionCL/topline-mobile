<template>
  <div class="home-wrap">
    <!-- nav导航 -->
    <van-nav-bar title="首页" />
    <!-- tab标签页 频道区域-->
    <van-tabs>
      <van-tab v-for="index in 8"
               :title="'标签 ' + index"
               :key="index">
        <!-- 内容下拉list菜单 -->
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <van-cell v-for="item in list"
                    :key="item"
                    :title="item" />
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
export default {
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 12, 12, 12, 12],
      isShow: false
    }
  },
  methods: {
    //list列表 页面一加载就执行
    onLoad() {
      window.console.log('执行了')
    },
    //点击显示所有频道
    doShow() {
      this.isShow = true
    }
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