<template>
  <div>
    <!-- popup弹出层 -->
    <van-popup :value="value"
               @input="$emit('input',$event)"
               position="bottom"
               :style="{ height: '90%' }">
      <!-- 我的频道 -->
      <div class="myChannel">
        <div class="top">
          <div class="title">
            我的频道
            <span>点击进入频道</span>
          </div>
          <div class="edit">
            <button v-if="!closeShow"
                    @click="doEdit">编辑</button>
            <button v-else
                    @click="done">完成</button>
          </div>
        </div>
        <!-- grid宫格 -->
        <van-grid clickable>
          <van-grid-item v-for="(item, index) in myChannels "
                         :key="item.id">
            <div class="mytext"
                 slot="text"
                 @click="checkActive(index)">
              <!-- 如果当前自己频道的下标等于home页频道的tabActive 添加类名 -->
              <div :class="{active: index == channelActive}">{{item.name}}</div>
              <van-icon name="close"
                        v-show="closeShow"
                        @click="removeChannel(index)" />
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 频道推荐 -->
      <div class="myChannel">
        <div class="top">
          <div class="title">
            频道推荐
            <span>点击添加频道</span>
          </div>
        </div>
        <!-- grid宫格 -->
        <van-grid clickable>
          <van-grid-item v-for="item in otherChannelList "
                         :key="item.id">
            <div class="mytext"
                 slot="text"
                 @click="addChannel(item)">
              {{item.name}}
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>

</template>

<script>
import { getAllChannel, changeChannelInfo } from '@/api/channel'
export default {
  name: 'channel',
  //父组件传递过来的值  isshow   频道列表    当前选中频道的下标
  props: ['value', 'myChannels', 'channelActive'],
  data() {
    return {
      //删除图片是否显示
      closeShow: false,
      //所有频道
      channelAllList: []
    }
  },
  created() {
    // 组件创建完成,获取到数据
    this.getAllChannelList()
  },
  computed: {
    otherChannelList() {
      //取出myChannel频道中的所有频道id
      let idList = this.myChannels.map(item => {
        return item.id
      })
      // 遍历channelAllList 满足条件的返回 不等于myChannel 频道id的
      let otherChannelList = this.channelAllList.filter(item => {
        return !idList.includes(item.id)
      })
      return otherChannelList
    }
  },
  methods: {
    //切换选中的频道
    checkActive(index) {
      //子组件给父组件传值 数据双向绑定模式
      this.$emit('update:channelActive', index)
    },
    //编辑
    doEdit() {
      //显示删除图标
      this.closeShow = true
    },
    //完成编辑
    done() {
      this.closeShow = false
    },
    //获取所有频道
    async getAllChannelList() {
      let res = await getAllChannel()
      //保存所有频道
      this.channelAllList = res.channels
      //给所有频道添加额外属性()
      this.channelAllList.forEach(item => {
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
      })
    },
    //添加频道信息
    async addChannel(item) {
      //点击将频道添加到我的频道列表
      this.myChannels.push(item)
      let user = this.$store.state.userInfo
      //没有登录的情况
      if (!user || !user.token) {
        //将数据保存到本地
        window.localStorage.setItem('channel', JSON.stringify(this.myChannels))
      } else {
        //将 myChannels 改造成接口需要的参数形式 [{id:channelId ,seq:1}] 但要排除推荐频道
        let channels = this.myChannels.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 发送到服务器完成频道新增更新
        await changeChannelInfo({ channels: channels })
      }
    },
    //删除频道
    async removeChannel(index) {
      //从我的频道中删除当前点击的频道
      this.myChannels.splice(index, 1)
      let user = this.$store.state.userInfo
      //没有登录的情况
      if (!user || !user.token) {
        //将数据保存到本地
        window.localStorage.setItem('channel', JSON.stringify(this.myChannels))
      } else {
        //将 myChannel 改造成接口需要的参数形式 [{id:channelId ,seq:1}] 但要排除推荐频道
        let channels = this.myChannels.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 发送到服务器完成频道新增更新
        await changeChannelInfo({ channels: channels })
      }
    }
  }
}
</script>

<style lang="less" >
.van-popup--bottom {
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
}

.myChannel {
  margin-bottom: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 16px;
      color: #4d4d4d;
      letter-spacing: 1px;
      span {
        font-size: 12px;
        color: #999;
      }
    }
    .edit {
      font-size: 12px;
      color: #fa8c8c;
      button {
        border: 1px solid #fa8c8c;
        background-color: #fff;
        padding: 0 10px;
        border-radius: 10px;
      }
    }
  }
  .mytext {
    font-size: 12px;
    color: #333;
    position: relative;
    .active {
      color: #fa8c8c;
    }
    .van-icon {
      position: absolute;
      top: -6px;
      right: -15px;
      color: #ccc;
      font-size: 14px;
    }
  }
}
</style>