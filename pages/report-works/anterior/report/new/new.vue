<template>

    <view class="content">
        <!-- 头部 -->
        <view class="header">经编盘头欣战江55dt/24F长丝浅灰HGXZJ22015*315</view>

        <!-- 主体 -->
        <view class="main u-p-32">
            <u-form :rules="formObj.rules" ref="uForm" :model="formObj.form">
                <u-form-item v-for="(item, index) in formData" :label="item.name" :prop="item.model"
                    :required="item.required" :label-width="item.label_width || 180">

                    <!-- 根据 type 来展示相应的输入情况 -->
                    <u-input v-if="['text', 'input', 'number', 'textarea'].includes(item.type)" v-model="item.value"
                        :type="item.type" :placeholder="'请输入' + item.name" />

                    <u-input v-if="['select'].includes(item.type)" v-model="item.label" :type="item.type"
                        :placeholder="'请选择' + item.name" @click="item.show= true" />
                    <u-select v-model="item.show" :list="item.data" @confirm="selectConfirm($event, item)" />
                    <!-- checkbox -->
                    <u-checkbox-group v-if="['checkbox'].includes(item.type)"
                        @change="checkboxGroupChange($event, item)" wrap="true">
                        <u-checkbox size="45" label-size="30" v-for="(checkboxItem, checkboxIndex) in item.data"
                            :key="checkboxIndex" shape="circle" v-model="checkboxItem.checked"
                            :name="checkboxItem.value">
                            {{ checkboxItem.label }}
                        </u-checkbox>
                    </u-checkbox-group>
                </u-form-item>

                <u-button @click="submitData" type="primary">提交</u-button>
            </u-form>
        </view>
    </view>

</template>

<script setup>
    import { reactive, getCurrentInstance, computed } from "vue";
    import { onShow, onReady } from "@dcloudio/uni-app";
    import { getReportFields } from '@/pages/report-works/anterior/report/new/fields.js'

    onShow(async () => {
        // 根据车间的不同展示不同的报工字段信息
        [formObj.form, formObj.formList] = await getReportFields(reportFieldsMap['机织整经']);

        getUserIds();
    })

    onReady(() => {
        // 在 onReady 生命周期调用组件的 setRules 方法绑定验证规则（在 onLoad 生命周期组件可能尚未创建完毕）
        proxy.$refs.uForm.setRules(formObj.rules);
    })

    // 表单数据
    const formObj = reactive({
        form: {
            user_ids: []
        },
        formList: [],
        rules: {
            weight: [
                { required: true, message: '请输入重量', trigger: ['change', 'blur'] }
            ]
        }
    })
    const { proxy } = getCurrentInstance()
    const reportFieldsMap = reactive({
        '经编整经': ['weight', 'line_number', 'turn_number', 'yarn_length', 'pantou_meter', 'measured_outer_diameter', 'guide_bars', 'panhead_id', 'raw_material_batch', 'quality_info', 'user_ids'],
        '经编': ['cloth_cover', 'width', 'weight', 'product_qty', 'quality_info', 'user_ids'],
        '机织整经': ['panhead_id', 'pan_head_displacement', 'raw_material_batch', 'line_number', 'turn_number', 'measured_outer_diameter', 'weight', 'pantou_meter', 'quality_info', 'user_ids'],
        '机织': ['cloth_cover', 'width', 'weight', 'product_qty', 'quality_info', 'user_ids'],
        '纬编': ['cloth_cover', 'width', 'weight', 'product_qty', 'quality_info', 'user_ids'],
    })

    const formData = computed({
        // 获取
        get () {
            // 循环遍历一遍数据，整理数据赋值给相应的字段信息
            formObj.formList.forEach(element => {
                // checkbox 回显
                if (element.type === 'checkbox') {
                    element.data.forEach(item => {
                        // 查询 form 中的 model 是否包含该值，若存在该值页面也相应的进行变更，展示
                        item.checked = formObj.form[element.model].includes(item.value)
                    })
                }
            });

            return formObj.formList
        },

        // 设置
        set (nval) {
            proxy.$emit('input', nval)
        }
    })

    // 单选，回调函数
    const selectConfirm = ($event, item) => {
        // 赋值给对应的 formObj.formList 数组中
        item.label = $event[0].label;
        item.value = $event[0].value;

        // 最后将值赋值给 formObj.formData 中，供 u-form 进行校验
        formObj.form[item.model] = item.value;
        proxy.$emit('input', formData);
    }

    // 复选，回调函数
    const checkboxGroupChange = ($event, item) => {
        formObj.form[item.model] = $event;
        item.value = $event;

        proxy.$emit('input', formData);
    }

    // 提交数据
    const submitData = () => {
        proxy.$refs.uForm.validate(valid => valid ? console.log('验证成功') : console.log('验证失败'))
    }

    // 获取员工数据信息
    const getUserIds = () => {
        var res = formObj.formList.filter(item => item.model === 'user_ids');
        console.log(res)
        if (!res) return
        res.data = uni.getStorageSync('userIds') ? [] : uni.getStorageSync('userIds') // 获取存储在缓存中的员工信息
    }
</script>

<style lang="scss">
    @import 'new.scss';
</style>