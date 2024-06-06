//登录传参ts类型
export interface loginForm{
    userName:string,
    password:string,
    code:string
}
//登录返回数据ts类型
export interface loginRes{
    code:number,
    message:string,
    data:dataType
}
interface dataType{
    token:string
}
//获取用户ts类型
export interface userInfoType{
     code:number,
     message:string,
     data:User
}
interface User{
    checkUser:userInfo
}
interface userInfo{
    userId: number,
    avatar:string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons:  string[],
    routes: string[],
    token: string,
}