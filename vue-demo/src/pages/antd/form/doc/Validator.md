## 表单动态规则校验

通过表单 a-form 组件自带的 v-decorator 指令，可以很方便的实现表单项的校验、change 事件监听。

```js
// v-decorator="formItems.username.decorator"

this.formItems.username = [
  'username',
  {
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },
];
```

但是可能会遇到表单内，有部分表单项二选一的校验情况。比如：下面的注册表单示例，用户名和邮箱不需要在提交时都校验。

这时，就需要当用户输入用户名后，移除邮箱的校验；反之，输入邮箱时，移除用户名校验。

同时，如果两者都输入时，又需要保持对应的校验逻辑。

那怎么实现呢？下面说下相关细节：

#### onValuesChange

创建表单对象时，设置 onValuesChange 表单值监听属性事件：

```js
this.$form.createForm(this, { onValuesChange: this.onValuesChange });
```

监听表单变动，根据字段逻辑，移除对应字段校验：

```js
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
}
```

### validateFields

这方法相信都用过，用来检验表单字段。它有个细节，可以在第一个参数列表中添加 fields 字段，用来自定义哪些字段需要校验。

```js
Function([fieldNames: string[]], [options: object], callback: Function(errors, values))
```

上面的 onValuesChange 方法中，已经看到我们对 formFields 数组做的改动，所以在执行到 validateFields 方法时，将有针对的进行校验，并在回调方法中，取得表单实际的输入 values 用于提交。

```js
this.form.validateFields(this.formFields, (err, values) => {
  if (!err) {
    this.$message.info('提交成功');
  }
});
```
