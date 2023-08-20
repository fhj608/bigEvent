<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'

const userStore = useUserStore()
const imageUrl = ref(userStore.userInfo.user_pic)
const uploadRef = ref()
const onChangeSelect = (uploadFile) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)
  //基于FileReader 读取图片做预览
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = (e) => {
    imageUrl.value = e.target.result
  }
}
const onUpdateAvatar = async () => {
  const {
    data: { message }
  } = await userUpdateAvatarService({ avatar: imageUrl.value })
  userStore.getInfo()
  ElMessage.success(message)
}
</script>
<template>
  <PageContainer title="更换头像">
    <el-upload
      class="avatar-uploader"
      ref="uploadRef"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onChangeSelect"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br />
    <el-button
      type="primary"
      :icon="Plus"
      @click="uploadRef.$el.querySelector('input').click()"
      >选择图片</el-button
    >
    <el-button type="success" :icon="Upload" @click="onUpdateAvatar"
      >上传头像</el-button
    >
  </PageContainer>
</template>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
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
}
</style>
