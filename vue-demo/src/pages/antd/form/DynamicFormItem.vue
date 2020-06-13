<template>
  <div>
    <!-- <div class="markdown-body" v-html="doc"></div> -->
    <a-card title="动态表单 Demo">
      <a-form :form="form">
        <a-row
          type="flex"
          justify="start"
          v-for="(dynamicFields, index) of dynamicGroup"
          :key="index"
        >
          <a-col :span="6" v-for="(item, key) of dynamicFields" :key="key">
            <a-form-item :label="item.label" v-bind="fieldsLayout">
              <a-input
                :placeholder="item.placeholder"
                v-decorator="
                  item.decorator(`tree[${index}][${item.fieldName}]`)
                "
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item :wrapperCol="{ offset: 5, span: 19 }">
              <a-button
                style="width:100%"
                type="dashed"
                @click="addDynamicGroup"
                >Add</a-button
              >
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="start">
          <a-col :span="6">
            <a-form-item :wrapperCol="{ offset: 10 }">
              <a-button @click="submit">表单验证</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doc: require('./doc/DynamicFormItem.md'),
      fieldsLayout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      },
      dynamicGroup: [],
      // form 字段基础配置
      dynamicFields: [
        {
          fieldName: 'username',
          label: '用户名',
          placeholder: '请输入用户名',
          decorator(key) {
            return [key, {
              rules: [{
                required: true,
                message: '请输入用户名'
              }]
            }]
          }
        },
        {
          fieldName: 'nickname',
          label: '昵称',
          placeholder: '请输入昵称',
          decorator(key) {
            return [key, {
              rules: [{
                required: true,
                message: '请输入昵称'
              }]
            }]
          }
        }
      ]
    }
  },
  methods: {
    addDynamicGroup() {
      this.dynamicGroup.push(this.dynamicFields)
    },
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('表单验证 ok，可以提交')
          console.log(values)
        }
      })
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {});
  },
  created() {
    const self = this;
    this.addDynamicGroup()
    setTimeout(function() {
      // 接口返回
      const tree = [{ username: '前端雨爸', nickname: 'eminoda' }]
      self.$nextTick(function() {
        for (let i = 0; i < tree.length; i++) {
          const item = tree[i]
          for (let key in item) {
            self.form.setFieldsValue({
              [`tree[${i}][${key}]`]: item[key]
            })
          }
        }
      })
    }, 1000)
  }
}
</script>

<style>
</style>