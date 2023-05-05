<template>
  <CommonHeader class="app-common_header" title="Not Found" back></CommonHeader>
  <van-empty description="一不小心走丢la....">
    <router-link to="/" v-slot="{ navigate }" custom>
      <van-button round type="primary" @click="navigate" class="bottom-button">还是去首页吧</van-button>
    </router-link>
  </van-empty>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
