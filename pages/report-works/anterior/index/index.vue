<template>

    <view class="u-p-16 container">
        <u-toast ref="uToast" />

        <!-- 头部 -->
        <view class="u-p-16 vk-header">
            <u-row gutter="16" style="height: 20%;">
                <u-col span="8" style="color: #7f7f7f;">任务：{{ pageData.name }}</u-col>
                <u-col span="4" style="color: #7f7f7f;">作业数：{{ pageData.productQty }}</u-col>
            </u-row>
            <u-row gutter="48">
                <u-col span="4">
                    <view style="font-size: 14px; color: #cccccc; font-weight: bold;">班组</view>
                    <view style="font-size: 14px; color: #000000; font-weight: bold;">
                        {{ pageData.teamId ? pageData.teamId[1] :'无' }}
                    </view>
                </u-col>
                <u-col span="4">
                    <view style="font-size: 14px; color: #cccccc; font-weight: bold;">设备</view>
                    <view style="font-size: 14px; color: #000000; font-weight: bold;">
                        {{ pageData.equipmentId ? pageData.equipmentId[1] :'无' }}
                    </view>
                </u-col>
            </u-row>
            <u-row gutter="16" style="height: 50%;">
                <u-col span="9">{{ pageData.productId ? pageData.productId[1].substring(10) : '无' }}</u-col>
                <u-col span="3">
                    <u-tag :text="stateMap[pageData.state]"></u-tag>
                </u-col>
            </u-row>
        </view>

        <!-- 主体 -->
        <view style="width: 100%; margin: auto; ">
            <u-button class="vk-button" :disabled="disabledMap.start">
                <view style="color: #4090ef" class="vk-button-view">
                    <u-icon name="photo" size="60" />
                    <text>上机</text>
                </view>
            </u-button>

            <u-button class="vk-button" :disabled="disabledMap.report" @clicK="goToNewPage('report')">
                <view style="color: #1dfa2c" class="vk-button-view">
                    <u-icon name="photo" size="60" />
                    <text>报工</text>
                </view>
            </u-button>

            <u-button class="vk-button" :disabled="disabledMap.rack" @click="goToNewPage('rack')">
                <view style="color: #ffa369" class="vk-button-view">
                    <u-icon name="photo" size="60" />
                    <text>设备物料</text>
                </view>
            </u-button>

            <u-button class="vk-button" :disabled="disabledMap.other">
                <view style="color: #35428d" class="vk-button-view">
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
    import { reactive, getCurrentInstance, watch } from 'vue';
    import { searchEquipmentJobInfo, createRackWizardId } from '@/api/odoo.js';
    import { onShow, onReady, onPullDownRefresh } from '@dcloudio/uni-app';
    import to from 'await-to-js';

    const { proxy } = getCurrentInstance();
    const pageData = reactive({});
    // 订单状态映射表
    const stateMap = reactive({
        'confirmend': '已确认',
        'progress': '进行中',
        'pending': '暂停',
        'done': '已完成',
        'cancel': '已取消'
    })
    // 是否禁用映射表
    const disabledMap = reactive({
        start: true,
        report: true,
        rack: true,
        other: true
    })

    onShow(() => {
        pageData.id = uni.getStorageSync('equipmentJob').id;
        pageData.name = uni.getStorageSync('equipmentJob').name;

        getEquipmentJob();
    })

    // 下拉刷新功能
    onPullDownRefresh(() => {
        getEquipmentJob();

        uni.stopPullDownRefresh(); // 关闭下拉刷新
    })

    // 获取设备作业单信息
    const getEquipmentJob = async () => {
        var [error, data] = await to(searchEquipmentJobInfo(pageData.id));

        if (error) return proxy.$errorMsg(error);

        var records = data.records[0];

        // 属性赋值
        pageData.productId = records.product_id;
        pageData.equipmentId = records.equipment_id;
        pageData.teamId = records.team_id;
        pageData.productQty = records.product_qty;
        pageData.state = records.state;
        pageData.mrpTaskId = records.mrp_task_id;
        pageData.LocationId = records.location_id;

        updateJobState();
        uni.setStorageSync('jobInfo', records);  // 缓存对应的数据信息
    }

    // 更新设备作业单状态
    const updateJobState = async () => {
        switch (pageData.state) {
            case 'progress':
                disabledMap.start = true;
                disabledMap.report = false;
                disabledMap.rack = false;
                disabledMap.other = false;
                break;

            case 'confirmed':
            case 'pending', '':
                disabledMap.start = false;
                disabledMap.report = true;
                disabledMap.rack = true;
                disabledMap.other = true;
                break;

            default:
                disabledMap.start = true;
                disabledMap.report = true;
                disabledMap.rack = true;
                disabledMap.other = true;
                break;
        }
    }

    // 跳转至相对应的页面
    const goToNewPage = async (optionType) => {
        var url = '';

        switch (optionType) {
            case 'report':
                url = '/pages/report-works/anterior/report/detail/detail';
                break;

            case 'rack':
                var wizardId = await to(createRackWizardId(pageData.id)); // 生成临时向导
                url = `/pages/report-works/anterior/rack/component/component?id=${pageData.id}&wizard_id=${wizardId}`;
                break;

            default:
                url = '';
                break;
        }
        if (!url) return proxy.$warningMsg('未匹配到相应的路由，请重新确认！');

        return proxy.$successMsg('即将跳转，请耐心等待！', 3000, { url: url });
    }
</script>

<style lang="scss">
    @import 'index.scss';
</style>