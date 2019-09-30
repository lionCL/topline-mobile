<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar title="小智同学"
                 left-arrow
                 fixed
                 @click-left="$router.back()">
      <template slot="right">
        <div class="right">
          ...
        </div>
      </template>
    </van-nav-bar>
    <!-- 时间 -->
    <div class="time">17:05</div>
    <!-- 对话区域 -->
    <ul class="content"
        ref="content">
      <li v-for="(item, index) in messageList"
          :key="index">
        <template v-if="item.isMe">
          <img src="../../assets/imgs/right.png"
               alt=""
               class="imgRight">
          <span class="spanRight">{{item.msg}}</span>
        </template>
        <template v-else>
          <img src="../../assets/imgs/left.gif"
               alt=""
               class="imgLeft">
          <span class="spanLeft">{{item.msg}}</span>
        </template>
      </li>
    </ul>
    <!-- 输入框 -->
    <msg @sendMessaage='reciveMessage'></msg>
  </div>
</template>

<script>
//导入输入框
import msg from '@/views/chat/components/msg.vue'
//导入 socket
import io from 'socket.io-client'
export default {
  name: 'chat',
  data() {
    return {
      //消息数组
      messageList: []
    }
  },
  created() {
    //创建连接
    this.scoket = io('http://ttapi.research.itcast.cn', {
      token: this.$store.state.userInfo.token
    })
    //开始连接
    this.scoket.on('connect', function() {
      console.log('连接成功')
    })

    //接收响应的数据
    this.scoket.on('message', msg => {
      this.messageList.push({
        msg: msg.msg,
        isMe: false
      })
      // console.log(msg)
    })
  },
  methods: {
    //接受输入的内容
    reciveMessage(value) {
      // console.log(value)
      this.messageList.push({
        msg: value,
        isMe: true
      })
      //发送请求
      this.scoket.emit('message', {
        msg: value,
        timestamp: Date.now()
      })
    }
  },
  components: {
    msg
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  z-index: 99 !important;
  .van-icon-arrow-left {
    color: #fff;
  }
  .right {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
}

.time {
  text-align: center;
  color: #ccc;
  font-size: 12px;
  margin-top: 10px;
  margin-top: 56px;
}

.content {
  padding: 5px;
  overflow: auto;
  margin-bottom: 65px;

  li {
    margin-top: 10px;
    padding-left: 10px;
    display: block;
    clear: both;
    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
    }
  }
}

.content li img {
  float: left;
}
.content li span {
  font-size: 12px;
  background: #e0effb;
  padding: 5px;
  border-radius: 10px;
  float: left;
  margin: 6px 10px 0 10px;
  // max-width: 310px;
  border: 1px solid #ccc;
  box-shadow: 0 0 3px #ccc;
}
.content li img.imgLeft {
  float: left;
}
.content li img.imgRight {
  float: right;
}
.content li span.spanLeft {
  float: left;
  background: #fff;
}
.content li span.spanRight {
  float: right;
  background: #7cfc00;
}
</style>