<template>
  <CommonHeader class="app-common_header">
    <!-- 左侧 -->
    <template #left>
      <van-icon name="apps-o" />
    </template>
    <!-- 中间 -->
    <template #title>
      <van-search shape="round" background="#d30707" placeholder="请输入搜索关键词" />
    </template>
    <!-- 右侧 -->
    <template #right>
      <span v-if="isLogin">{{ userinfo.nickname }}</span>
      <router-link to="/login" v-slot="{ navigate }" custom v-else>
        <span @click="navigate">登录</span>
      </router-link>
    </template>
  </CommonHeader>
  <!-- 轮播图 -->
  <AppMainBanner />
  <!-- 十宫格 -->
  <AppMainNavList />
  <!-- 公共商品列表 -->
  <CommonList :column="2" :action="getProListApi" />
</template>

<script setup lang="ts">
import { getProListApi } from '@/api/pro'
import { storeToRefs } from 'pinia'
import useUserStore from '@/stores/user'
const userStore = useUserStore()
const { isLogin, userinfo } = storeToRefs(userStore)
</script>

<style scoped></style>
