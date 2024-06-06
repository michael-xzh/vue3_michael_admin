//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { userlogin } from '@/api/user/'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN() || null,
    }
  },
  actions: {
    //登录
    async login(data: any) {
      const res = await userlogin(data)
      if (res.code === 200) {
        this.token = res.data.token
        SET_TOKEN(res.data.token)
        return res
      } else {
        return Promise.reject(res.message)
      }
    },
  },
  getters: {},
})
export default useUserStore
