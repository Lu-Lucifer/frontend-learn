export default {
  name: {
    label: '用户名',
    placeholder: '请输入用户名',
    decorator: [
      'name',
      {
        rules: [{ require: true }],
      },
    ],
  },
  nickName: {
    label: '昵称',
    placeholder: '请输入昵称',
    decoratorOptions: {
      rules: [{ require: true }],
    },
  },
  skills: {
    label: '技术栈',
    placeholder: '请输入技术栈',
    decoratorOptions: {
      rules: [{ require: true }],
    },
  },
  companys: {
    label: '履历',
    placeholder: '请输入履历',
    decoratorOptions: {
      rules: [{ require: true }],
    },
  },
};
