<script setup>
import { ref } from 'vue'
import { userUpdateInfoService } from '@/api/user'
import { useUserStore } from '@/stores'

const formRef = ref()
const userStore = useUserStore()
const {
  userInfo: { id, username, nickname, email }
} = userStore
const formModel = ref({
  id,
  username,
  nickname,
  email
})
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{4,10}$/,
      message: '用户昵称应为4-10位非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入用户邮箱',
      trigger: 'blur'
    },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ]
}
const onSubmit = async () => {
  await formRef.value.validate()
  if (
    formModel.value.nickname === userStore.userInfo.nickname &&
    formModel.value.email === userStore.userInfo.email
  ) {
    ElMessage.error('内容无修改')
    return
  }
  const {
    data: { message }
  } = await userUpdateInfoService(formModel.value)
  ElMessage.success(message)
  userStore.getInfo()
}
</script>
<template>
  <PageContainer title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="formModel"
          :rules="rules"
          ref="formRef"
          label-width="100px"
        >
          <el-form-item label="登录名称" prop="username">
            <el-input v-model="formModel.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="formModel.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="formModel.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </PageContainer>
</template>
