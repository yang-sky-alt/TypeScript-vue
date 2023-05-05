import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { showNotify } from 'vant'
import router from '@/router'
import { getUserinfoApi, postLoginApi, type ILoginParams } from '@/api/user'
const useUserStore = defineStore('user', () => {

    // state
    const token = ref<string>('')
    const userinfo = ref<UserNS.IUserInfo>({
        userid: '',
        nickname: '',
        username: ''
    })
    //用户是否已经登录 计算属性==》 getters
    const isLogin = computed(() => !!userinfo.value.userid)
    // 登录方法===》action
    const loginAction = async (loginInfo: ILoginParams) => {
        // 调登录接口==》token,userid,===> 获取用户信息
        try {
            const res = await postLoginApi(loginInfo)
            console.log(res)
            if (res) {
                const { userid } = res
                // 把token存仓库
                token.value = res.token
                // 根据 userid  获取用户信息
                const info = await getUserinfoApi(userid)
                console.log(info)

                if (info) {
                    // 把userinfo存仓库
                    userinfo.value = info[0]
                    // 友好提醒
                    showNotify({ type: 'success', message: '💐，登录成功！' })
                    // 页面跳转  首页
                    router.push('/')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    // 退出登录 方法
    const exitAction = () => {
        token.value = ''
        userinfo.value = {
            userid: '',
            nickname: '',
            username: ''
        }
        // 页面跳转  首页
        router.push('/')
    }
    return { token, userinfo, isLogin, loginAction, exitAction }
}, {
    // 是否持久化
    persist: true
})
export default useUserStore