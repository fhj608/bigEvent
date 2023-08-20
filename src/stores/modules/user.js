import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (value) => {
      token.value = value
    }
    const userInfo = ref({})
    const getInfo = async () => {
      const res = await userGetInfoService()
      userInfo.value = res.data.data
    }
    const setInfo = (obj) => {
      userInfo.value = obj
    }
    return {
      token,
      setToken,
      userInfo,
      getInfo,
      setInfo
    }
  },
  {
    persist: true
  }
)
