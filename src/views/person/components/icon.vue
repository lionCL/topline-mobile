<template>
  <div>
    <van-dialog :value='value'
                @input="$emit('input', $event)"
                :showCancelButton="false"
                :showConfirmButton="false"
                close-on-click-overlay>
      <van-cell-group>
        <van-cell title="从相册中选择"
                  is-link
                  @click="openFile">
          <template slot="label">
            <!-- 隐藏的一个文本输入框 -->
            <input type="file"
                   ref="myfile"
                   style="display: none"
                   id="file">
          </template>
        </van-cell>
        <van-cell title="拍照"
                  is-link />
        <van-cell title="取消"
                  @click="$emit('input',false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
//导入vat图片预览组件
import { ImagePreview } from 'vant'
//导入保存头像的API
import { editUserIcon } from '@/api/user.js'

export default {
  name: 'icon',
  props: ['value'],
  computed: {
    //获取input dom元素
    file: function() {
      return this.$refs.myfile
    }
  },
  methods: {
    //打开文件
    openFile() {
      //上传图片过程
      //绑定一个事件
      this.file.onchange = () => {
        //得到图片
        let myfile = this.file.files[0]
        //1.将文件转换为base64的图片
        let reader = new FileReader()
        //2.设置转换逻辑
        reader.addEventListener('load', res => {
          //预览图片  res转换完后返回的对象集合
          ImagePreview({
            images: [res.target.result],
            // 注意这里不能简写 onClose() {} this会改变
            onClose: () => {
              this.$dialog
                .confirm({
                  title: '注意',
                  message: '是否需要将当前图片保存为头像'
                })
                .then(async () => {
                  let resData = await editUserIcon(myfile)
                  // console.log('---------------------')
                  // console.log(resData)
                  //将数据传递给父组件
                  this.$emit('changeMyIcon', resData)
                  this.$toast.success('头像修改成功')
                })
            }
          })
          //关闭弹框
          this.$emit('input', false)
        })
        //3.开始转换
        reader.readAsDataURL(myfile)
      }

      //点击cell时候触发input的点击事件
      this.file.click()
    }
  }
}
</script>

<style>
</style>