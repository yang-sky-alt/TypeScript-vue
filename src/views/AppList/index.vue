<template>
  <div class="page app-list">
    <CommonHeader class="app-common_header" :back="true">
      <!-- 中间 -->
      <template #title>
        <van-search
          v-model="keyword"
          shape="round"
          background="#d30707"
          placeholder="请输入搜索关键词"
        />
      </template>
    </CommonHeader>
    <!-- 商品列表 -->
    <CommonList :action="getProListApi" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProListApi } from '@/api/pro'
const route = useRoute()
console.log(route)

const keyword = ref<string>((route.query.search as string) || '')
</script>

<style scoped></style>
