<script setup>
import { ref } from 'vue'
import { articleGetCateService } from '@/api/article'
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const cartList = ref([])
const getCate = async () => {
  const {
    data: { data }
  } = await articleGetCateService()
  cartList.value = data
}
getCate()
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @change="emit('update:modelValue', $event)"
    :style="{ width }"
    value-key="id"
  >
    <el-option
      v-for="item in cartList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
