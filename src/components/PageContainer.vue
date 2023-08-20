<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <el-card class="pageContainer">
    <template #header>
      <div class="card-header">
        <span> {{ title }}</span>
        <slot name="button"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.pageContainer {
  height: 100%;
  .card-header {
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
