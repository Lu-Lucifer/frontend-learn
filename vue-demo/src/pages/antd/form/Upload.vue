<template>
  <a-card title="图片上传">
    <h2>自定义图片上传方法</h2>
    <a-form :form="form" v-bind="fieldsLayout">
      <a-form-item
        label="约定（默认）字段"
        extra="映射 {name:'文件名',url:'图片地址'}"
      >
        <pic-upload v-decorator="uploadDecorator.banner" />
      </a-form-item>
      <a-form-item
        label="只含 url 字段"
        extra="映射 {name:'以 url 代替',url:'bannerUrl'}"
      >
        <pic-upload
          v-decorator="uploadDecorator.banner1"
          :fieldMapping="{ name: '', url: 'bannerUrl' }"
        />
      </a-form-item>
      <a-form-item
        label="自定义字段"
        extra="映射 {name:'toutiaoName',url:'toutiaoUrl'}"
      >
        <pic-upload
          v-decorator="uploadDecorator.banner2"
          :fieldMapping="{ name: 'toutiaoName', url: 'toutiaoUrl' }"
        />
      </a-form-item>
      <a-form-item :label="'提交'">
        <a-button @click="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import PicUpload from './modules/PicUpload'

export default {
  components: { PicUpload },
  data() {
    return {
      fieldsLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
      },
      form: this.$form.createForm(this, {}),
      uploadDecorator: {
        banner: ['banner', {
          rules: [{
            required: true,
            message: 'error'
          }],
          initialValue: null
        }],
        banner1: ['banner1', {
          rules: [{
            required: true,
            message: 'error'
          }],
          initialValue: ''
        }],
        banner2: ['banner2', {
          rules: [{
            required: true,
            message: 'error'
          }],
          initialValue: null
        }]
      }
    }
  },
  created() {
    const self = this
    setTimeout(() => {
      self.form.setFieldsValue({
        banner: {
          name: 'antd 上传图片示例',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      })
      self.form.setFieldsValue({
        banner1: 'http://www.eminoda.com/assets/footer/webcatcode.jpg'
      })
      self.form.setFieldsValue({
        banner2: {
          toutiaoName: '头条号-前端雨爸',
          toutiaoUrl: 'http://m.eminoda.com/img/toutiao.f82d4af0.jpeg'
        }
      })

    }, 1000)
  },
  methods: {
    submit() {
      console.log(this.form.getFieldsValue())
    }
  }
}
</script>

<style>
</style>