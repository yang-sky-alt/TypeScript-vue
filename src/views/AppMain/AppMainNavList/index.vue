<template>
  <div class="app-main_nav-list">
    <van-grid :column-num="5" :border="false">
      <van-grid-item
        v-for="nav in navs"
        :key="nav.navId"
        :icon="nav.url"
        :text="nav.text"
        @click="handleToList(nav.text)"
      />
    </van-grid>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const navs = [
  {
    navId: 1,
    text: '锋购超市',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg'
  },
  {
    navId: 2,
    text: '数码电器',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/178015/31/13828/6862/60ec0c04Ee2fd63ac/ccf74d805a059a44.png!q70.jpg'
  },
  {
    navId: 3,
    text: '锋购百货',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/54043/33/19389/4660/62b049dbE3b9aef75/2fcd31afd5d702e4.png!q70.jpg'
  },
  {
    navId: 4,
    text: '锋购生鲜',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/177902/16/13776/5658/60ec0e71E801087f2/a0d5a68bf1461e6d.png!q70.jpg'
  },
  {
    navId: 5,
    text: '锋购到家',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/196472/7/12807/7127/60ec0ea3Efe11835b/37c65625d94cae75.png!q70.jpg'
  },
  {
    navId: 6,
    text: '锋购充值',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/185733/21/13527/6648/60ec0f31E0fea3e0a/d86d463521140bb6.png'
  },
  {
    navId: 7,
    text: '锋购3C',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/145692/9/1817/4493/5efbf652E61c4f3ec/722840c121d67fc6.png'
  },
  {
    navId: 8,
    text: '锋购领券',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/186080/16/13681/8175/60ec0fcdE032af6cf/c5acd2f8454c40e1.png'
  },
  {
    navId: 9,
    text: '锋购会员',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/37709/6/15279/6118/60ec1046E4b5592c6/a7d6b66354efb141.png'
  },
  {
    navId: 10,
    text: '锋购国际',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/191060/24/12861/6818/60ec11f2E67cf5ee6/c264378678b3cd96.png'
  }
]

const router = useRouter()
// 导航到列表页
const handleToList = (title: string) => {
  router.push({ name: 'list', query: { search: title } })
}
</script>

<style scoped></style>
