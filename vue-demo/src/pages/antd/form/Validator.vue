<template>
  <div>
    <div class="markdown-body" v-html="doc"></div>
    <a-card title="注册表单示例">
      <a-form :form="form">
        <a-form-item
          :label="formItems.username.label"
          :labelCol="formItems.username.labelCol"
          :wrapperCol="formItems.username.wrapperCol"
        >
          <a-input
            v-decorator="formItems.username.decorator"
            :placeholder="formItems.username.placeholder"
          />
        </a-form-item>
        <a-form-item
          :label="formItems.email.label"
          extra="用户名，邮箱可二选一"
          :labelCol="formItems.email.labelCol"
          :wrapperCol="formItems.email.wrapperCol"
        >
          <a-input
            v-decorator="formItems.email.decorator"
            :placeholder="formItems.email.placeholder"
          />
        </a-form-item>
        <a-form-item
          :label="formItems.password.label"
          :labelCol="formItems.password.labelCol"
          :wrapperCol="formItems.password.wrapperCol"
        >
          <a-input
            v-decorator="formItems.password.decorator"
            :placeholder="formItems.password.placeholder"
          />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 4, offset: 3 }">
          <a-button type="primary" @click="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doc: require('./doc/Validator.md'),
      form: this.$form.createForm(this, { onValuesChange: this.onValuesChange }),
      formFields: this.initFormFields(),
      formItems: {
        username: {
          labelCol: { span: 3 },
          wrapperCol: { span: 4 },
          label: '用户名',
          placeholder: '请输入用户名',
          decorator: ['username', {
            rules: [{
              required: true,
              message: '请输入用户名'
            }]
          }]
        },
        email: {
          labelCol: { span: 3 },
          wrapperCol: { span: 4 },
          label: '邮箱',
          placeholder: '请输入邮箱',
          decorator: ['email', {
            rules: [{
              required: true,
              message: '请输入邮箱'
            }, {
              pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
              message: '请输入正确的邮箱'
            }]
          }]
        },
        password: {
          labelCol: { span: 3 },
          wrapperCol: { span: 4 },
          label: '密码',
          placeholder: '请输入密码',
          decorator: ['password', {
            rules: [{
              required: true,
              message: '请输入密码'
            }, {
              pattern: /(?=.*\d+)(?=.*[a-zA-Z]+)[0-9a-zA-Z]{6,10}/,
              message: '请输入6~10位的数字和字母'
            }]
          }]
        }
      }
    }
  },
  methods: {
    // 默认表单校验的 field 字段
    initFormFields() {
      return ['username', 'email', 'password']
    },
    // 监听表单字段值的更新
    onValuesChange(props, value, values) {
      const formFields = this.initFormFields();
      // 根据字段逻辑，移除对应字段校验
      if (values.username && !values.email) {
        props.form.resetFields(['email']);
        formFields.splice(formFields.indexOf('email'), 1)
      } else if (!values.username && values.email) {
        props.form.resetFields(['username']);
        formFields.splice(formFields.indexOf('username'), 1)
      }
      this.formFields = formFields;
    },
    submit() {
      // 校验表单
      this.form.validateFields(this.formFields, (err, values) => {
        if (!err) {
          console.log(values)
          this.$message.info('提交成功')
        }
      });
    }
  }
}
</script>

<style>
</style>