<template>
  <!-- route	是否开启路由模式	boolean	false -->
  <van-tabbar route>
    <van-tabbar-item icon="home-o" to="/main">首页</van-tabbar-item>
    <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="flower-o" to="/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
