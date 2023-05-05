<template>
  <div class="page app-mine">
    <CommonHeader class="app-common_header" title="个人中心"></CommonHeader>
    <van-empty description="还没登录" v-if="!isLogin">
      <router-link to="/login" custom v-slot="{ navigate }">
        <van-button round type="primary" @click="navigate" class="bottom-button">登录</van-button>
      </router-link>
    </van-empty>
    <div v-else class="info">
      <van-image round width="2rem" height="2rem" :src="userinfo.avatar" />
      <h3>{{ userinfo.nickname }}</h3>
      <van-button @click="handleExit" round type="primary" class="bottom-button">退出登录</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useUserStore from '@/stores/user'
const userStore = useUserStore()
const { isLogin, userinfo } = storeToRefs(userStore)
// 退出登录
const handleExit = () => {
  userStore.exitAction()
}
</script>

<style scoped lang="scss">
.app-mine {
  .info {
    padding: 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    &>* {
      margin-bottom: 0.7rem;
    }
  }
}

.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
