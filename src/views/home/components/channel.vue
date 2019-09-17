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
            <button>编辑</button>
          </div>
        </div>
        <!-- grid宫格 -->
        <van-grid clickable>
          <van-grid-item v-for="(item, index) in 8"
                         :key="index">
            <div class="mytext"
                 slot="text">
              <div>推荐</div>
              <van-icon name="close" />
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
          <div class="edit">
            <button>编辑</button>
          </div>
        </div>
        <!-- grid宫格 -->
        <van-grid clickable>
          <van-grid-item v-for="(item, index) in 8"
                         :key="index">
            <div class="mytext"
                 slot="text">
              <div>推荐</div>
              <van-icon name="close" />
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>

</template>

<script>
export default {
  name: 'channel',
  props: ['value']
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