<template>

    <view class="container">
        <!-- uView Toast 消息提示 -->
        <u-toast ref="uToast" />

        <view class="box">
            <!-- 标题 -->
            <view class="title">
                <view style="font-size: 18px; font-weight: 700">用户登录</view>
                <view style="font-size: 12px; font-weight: 400">USER LOGIN</view>
            </view>
            <!-- 表单 -->
            <u-form ref="uForm" :borderBottom="false" :model="form">
                <!-- 用户名 -->
                <u-form-item leftIcon="account-fill" :borderBottom="false" :leftIconStyle="{'padding': '20rpx'}"
                    prop="username" class="vk-form-item">
                    <u-input type="text" placeholder="请输入用户名" v-model="form.username" class="vk-input" />
                </u-form-item>
                <!-- 密码 -->
                <u-form-item leftIcon="lock" :borderBottom="false" :leftIconStyle="{'padding': '20rpx'}" prop="password"
                    class="vk-form-item">
                    <u-input type="password" placeholder="请输入登录密码" v-model="form.password" class="vk-input" />
                </u-form-item>
            </u-form>
            <!-- 登录按钮 -->
            <u-button type="primary" class="vk-button" @click="login">登录</u-button>
        </view>

    </view>

</template>

<script setup>
    import { odooLogin } from '@/api/odoo.js';
    import { reactive, getCurrentInstance } from 'vue';
    import { onShow, onReady } from '@dcloudio/uni-app';
    import to from 'await-to-js';

    const { proxy } = getCurrentInstance();
    const rules = reactive({
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入登录密码' }]
    });
    const form = reactive({
        username: '',
        password: ''
    })

    onReady(() => {
        // 必须要在 onReady 生命周期，因为 onLoad 生命周期组件可能尚未创建完毕
        proxy.$refs.uForm.setRules(rules)
    })

    // 自定义函数：登录功能
    async function login () {
        const [error, data] = await to(odooLogin(form.username, form.password));
        if (error) proxy.$errorMsg(error);

        // 跳转至主页页面
        return proxy.$successMsg('登录成功', 3000, { url: '/pages/report-works/search/search' });
    }
</script>

<style lang="scss" scoped>
    @import 'login.scss';
</style>