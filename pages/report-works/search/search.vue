<template>
    <view class="vk-container">
        <u-toast ref="uToast" />
        <!-- 提示语 -->
        <view class="vk-title">请在下方搜索框内输入或对准条形码扫码</view>

        <view class="vk-search">
            <u-search height="100" shape="square" :clearabled="true" placeholder="输入单号或对准条形码扫码" :show-action="false"
                v-model="pageData.keyWord" @search="getProductionInfo" />
        </view>
    </view>
</template>

<script setup>
    import { searchAnteriorInfo } from '@/api/odoo.js'
    import to from 'await-to-js';
    import { reactive, getCurrentInstance } from 'vue';

    const pageData = reactive({
        keyWord: ''
    });
    const { proxy } = getCurrentInstance()

    // 查询单据信息功能
    async function getProductionInfo () {
        var [error, data] = await to(searchAnteriorInfo(pageData.keyWord));
        // 若 error 存在，则需要提示报错信息
        if (error) return proxy.$errorMsg(error);

        if (data.result.length === 0) return proxy.$warningMsg('系统中未查询到相应的订单信息');
        // 将查询到的数据存储在缓存中
        uni.setStorageSync('equipmentJob', data.result[0]);

        return proxy.$successMsg('查询成功', 3000, { url: '/pages/report-works/anterior/index/index' });
    }
</script>

<style lang="scss" scoped>
    @import 'search.scss';
</style>