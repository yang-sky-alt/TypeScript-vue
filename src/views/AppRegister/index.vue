<template>
    <div class="page app-register">
        <CommonHeader class="app-common_header" title="注 册" back />
        <!-- form 表单 -->
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="loginInfo.tel" name="tel" label="手机号" placeholder="请输入手机号"
                    :rules="[{ required: true, message: '请填写手机号', validator: validatorTel }]" />
                <van-field v-model="loginInfo.password" type="password" name="password" label="密  码" placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="confirmPwd" type="password" name="confirmPwd" label="确认密码" placeholder="请输入确认密码"
                    :rules="[{ required: true, message: '请填写确认密码', validator: validatPwd }]" />
            </van-cell-group>
            <div style="margin: 16px">
                <van-button round block type="primary" native-type="submit"> 提交 </van-button>
            </div>
        </van-form>
    </div>
</template>
  
<script setup lang="ts">
import { type FieldRuleValidator, showNotify } from 'vant'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { phoneReg } from '@/utils/common'
import { postRegisterApi, type IRegistetrParams } from '@/api/user'
const rotuer = useRouter()
const loginInfo = reactive<IRegistetrParams>({
    tel: '',
    password: ''
})
const confirmPwd = ref<string>('')

// 验证是否是手机号
const validatorTel: FieldRuleValidator = (tel: string) => {
    if (!tel) return '手机号不能为空！'
    if (!phoneReg.test(tel)) return '手机号输入错误'

    return true
}
// 验证密码
const validatPwd: FieldRuleValidator = (val) => {
    if (!val) return '确认密码不能为空！'
    if (loginInfo.password !== val) {
        return '两次输入密码不一致！'
    }
    return true
}

// 注册
const onSubmit = async () => {
    // 调用注册接口 注册
    try {
        const res = await postRegisterApi(loginInfo)

        if (res === '注册成功') {
            // 友好提醒
            showNotify({ type: 'success', message: '💐，注册成功！' })
            // 去登录页
            rotuer.replace('/login')
        }
    } catch (error) {
        console.log(error)
    }
}
</script>
  
<style scoped></style>
  