// 梳栉数组
const guideBarsArray = [
    { label: 'GB1', value: 'GB1' },
    { label: 'GB2', value: 'GB2' },
    { label: 'GB3', value: 'GB3' },
    { label: 'GB4', value: 'GB4' },
    { label: 'GB5', value: 'GB5' },
    { label: 'GB6', value: 'GB6' },
    { label: 'GB7', value: 'GB7' },
];

// 布面数组
const clothCoverArray = [
    { label: 'A面', value: 'A_cover' },
    { label: 'B面', value: 'B_cover' },
    { label: 'C面', value: 'C_cover' },
    { label: 'D面', value: 'D_cover' },
]

// 报工字段数组
const fieldsList = [
    { name: '重量', model: 'weight', type: 'number', required: true },
    { name: '根数', model: 'line_number', type: 'input', required: true },
    { name: '圈数', model: 'turn_number', type: 'input', required: true },
    { name: '纱线长度', model: 'yarn_length', type: 'number', required: true },
    { name: '米数', model: 'pantou_meter', type: 'number', required: true },
    { name: '实测外径', model: 'measured_outer_diameter', type: 'input', required: true },
    { name: '布面', model: 'cloth_cover', type: 'select', data: clothCoverArray },
    { name: '梳栉', model: 'guide_bars', type: 'select', data: guideBarsArray, required: true },
    { name: '盘头编号', model: 'panhead_id', type: 'input', required: true },
    { name: '门幅', model: 'width', type: 'number', required: true },
    { name: '数量', model: 'product_qty', type: 'number', required: true },
    { name: '原料批次', model: 'raw_material_batch', type: 'input', required: true },
    { name: '质量情况', model: 'quality_info', type: 'textarea', required: true },
    { name: '员工', model: 'user_ids', type: 'checkbox', data: [], required: true },
    { name: '盘头位移', model: 'pan_head_displacement', type: 'input', required: true }
]

export function getReportFields (fields = []) {
    var fieldsData = [];

    fields.forEach(element => {
        var res = fieldsList.filter(item => element === item.model);
        fieldsData.push(res[0])
    })

    var form = {};

    fieldsData.forEach(item => {
        switch (item.type) {
            case 'checkbox':
                form[item.model] = []
                break;

            default:
                form[item.model] = ''
                break;
        }
    })
    return [form, fieldsData]
}
