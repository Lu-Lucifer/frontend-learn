import { FormModel } from 'ant-design-vue';

/**
 * todolist
 * - 创建 form 对象
 * - 验证表单
 *  - 支持字段增减
 *  - promise 返回
 * - 业务功能
 *  - 字段二选一验证
 *  - 部分字段依赖其他字段值
 *  - 检验规则动态化
 */
class Form {
  constructor(options) {
    this._vue = options._vue;
    this.$form = this._vue.$form || options.$form;
    this.formOptions = options.formOptions || {};
  }

  createForm() {
    return this.$form.createForm(this._vue, this.formOptions);
  }

  createFormItemsProps(props) {}
}

class FormItem {
  constructor() {}

  initProps() {}
}
export default Form;
