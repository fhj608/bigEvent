<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { articleGetListService, articleDeleteService } from '@/api/article'
import CateSelect from '@/views/layout/article/components/CateSelect.vue'
import { dayFormat } from '@/utils/dayFormat.js'
import ArticleDrawer from './components/ArticleDrawer.vue'

const articleList = ref([])
const totalItems = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading = ref(false)
const articleDrawerRef = ref()
const getArticle = async () => {
  loading.value = true
  const {
    data: { data, total }
  } = await articleGetListService(params.value)
  articleList.value = data
  totalItems.value = total
  loading.value = false
}
getArticle()
const handleEdit = (row) => {
  articleDrawerRef.value.open(row)
}
const handleDelete = async (row) => {
  const {
    data: { message }
  } = await articleDeleteService(row.id)
  ElMessage.success(message)
  getArticle()
}
const handleSearch = () => {
  params.value.pagenum = 1
  getArticle()
}
const handleReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  getArticle()
}
const handleSizeChange = () => {
  params.value.pagenum = 1
  getArticle()
}
const handleSuccess = (flag) => {
  if (flag === 'add') {
    params.value.pagenum = Math.ceil(
      (totalItems.value + 1) / params.value.pagesize
    )
  }
  getArticle()
}
</script>
<template>
  <PageContainer title="文章管理">
    <template #button>
      <el-button type="primary" @click="articleDrawerRef.open({})"
        >发布文章</el-button
      >
    </template>
    <!-- // 搜索区域 -->
    <el-form inline style="align-items: center">
      <el-form-item label="文章分类:">
        <CateSelect v-model="params.cate_id"></CateSelect>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- // 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="{ row }">
          {{ dayFormat(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            type="primary"
            plain
            @click="handleEdit(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            type="danger"
            plain
            @click="handleDelete(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[3, 5, 7]"
      :background="true"
      layout="prev, pager, next, jumper, total, sizes"
      :total="totalItems"
      @size-change="handleSizeChange"
      @current-change="getArticle()"
      style="justify-content: flex-end; margin-top: 20px"
    />
    <!-- 抽屉 -->
    <ArticleDrawer
      ref="articleDrawerRef"
      @success="handleSuccess"
    ></ArticleDrawer>
  </PageContainer>
</template>
