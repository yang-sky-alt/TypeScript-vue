<template>
  <div class="common-list" :class="{ half: column === 2 }">
    <!-- immediate-check	是否在初始化时立即执行滚动位置检查	boolean	true -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- 循环 -->
      <div class="list-container">
        <div
          v-for="item in goodsList"
          :key="item.proid"
          class="common-list_item"
          @click="handleToDetail(item.proid)"
        >
          <img :src="item.img1" alt="" />
          <div class="info">
            <div class="name van-multi-ellipsis--l2">{{ item.proname }}</div>
            <div class="price">
              <span>{{ ((item.originprice * item.discount) / 10).toFixed(2) }}</span>
              <span
                >{{ item.originprice }} /
                <van-tag color="#7232dd" plain>{{ item.discount }} 折</van-tag></span
              >
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { IPageParams } from '@/api/pro'
import { ref, reactive, onMounted } from 'vue'

type column = 1 | 2

interface IProps {
  column?: column
  action(params: IPageParams): any
}

const { column = 1, action } = defineProps<IProps>()

// 商品列表
const goodsList = ref<GoodsNS.IGoodsItem[]>([])
const loading = ref(false)
const finished = ref(false)

onMounted(() => {
  onLoad()
})

// 定义页码信息
const pageInfo = reactive<IPageParams>({
  count: 1,
  limitNum: 10
})

const onLoad = async () => {
  try {
    const res = await action(pageInfo)
    console.log(res)
    // 每一次都是拼接，而不是替换
    goodsList.value = goodsList.value.concat(res)
    // 数据更新完毕后，将 loading 设置成 false
    loading.value = false

    if (res.length === 0) {
      // 数据已全部加载完毕，则直接将 finished 设置成 true
      finished.value = true
    }

    // 页码+1
    pageInfo.count++
  } catch (error) {
    console.log(error)
  }
}
const router = useRouter()
// 去详情页
const handleToDetail = (proid: string) => {
  // detail/j1231313
  router.push({ name: 'detail', params: { proid } })
}
</script>

<style scoped lang="scss">
@import '@/assets/css/var.scss';
.common-list {
  padding-bottom: 50px;

  &.half .list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .common-list_item {
      width: 3.4rem;
      display: flex;
      flex-direction: column;

      img {
        width: 3.4rem;
        height: 3.4rem;
      }
      .info {
        padding: 10px 0;
      }
    }
  }

  .list-container {
    padding: 0 10px;
    .common-list_item {
      display: flex;
      margin-bottom: 0.1rem;
      img {
        width: 2rem;
        height: 2rem;
        margin-right: 10px;
      }
      .info {
        .name {
          font-size: 16px;
          margin-bottom: 0.2rem;
        }
        .price {
          span {
            &:first-of-type {
              font-weight: 600;
              color: $red-color;
              margin-right: 0.1rem;
            }
            &:last-of-type {
              font-size: 12px;
              color: #5b5a5a;
            }
          }
        }
      }
    }
  }
}
</style>
