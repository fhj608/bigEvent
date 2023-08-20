<script setup>
import { ref } from 'vue'
import { userUpdatePwdService } from '@/api/user'
import router from '@/router'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const formRef = ref()
const form = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const checkNewPwd = (rule, value, callback) => {
  if (value === form.value.old_pwd) {
    callback(new Error('新旧密码一致'))
  } else {
    callback()
  }
}
const checkRePwd = (rule, value, callback) => {
  if (value !== form.value.new_pwd) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}
const rules = {
  old_pwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: checkNewPwd, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: checkRePwd, trigger: 'blur' }
  ]
}
const onSubmit = async () => {
  await formRef.value.validate()
  const {
    data: { message }
  } = await userUpdatePwdService(form.value)
  userStore.setToken('')
  userStore.setInfo({})
  ElMessage.success(message)
  router.push('/login')
}
</script>

<template>
  <PageContainer title="重置密码">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="form"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          class="form"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input
              v-model="form.old_pwd"
              type="password"
              placeholder="请输入原密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input
              v-model="form.new_pwd"
              type="password"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="re_pwd">
            <el-input
              v-model="form.re_pwd"
              type="password"
              placeholder="请再次输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改密码</el-button>
            <el-button @click="formRef.resetFields()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </PageContainer>
</template>
