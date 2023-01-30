<template>

    <view class="u-p-16 container">
        <u-toast ref="uToast" />

        <!-- 头部 -->
        <view class="u-p-16 vk-header">
            <u-row gutter="16" style="height: 20%;">
                <u-col span="8" style="color: #7f7f7f;">任务：</u-col>
                <u-col span="4" style="color: #7f7f7f;">作业数：</u-col>
            </u-row>
            <u-row gutter="48">
                <u-col span="4">
                    <view style="font-size: 14px; color: #cccccc; font-weight: bold;">班组</view>
                    <view style="font-size: 14px; color: #000000; font-weight: bold;">班组</view>
                </u-col>
                <u-col span="4">
                    <view style="font-size: 14px; color: #cccccc; font-weight: bold;">设备</view>
                    <view style="font-size: 14px; color: #000000; font-weight: bold;">设备</view>
                </u-col>
            </u-row>
            <u-row gutter="16" style="height: 50%;">
                <u-col span="9">xxxx</u-col>
                <u-col span="3">进行中</u-col>
            </u-row>
        </view>

        <!-- 主体 -->
        <view style="width: 100%; margin: auto; ">
            <u-button class="vk-button">
                <view style="color: #4090ef" class="vk-button-view">
                    <u-icon name="photo" size="60" />
                    <text>上机</text>
                </view>
            </u-button>

            <u-button class="vk-button">
                <view style="color: #1dfa2c" class="vk-button-view">
                    <u-icon name="photo" size="60" />
                    <text>报工</text>
                </view>
            </u-button>

            <u-button class="vk-button">
                <view style="color: #ffa369" class="vk-button-view">
                    <u-icon name="photo" size="60" />
                    <text>设备物料</text>
                </view>
            </u-button>

            <u-button class="vk-button">
                <view style="color: #ffa369" class="vk-button-view">
                    <u-icon name="photo" size="60" />
                    <text>更多操作</text>
                </view>
            </u-button>
        </view>

        <!-- 尾部 -->
        <view class="footer">浙江华光*开发团队</view>
    </view>

</template>

<script setup>
    import { reactive, getCurrentInstance } from 'vue'

    const { proxy } = getCurrentInstance();

</script>

<style lang="scss">
    @import 'index.scss';
</style>