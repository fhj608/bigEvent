<script setup>
import { ref } from 'vue'
import { articleGetCateService, articleDelCateService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import EditDialog from './components/EditDialog.vue'

const cateList = ref([])
const loading = ref(false)
const editDialog = ref()
const getCateList = async () => {
  loading.value = true
  const res = await articleGetCateService()
  cateList.value = res.data.data
  loading.value = false
}
getCateList()
const handleEdit = (row) => {
  editDialog.value.open(row)
}
const handleDel = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await articleDelCateService(row.id)
      ElMessage.success('删除成功')
      getCateList()
    })
    .catch(() => {})
}
const handleAddCate = () => {
  editDialog.value.open()
}
const handleSuccess = () => {
  getCateList()
}
</script>
<template>
  <PageContainer title="文章分类">
    <template #button>
      <el-button type="primary" @click="handleAddCate">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="cateList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            type="primary"
            @click="handleEdit(row)"
            plain
            circle
          ></el-button>
          <el-button
            :icon="Delete"
            type="danger"
            @click="handleDel(row)"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <EditDialog ref="editDialog" @success="handleSuccess"></EditDialog>
  </PageContainer>
</template>
