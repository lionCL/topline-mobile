<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar title="我的"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 个人信息区-->
    <van-cell class="top">
      <template slot="title">
        <div class="userMsg">
          <div class="left"
               @click="toPerson">
            <van-image width="48px"
                       height="48px"
                       fit="cover"
                       round
                       :src="userInfo.photo" />
          </div>
          <div class="middle"
               @click="toPerson">
            <van-cell :title="userInfo.name">
              <template slot="label">
                <van-button type="primary"
                            v-if="userInfo.certi==''"
                            round
                            size="mini">申请认证</van-button>
                <van-button type="primary"
                            v-else
                            round
                            size="mini">已认证</van-button>
              </template>
            </van-cell>
          </div>
          <div class="right">
            <div>
              <van-icon name="notes-o" />
            </div>
            <div class="name">
              <van-cell class="mycell">
                <template slot="title">
                  <div class="today">今日阅读</div>
                </template>
                <template slot="label">
                  <div class="min">5分钟</div>
                </template>
              </van-cell>
            </div>
          </div>
        </div>
        <van-grid :column-num="3">
          <van-grid-item text="动态">
            <template slot="icon">
              {{userInfo.art_count}}
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o"
                         text="关注">
            <template slot="icon">
              {{userInfo.follow_count}}
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o"
                         text="粉丝">
            <template slot="icon">
              {{userInfo.fans_count}}
            </template>
          </van-grid-item>
        </van-grid>
      </template>
    </van-cell>
    <!-- 状态区域 -->
    <van-grid :column-num="3"
              clickable
              class="statuInfo">
      <van-grid-item text="收藏">
        <template slot="icon">
          <van-icon class="star"
                    name="star-o" />
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template slot="icon">
          <van-icon class="clock"
                    name="clock-o" />
        </template>
      </van-grid-item>
      <van-grid-item text="作品">
        <template slot="icon">
          <van-icon class="records"
                    name="records" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 选项1 -->
    <van-cell-group class="selection">
      <van-cell title="消息通知"
                is-link />
      <van-cell title="实名认证"
                is-link />
    </van-cell-group>
    <!-- more -->
    <van-cell-group class="selection">
      <van-cell title="用户反馈"
                is-link />
      <van-cell title="小智同学"
                is-link to="/chat"/>
      <van-cell title="系统设置"
                is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'my',
  data() {
    return {
      //用户自己信息列表
      userInfo: {}
    }
  },

  created() {
    this.getUserAllInfo()
  },
  methods: {
    //获取用户自己信息
    async getUserAllInfo() {
      //检测用户是否登陆了
      this.$login()
      let res = await getUserInfo()
      // console.log(res)
      this.userInfo = res
    },
    //调转个人详情信息设置也
    toPerson() {
      this.$router.push({ name: 'person' })
      //等同于 this.$router.push('/person)
    }
  }
}
</script>

<style lang="less" scoped>
.van-icon-arrow-left {
  color: #fff;
}
top {
  background-color: blue;
}
.userMsg {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .right {
    position: absolute;
    top: 13px;
    right: -15px;
    display: flex;
    align-items: center;
    width: 80px;
    height: 45px;
    background-color: #ccc;
    border-radius: 33px 0 0 33px;
    padding: 0 10px;
    .van-icon {
      font-size: 18px;
      color: #fff;
    }
    .name {
      background-color: #ccc;
      .today,
      .min {
        font-size: 12px;
        color: #fff;
      }
      .mycell {
        margin-left: 10px;
        padding: 0;
        background-color: #ccc;
      }
    }
  }
}

.statuInfo {
  border-bottom: 8px solid #f5f7f9;
  .star {
    font-size: 20px;
    margin-bottom: 5px;
    color: #eb5253;
  }
  .clock {
    font-size: 20px;
    margin-bottom: 5px;
    color: #ff9d1d;
  }
  .records {
    font-size: 20px;
    margin-bottom: 5px;
    color: #678eff;
  }
}

.selection {
  border-bottom: 8px solid #f5f7f9;
}
</style>