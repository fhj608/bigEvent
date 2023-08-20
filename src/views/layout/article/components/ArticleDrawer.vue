<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import CateSelect from '@/views/layout/article/components/CateSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  articleAddService,
  articleGetService,
  articleUpdateService
} from '@/api/article.js'
import { baseURL } from '@/utils/request'
import axios from 'axios'

const drawer = ref(false)
const formRef = ref()
const formModel = ref({
  id: 0,
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})
const checkCateId = (rule, value, callback) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请选择文章分类'))
  }
}
const rules = {
  title: [
    { required: true, message: '请输入文章标题', triggle: 'blur' },
    { max: 30, message: '最多30个字符', triggle: 'blur' }
  ],
  cate_id: [{ required: true, validator: checkCateId, triggle: 'blur' }],
  content: [{ required: true, message: '文章内容不能为空', triggle: 'blur' }],
  cover_img: [{ required: true, message: '文章封面不能为空', triggle: 'blur' }]
}
const editorRef = ref()

async function textToImageBlob(text) {
  try {
    // 下载图片文本数据
    const response = await axios({
      url: text, // 假设图片文本是一个链接地址
      responseType: 'blob'
    })

    // 创建Blob对象
    const blob = new Blob([response.data], { type: 'image/jpeg' })

    // 返回Blob对象
    return blob
  } catch (error) {
    console.error('转换失败：', error)
    return null
  }
}

const open = async (row) => {
  drawer.value = true
  // formRef.value.resetFields()
  // editorRef.value.setHTML('')
  if (row.id) {
    const {
      data: { data }
    } = await articleGetService(row.id)
    formModel.value = data
    imgURL.value = baseURL + data.cover_img
    formModel.value.cover_img = await textToImageBlob(imgURL.value)
  } else {
    formRef.value.resetFields()
    editorRef.value.setHTML('')
  }
}
const imgURL = ref('')
const handleImgSelect = (uploadFile) => {
  formModel.value.cover_img = uploadFile.raw
  imgURL.value = URL.createObjectURL(uploadFile.raw)
}
const emit = defineEmits(['success'])
const handleAdd = async (state) => {
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (!formModel.value.id) {
    const {
      data: { message }
    } = await articleAddService(fd)
    ElMessage.success(message)
    emit('success', 'add')
    // formRef.value.resetFields()
    // editorRef.value.setHTML('')
  } else {
    const {
      data: { message }
    } = await articleUpdateService(fd)
    ElMessage.success(message)
    emit('success', 'edit')
  }
  drawer.value = false
}

defineExpose({
  open
})
</script>
<template>
  <el-drawer
    v-model="drawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    size="50%"
  >
    <el-form
      :model="formModel"
      :rules="rules"
      ref="formRef"
      label-width="100px"
    >
      <el-form-item prop="title" label="文章标题">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item prop="cate_id" label="文章分类">
        <CateSelect v-model="formModel.cate_id" width="100%"></CateSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handleImgSelect"
          :auto-upload="false"
        >
          <img v-if="formModel.cover_img" :src="imgURL" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          ></QuillEditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd('已发布')">发布</el-button>
        <el-button type="info" @click="handleAdd('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px solid #eee;
}
</style>
