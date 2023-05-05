<template>
  <CommonHeader class="app-common_header" :title="proDetail?.proname" back></CommonHeader>

  <template v-if="proDetail">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in proDetail.banners" :key="item">
        <img :src="item" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品信息展示 -->
    <div class="app-detail_info">
      <van-space direction="vertical" fill>
        <h3>{{ proDetail.proname }}</h3>
        <p>{{ proDetail.desc }}</p>
      </van-space>
    </div>
  </template>
  <van-submit-bar :price="3050" :button-text="isLogin ? '加入购物车' : '去登录'" @submit="onSubmit" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProDetailApi } from '@/api/pro'
import { storeToRefs } from 'pinia'
import useUserStore from '@/stores/user'
const userStore = useUserStore()
import { postAddCartApi } from '@/api/cart'
const route = useRoute()
const router = useRouter()
const { isLogin, userinfo } = storeToRefs(userStore)
console.log(route.params.proid)
onMounted(() => {
  getProDetail()
})
// 商品详情对象
const proDetail = ref<GoodsNS.IGoodsItem>()

const getProDetail = async () => {
  try {
    const res = await getProDetailApi(route.params.proid as string)
    console.log(res)
    proDetail.value = res
  } catch (error) {
    console.log(error)
  }
}

const onSubmit = async () => {
  if (!isLogin.value) {
    // 去登录页
    router.push('/login')
  } else {
    try {
      const data = await postAddCartApi({
        userid: userinfo.value.userid,
        proid: route.params.proid as string,
        num: 1
      })
      console.log(data);

    } catch (error) {
      console.log(error);

    }
  }
}
</script>

<style scoped lang="scss">
.app-detail_info {
  padding: 0.2rem;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 250px;
  line-height: 250px;
  text-align: center;
  background-color: #39a9ed;

  img {
    width: 100%;
    height: 250px;
  }
}
</style>
