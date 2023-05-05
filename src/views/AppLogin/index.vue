<template>
    <div class="page app-login">
        <CommonHeader class="app-common_header" title="登 录" back>
            <!-- 右侧 -->
            <template #right>
                <router-link v-slot="{ navigate }" to="/register" custom>
                    <span @click="navigate">去注册</span>
                </router-link>
            </template>
        </CommonHeader>
        <!-- 表单 -->
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="loginInfo.loginname" name="tel" label="手机号" placeholder="请输入手机号"
                    :rules="[{ required: true, message: '请填写手机号', validator: validatorTel }]" />
                <van-field v-model="loginInfo.password" type="password" name="password" label="密码" placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FieldRuleValidator } from 'vant'
import { phoneReg } from '@/utils/common'
import type { ILoginParams } from '@/api/user'
import useUserStore from '@/stores/user'
const userStore = useUserStore()
// 表单数据对象
const loginInfo = reactive<ILoginParams>({
    loginname: '',
    password: ''
})
const onSubmit = async () => {
    userStore.loginAction(loginInfo)
};
// 验证是否是手机号
const validatorTel: FieldRuleValidator = (tel: string) => {
    if (!tel) return '手机号不能为空！'
    if (!phoneReg.test(tel)) return '手机号输入错误'

    return true
}
</script>

<style lang="scss" scoped></style>