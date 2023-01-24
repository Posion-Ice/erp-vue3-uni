import {
	Login,
	Search
} from "@/utils/odoo.js";
import to from 'await-to-js';

// odoo 登录接口
export async function odooLogin(username = '', password = '') {
	var [error, data] = to(await Login({
		username: username,
		password: password
	}))

	if (error) throw error

	if (data.hasOwnProperty('error') && res.error.message === 'Odoo Server Error') {
		throw '用户名或密码错误'
	}

}

export async function searchAnteriorInfo(order = '') {
	var json = {
		model: 'anterior.equipment.job',
		domain: [
			['name', '=', order]
		],
		fields: ['id', 'name']
	}
	
	var [error, data] = await to(Search(json));
	if (error) throw error;
	
	return data;
}
