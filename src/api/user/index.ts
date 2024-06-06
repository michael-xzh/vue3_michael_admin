import request from "@/utils/request";
import {loginForm,loginRes,userInfoType} from './type'
enum API {
    loginUrl  ='/user/login',
    userInfoUrl = '/user/info',
    getCaptcha ='/user/captcha'
}
//用户登录
export const userlogin = (data:loginForm) => request.post<any,loginRes>(API.loginUrl,data)

//获取用户信息
export const getloginUserInfo = ()=>request.get<any,userInfoType>(API.userInfoUrl) 

//获取验证码
export const getCaptcha = ()=>request.get<any,any>(API.getCaptcha)