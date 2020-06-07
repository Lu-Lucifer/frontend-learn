<template>
  <div>
    <div class="markdown-body" v-html="doc1"></div>
    <!-- 1 -->
    <a-card title="grid 栅格对照">
      <a-row class="demo" :gutter="24">
        <a-col :span="1" v-for="(item, index) in 24" :key="index"
          >col-{{ index + 1 }}
        </a-col>
      </a-row>
    </a-card>
    <!-- 2 -->
    <a-card title="常见的表单布局">
      <a-row class="demo" :gutter="24">
        <a-col :span="3">col-3 </a-col>
        <a-col :span="5">col-5 </a-col>
      </a-row>
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 5 }">
        <a-form-item label="用户名">
          <a-input />
        </a-form-item>
        <a-form-item label="密码">
          <a-input />
        </a-form-item>
      </a-form>
    </a-card>
    <!-- 3 -->
    <div class="markdown-body" v-html="doc2"></div>
    <a-card title="不含 label 的表单项">
      <a-row class="demo" :gutter="24">
        <a-col :span="3">col-3 </a-col>
        <a-col :span="5">col-5 </a-col>
      </a-row>
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 5 }">
        <a-form-item>
          <a-checkbox :checked="false">记住密码（非预期效果）</a-checkbox>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 3, offset: 3 }">
          <a-checkbox :checked="false">记住密码</a-checkbox>
        </a-form-item>
      </a-form>
    </a-card>
    <!-- 4 -->
    <div class="markdown-body" v-html="doc3"></div>
    <a-card title="同行多个表单 Item">
      <a-row class="demo" :gutter="24">
        <a-col :span="3">col-3 </a-col>
        <a-col :span="6">col-6 </a-col>
      </a-row>
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 6 }">
        <a-form-item label="请选择居住地（非预期效果）">
          <a-select value="">
            <a-select-option value="">请选择省份</a-select-option>
          </a-select>
          <a-select value="">
            <a-select-option value="">请选择城市</a-select-option>
          </a-select>
          <a-select value="">
            <a-select-option value="">请选择区县</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="请选择居住地">
          <a-row type="flex" justify="space-around">
            <a-col
              ><a-select value="">
                <a-select-option value="">请选择省份</a-select-option>
              </a-select></a-col
            >
            <a-col
              ><a-select value="">
                <a-select-option value="">请选择城市</a-select-option>
              </a-select></a-col
            >
            <a-col
              ><a-select value="">
                <a-select-option value="">请选择区县</a-select-option>
              </a-select></a-col
            >
          </a-row>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doc1: require('./doc/Grid1.md'),
      doc2: require('./doc/Grid2.md'),
      doc3: require('./doc/Grid3.md'),
      form: this.$form.createForm(this)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-form {
  padding-top: 20px;
}
.ant-row.demo {
  > div {
    color: #fff;
    padding: 10px 0;
    background: rgba(0, 160, 233, 0.7);
  }
  > div:nth-child(odd) {
    background: #00a0e9;
  }
}
</style>