<template>
  <div class="page app-cart">
    <CommonHeader class="app-common_header" title="购物车"></CommonHeader>
    <van-empty v-if="!isLogin" description="请登录后，查看哦...😯">
      <router-link v-slot="{ navigate }" to="/login" custom>
        <van-button @click="navigate" round type="primary" class="bottom-button">去登录</van-button>
      </router-link>
    </van-empty>
    <!-- 登录后 -->
    <div v-else>
      <template v-if="cartList">
        <van-swipe-cell v-for="item in cartList" :key="item.cartid">
          <div class="cart-item">
            <van-checkbox :model-value="item.flag"
              @update:model-value="handleChangeFlag(item.cartid, !item.flag)"></van-checkbox>
            <van-card :num="item.num" :price="item.originprice" :title="item.proname" class="goods-card"
              :thumb="item.img1">
              <template #tags>
                <van-tag plain type="primary">标签</van-tag>
                <van-tag plain type="primary">标签</van-tag>
              </template>
              <template #footer>
                <van-button :disabled="item.num === 1" size="mini"
                  @click="handleUpdateNum(item.cartid, item.num--)">-</van-button>
                <van-button size="mini" @click="handleUpdateNum(item.cartid, item.num++)">+</van-button>
              </template>
            </van-card>
          </div>
          <template #right>
            <van-button @click="handleDelete(item.cartid)" square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
        <van-submit-bar class="cart-bottom" :price="totalPrice * 100" button-text="提交订单" @submit="onSubmit">
          <van-checkbox :model-value="checkAll" @update:model-value="handleCheckAll">全选</van-checkbox>
        </van-submit-bar>
      </template>
      <van-empty v-else description="购物车车空空也，快去装满吧...😯"></van-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { showConfirmDialog } from 'vant'
import useUserStore from '@/stores/user'
import {
  postCartListApi,
  postUpdateCartNumApi,
  postRemoveCartItemApi,
  postUpdateSelectCartApi,
  postSelectAllApi
} from '@/api/cart'
const userStore = useUserStore()
const { isLogin, userinfo } = storeToRefs(userStore)

onMounted(() => {
  // 只有登录了，才去加载列表
  if (isLogin) getCartList()
})
// 购物车列表
const cartList = ref<CartNS.ICartItem[]>([])
// 获取购物车列表
const getCartList = async () => {
  try {
    const res = await postCartListApi(userinfo.value.userid)
    console.log(res)
    cartList.value = res
  } catch (error) {
    console.log(error)
  }
}

// 更新购物车数量
const handleUpdateNum = async (cartid: string, num: number) => {
  try {
    await postUpdateCartNumApi({ cartid, num })
  } catch (error) {
    console.log(error)
  }
}

// 删除
const handleDelete = (cartid: string) => {
  showConfirmDialog({
    title: '⚠️',
    message: '你确定删除当前商品吗？'
  })
    .then(async () => {
      // on confirm  确定删除
      try {
        await postRemoveCartItemApi(cartid)
        //  删除成功之后，重新获取列表数据
        getCartList()
      } catch (error) {
        console.log(error)
      }
    })
    .catch(() => {
      // on cancel
    })
}

// 更新商品选中状态
const handleChangeFlag = async (cartid: string, flag: boolean) => {
  try {
    await postUpdateSelectCartApi({ cartid, flag })
    // 手动加载商品列表
    getCartList()
  } catch (error) {
    console.log(error)
  }
}

// 反选功能  every 全为真，则为真，只有有一个false,则返回false
const checkAll = computed(() => {
  return cartList.value.every((item) => {
    return item.flag === true
  })
})

// 全选或全不选
const handleCheckAll = async () => {
  try {
    await postSelectAllApi({
      userid: userinfo.value.userid,
      type: !checkAll.value
    })
    // 重新加载购物车列表
    getCartList()
  } catch (error) {
    console.log(error)
  }
}

// 总价
const totalPrice = computed(() => {
  return cartList.value.reduce((prev, item) => {
    return item.flag ? prev + item.originprice * item.num : prev
  }, 0)
})

// 提交订单
const onSubmit = () => { }
</script>

<style scoped lang="scss">
.app-cart {
  padding-bottom: 2.1rem;

  .cart-bottom {
    margin-bottom: 1rem;
  }
}

.cart-item {
  display: flex;
  padding-left: 0.1rem;
  background: var(--van-card-background);
  margin-bottom: 0.1rem;

  .van-card {
    flex: 1;
  }
}

.delete-button {
  height: 100%;
}
</style>
