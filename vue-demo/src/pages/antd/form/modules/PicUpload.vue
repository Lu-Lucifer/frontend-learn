<template>
  <div>
    <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture-card"
      :file-list="fileList"
      @change="handleChange"
    >
      <div>
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
  </div>
</template>

<script>
export default {
  props: {
    value: [Object, String],
    fieldMapping: {
      type: Object,
      default() {
        return {
          name: 'name',
          url: 'url'
        }
      }
    }
  },
  data() {
    return {
      isMutiple: false
    }
  },
  computed: {
    fileList() {
      let list = []
      if (this.value) {
        if (Array.isArray(this.value)) {
          for (let item of this.value) {
            if (item.url) {
              list.push(this.buildPreviewPic(item))
            }
          }
        } else {
          list = [this.buildPreviewPic(this.value)]
        }
      }
      console.log(list)
      return list
    }
  },
  methods: {
    getBase64(file) {
      if (!file) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    buildPreviewPic(item) {
      if (typeof item == 'string') {
        return {
          uid: String(Date.now()),
          name: item,
          status: 'done',
          url: item
        }
      }
      if (item.url||item[this.fieldMapping.url]) {
        return {
          uid: item.uid || String(Date.now()),
          name: item[this.fieldMapping.name] || item[this.fieldMapping.url],
          status: 'done',
          url: item[this.fieldMapping.url]
        }
      }

    },
    async handleChange({ file, fileList }) {
      this.isMutiple = Array.isArray(this.value);
      if (!this.isMutiple) {
        if (file.status == 'remove') {
          this.$emit('change', { [this.fieldMapping.name]: '', [this.fieldMapping.url]: '' })
          return
        }
        const base64 = await this.getBase64(file.originFileObj)
        this.$emit('change', { [this.fieldMapping.name]: file.name, [this.fieldMapping.url]: base64 })
      } else {

        const list = []
        for (let item of fileList) {
          const base64 = await this.getBase64(item.originFileObj)
          list.push({ [this.fieldMapping.name]: item.name, [this.fieldMapping.url]: base64 })
        }
        this.$emit('change', list)
      }
    }
  }
}
</script>

<style>
</style>