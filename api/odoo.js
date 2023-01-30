import { Login, Search, Call } from "@/utils/odoo.js";
import to from 'await-to-js';

const ANTERIOR_EQUIPMENT_JOB = 'anterior.equipment.job'

export function isError (error, data) {
    if (error) throw error;

    if (data.hasOwnProperty('error')) throw data.error.data.message;
}

// odoo 登录接口
export async function odooLogin (username = '', password = '') {
    var [error, data] = to(await Login({
        username: username,
        password: password
    }))

    if (error) throw error

    if (data.hasOwnProperty('error') && res.error.message === 'Odoo Server Error') {
        throw '用户名或密码错误'
    }

}

export async function searchAnteriorInfo (order = '') {
    var json = {
        model: 'anterior.equipment.job',
        domain: [
            ['name', '=', order]
        ],
        fields: ['id', 'name']
    }

    var [error, data] = await to(Search(json));

    isError(error, data);

    return data.result;
}

// 查询设备作业单详情信息
export async function searchEquipmentJobInfo (id) {
    var json = {
        model: ANTERIOR_EQUIPMENT_JOB,
        domain: [['id', '=', id]],
        fields: ['id', 'product_id', 'equipment_id', 'team_id', 'product_qty', 'state', 'mrp_task_id', 'location_id']
    }
    var [error, data] = await to(Search(json));

    isError(error, data);

    return data.result;
}

// 创建物料临时向导
export async function createRackWizardId (jobId) {
    var json = {
        method: 'api_create_wizard_operate_component',
        args: [jobId],
        model: ANTERIOR_EQUIPMENT_JOB
    }

    var [error, data] = await to(Call(json));

    isError(error, data);

    return data.result
}