<template>
  <a-form :form="form">
    <a-form-item
      :label="formFields.name.label"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 6 }"
    >
      <a-input
        :placeholder="formFields.name.placeholder"
        v-decorator="formFields.name.decorator"
      />
    </a-form-item>
    <a-form-item
      :label="formFields.nickName.label"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 6 }"
    >
      <a-input
        :placeholder="formFields.nickName.placeholder"
        v-decorator="buildDecorator('nickName')"
      />
    </a-form-item>
    <!-- 
        Q: Warning: [antdv: Form.Item] Cannot generate `validateStatus` and `help` automatically, while there are more than one `getFieldDecorator` in it.
        A: a-form-item 标签中，只能出现一个被 decorator 修饰的元素

        Q: Warning: You cannot set a form field before rendering a field associated with the value. You can use `getFieldDecorator(id, options)` instead `v-decorator="[id, options]"` to register it before render.
        A: 使用 getFieldValue、setFieldsValue  api 前，页面一定要注册过 v-decorator；并且如果是遍历形式，必定要在 created 中执行
     -->
    <!-- <div v-for="(item, index) of ['vue', 'angular', 'react']" :key="index"> -->

    <a-row>
      <a-col :span="4" class="ant-form-item-label">
        <label for="">{{ formFields.skills.label }}</label>
      </a-col>
      <a-col :span="8" style="display: flex;justify-content: space-between;">
        <a-form-item v-for="(item, index) of model.skills" :key="index">
          <a-input
            :placeholder="formFields.skills.placeholder"
            v-decorator="buildDecorator(`skills[${index}]`, 'skills')"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="4" class="ant-form-item-label">
        <label for="">{{ formFields.companys.label }}</label>
      </a-col>
      <a-col :span="8" style="display: flex;justify-content: space-between;">
        <a-tabs>
          <a-tab-pane
            forceRender
            :tab="'Tab ' + (index + 1)"
            v-for="(item, index) of model.companys"
            :key="index"
          >
            <a-form-item
              label="公司名称"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 6 }"
            >
              <a-input
                :placeholder="formFields.companys.placeholder"
                v-decorator="
                  buildDecorator(`companys[${index}][name]`, 'companys')
                "
              />
            </a-form-item>
            <a-form-item
              label="职级"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 6 }"
            >
              <a-input
                :placeholder="formFields.companys.placeholder"
                v-decorator="
                  buildDecorator(`companys[${index}][title]`, 'companys')
                "
              />
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>

    <a-form-item :wrapper-col="{ offset: 4, span: 6 }">
      <a-button @click="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
/**
 * 普通 key-value 表单回显
 * 动态 v-decorator 的设置（针对数组）
 * 
 * 动态验证
 * 动态表单项显示/隐藏
 */
import userFormFields from './data/userFormFields'
export default {
  data() {
    return {
      form: this.$form.createForm(this, {}),
      formFields: userFormFields,
      model: {}
    }
  },
  methods: {
    buildDecorator(id, field) {
      return [id, this.formFields[field || id].decoratorOptions]
    },
    initData(data) {
      /**
       * 防止 form 报错，在 template 模板中使用 model 动态渲染
       * 这样就不用在 created、beforeCreated 特殊定义 getFieldDecorator
       */
      this.model = data;
      /**
       * 调用 setFieldsValue 前，提前需要设置 v-decorator="[id, options] 或者 getFieldDecorator(id, options)
       */
      console.log('nextTick')
      this.$nextTick(() => {
        for (let key in data) {
          const val = data[key]
          if (Array.isArray(val)) {
            for (let i = 0; i < val.length; i++) {
              const item = val[i]
              if (typeof item === 'object') {
                if (item) {
                  for (let itemKey in item) {
                    const fieldName = `${key}[${i}][${itemKey}]`

                    this.form.setFieldsValue({ [fieldName]: item[itemKey] })
                  }
                }

              } else {
                this.form.setFieldsValue({ [key]: val })
              }
            }
          } else {
            this.form.setFieldsValue({ [key]: val })
          }
        }
        console.log(this.form.getFieldsValue())
      })
    },
    submit() {
      this.form.validateFields((err, values) => {
        console.log(JSON.stringify(values))
      })
    }
  },
  created() {
    setTimeout(() => {
      this.initData({
        name: 'eminoda',
        nickName: '前端雨爸',
        skills: ['vue', 'angular', 'react'],
        companys: [{
          name: '聪牛金融',
          title: '初级前端工程师'
        }, {
          name: '平台健康险',
          title: '中级前端工程师'
        }]
      })
    }, 500)
  }
}
</script>

<style>
</style>