<template>
  <!-- click-left	点击左侧按钮时触发 -->
  <van-nav-bar :title="title" :left-arrow="back" @click-left="handleBack" fixed>
    <template v-if="!back" #left>
      <slot name="left" />
    </template>
    <template v-if="!title" #title>
      <slot name="title" />
    </template>
    <template #right>
      <slot name="right" />
    </template>
  </van-nav-bar>
</template>

<script setup lang="ts">
import { useAttrs, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回上一页
const handleBack = () => {
  if (back) {
    router.back()
  }
}

// const attrs = useAttrs()
// onMounted(() => {
//   console.log(attrs)
// })

interface IHeaderProps {
  title?: string
  back?: boolean
}

const { title, back = false } = defineProps<IHeaderProps>()
</script>

<style scoped></style>
