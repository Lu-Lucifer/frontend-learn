<template>
  <a-form :form="form">
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          {
            rules: [
              {
                required: true
              }
            ]
          }
        ]"
      ></a-input>
    </a-form-item>
    <a-form-item>
      <a-button @click="submit">submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import Form from './modules/Form'
export default {
  data() {
    const formInstance = new Form({
      _vue: this
    });
    return {
      form: formInstance.createForm()
    }
  },
  methods: {
    submit() {
      this.form.validateFields((err, values) => {
        console.log(err, values)
      });
    }
  }
}
</script>

<style>
</style>