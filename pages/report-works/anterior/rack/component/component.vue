<template>

    <view>
        <u-toast ref="uToast" />

        <!-- 物料上料 -->
        <u-cell-group v-for="(item, index) in showData.array" :key="index" v-if="showData.type === 'material'">
            <u-cell-item>
                <template v-slot:label>
                    <view>
                        <text>上料数量：</text>
                    </view>
                </template>
            </u-cell-item>
        </u-cell-group>


    </view>

</template>

<script setup>
    import { reactive, getCurrentInstance, defineProps } from 'vue'
    import { onShow } from '@dcloudio/uni-app'
    import to from 'await-to-js'

    const { proxy } = getCurrentInstance()
    const props = defineProps({})
    const showData = reactive({
        type: '',
        array: []
    })

    onShow(() => { })

    // 获取组件信息
    const getComponentList = () => { }

    // 跳转至扫码上料页面
    const goToScan = () => { }

    // 跳转至组件详情页面
    const goToDeatail = () => { }
</script>

<style lang="scss">
    @import 'component.scss';
</style>