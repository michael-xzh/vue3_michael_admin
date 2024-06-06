<template>
    <div class="login-box">
        <div class="main-box">
            <div :class="['container', 'container-register', { 'is-txl': isLogin }]">
                <div class="form-box">
                    <h2 class="title">注册账号</h2>
                    <span class="text">or use email for registration</span>
                    <el-form :model="loginForm" label-width="auto" :rules="rules" style="width: 350px">
                        <el-form-item prop="username">
                            <el-input class="login-input" :prefix-icon="User" placeholder="请输入用户名" size="large"
                                v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input class="login-input" type="password" size="large" placeholder="请输入密码"
                                :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="primary-btn pri-login">立即注册</div>
                </div>

            </div>
            <div :class="['container', 'container-login', { 'is-txl is-z200': isLogin }]">
                <div class="form-box">
                    <h2 class="title">Sign in to Website</h2>
                    <el-form :model="loginForm" label-width="auto" ref="loginForms" :rules="rules" style="width: 350px">
                        <el-form-item prop="userName">
                            <el-input class="login-input" :prefix-icon="User" placeholder="请输入用户名" size="large"
                                v-model="loginForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input class="login-input" type="password" size="large" placeholder="请输入密码"
                                :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input class="login-input" type="code" size="large" placeholder="请输入验证码" :prefix-icon="Key"
                                v-model="loginForm.code"></el-input>
                            <span v-html="imgUrl" class="imgCode" @click="captcha"></span>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" :loading="loading" class="login-btn" round @click="login">立即登录</el-button>
                    <!-- <div class="primary-btn pri-login">立即登录</div> -->
                </div>
            </div>
            <div :class="['switch', { login: isLogin }]">
                <div class="switch__circle"></div>
                <div class="switch__circle switch__circle_top"></div>
                <div class="switch__container">
                    <h2>{{ isLogin ? 'Hello Friend !' : 'Welcome Back !' }}</h2>
                    <p>
                        {{
                            isLogin
                            ? 'Enter your personal details and start journey with us'
                            : 'To keep connected with us please login with your personal info'
                        }}
                    </p>
                    <div class="primary-btn" @click="isLogin = !isLogin">
                        {{ isLogin ? '立即注册' : '立即登录' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { User, Lock, Key } from '@element-plus/icons-vue';
import { getCaptcha } from '@/api/user/index.ts'
import useUserStore from '@/store/module/user'
import { ElMessage } from 'element-plus'
let useStore = useUserStore();
let isLogin = ref(true)
let imgUrl = ref('')
const loginForms = ref()
const loading = ref(false)
const loginForm = reactive({ userName: '', password: '', code: '' });
//自定义校验规则函数
// const validatorUserName = (rule: any, value: any, callback: any) => {
//     if (value.length >= 6) {
//         callback();
//     } else {
//         callback(new Error('账号长度至少6位'));
//     }
// }
//定义表单校验需要配置对象
const rules = {
    userName: [
        { required: true, min: 6, max: 10, message: '账号长度至少6位', trigger: 'blur' },
        { required: true, min: 6, max: 10, message: '账号长度至少6位', trigger: 'change' },
        //{ trigger: 'blur', validator: validatorUserName }
    ],
    password: [
        { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'blur' },
        { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' },
    ],
    code: [
        { required: true, min: 4, max: 4, message: '请输入4位验证码', trigger: 'change' },
        { required: true, min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' },
    ]
}
const login = () => {
    loading.value = true
    loginForms.value.validate(async (vaild) => {
        if (vaild) {
            try {
                const res = await useStore.login(loginForm)
                loading.value = false
                ElMessage.success(res.message)
            } catch (error) {
                loading.value = false
                captcha()
                ElMessage.error(error)
            }
        } else {
            loading.value = false
        }

    })

}
const captcha = async () => {
    imgUrl.value = await getCaptcha()
}
onMounted(() => {
    captcha()
})
</script>
<style>
.login-input .el-input__wrapper {
    background-color: #ecf0f3 !important;
    border: none;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.el-form-item.is-error .login-input .el-input__wrapper {
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}
</style>
<style scoped lang="scss">
.login-box {
    height: 100vh;
    with: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e9eef1;
}

.login-btn {
    width: 180px;
    height: 50px;
    border-radius: 40px;
    background: #4165de;
    margin-top: 20px;
    font-weight: normal;
    letter-spacing: 2px;
}

.imgCode {
    position: absolute;
    right: 4px;
    height: 38px;
    cursor: pointer;
}

.main-box {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    height: 600px;
    padding: 25px;
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    overflow: hidden;

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        width: 600px;
        height: 100%;
        padding: 25px;
        background-color: #ecf0f3;
        transition: all 1.25s;

        .form-box {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            color: #a0a5a8;

            .title {
                font-size: 34px;
                font-weight: 700;
                line-height: 3;
                color: #181818;
            }

            .text {
                margin-top: 30px;
                margin-bottom: 12px;
            }

            .form__input {
                width: 350px;
                height: 40px;
                margin: 4px 0;
                padding-left: 25px;
                font-size: 13px;
                letter-spacing: 0.15px;
                border: none;
                outline: none;
                // font-family: 'Montserrat', sans-serif;
                background-color: #ecf0f3;
                transition: 0.25s ease;
                border-radius: 8px;
                box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;

                &::placeholder {
                    color: #a0a5a8;
                }
            }
        }
    }

    .container-register {
        z-index: 100;
        left: calc(100% - 600px);
    }

    .container-login {
        left: calc(100% - 600px);
        z-index: 0;
    }

    .is-txl {
        left: 0;
        transition: 1.25s;
        transform-origin: right;
    }

    .is-z200 {
        z-index: 200;
        transition: 1.25s;
    }

    .switch {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 400px;
        padding: 50px;
        z-index: 200;
        transition: 1.25s;
        background-color: #ecf0f3;
        overflow: hidden;
        box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
        color: #a0a5a8;

        .switch__circle {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background-color: #ecf0f3;
            box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
            bottom: -60%;
            left: -60%;
            transition: 1.25s;
        }

        .switch__circle_top {
            top: -30%;
            left: 60%;
            width: 300px;
            height: 300px;
        }

        .switch__container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: absolute;
            width: 400px;
            padding: 50px 55px;
            transition: 1.25s;

            h2 {
                font-size: 34px;
                font-weight: 700;
                line-height: 3;
                color: #181818;
            }

            p {
                font-size: 14px;
                letter-spacing: 0.25px;
                text-align: center;
                line-height: 1.6;
            }
        }
    }

    .login {
        left: calc(100% - 400px);

        .switch__circle {
            left: 0;
        }
    }

    .primary-btn {
        width: 180px;
        height: 50px;
        border-radius: 25px;
        margin-top: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        letter-spacing: 2px;
        background-color: #4b70e2;
        color: #f9f9f9;
        cursor: pointer;
        box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;

        &:hover {
            box-shadow: 4px 4px 6px 0 rgb(255 255 255 / 50%),
                -4px -4px 6px 0 rgb(116 125 136 / 50%),
                inset -4px -4px 6px 0 rgb(255 255 255 / 20%),
                inset 4px 4px 6px 0 rgb(0 0 0 / 40%);
        }
    }

    .pri-login {
        margin-top: 20px
    }
}
</style>
