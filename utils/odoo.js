import config from "@/config.js";
import request from "@/utils/request.js";
import to from 'await-to-js';


// odoo 登录功能
export function Login(params) {
	var json = {
		jsonrpc: '2.0',
		params: {
			db: config.odooDB,
			login: params.username,
			password: params.password
		}
	}

	return request.post(config.odooURL + '/web/session/authenticate', json)
}

// odoo 调用函数方法
export function Call(params) {

}

// odoo 查询功能
export async function Search(params) {
	var json = {
		jsonrpc: '2.0',
		method: 'call',
		id: 1,
		params: {
			model: params.model,
			fields: params.fields || [],
			domain: params.domain || [],
			offset: params.offset,
			sort: params.sort,
			context: params.context || {}
		}
	}

	var [error, data] = to(await request.post(config.odooURL + '/web/dataset/search_read', json));
	if (error) throw error;
	
	if (data.hasOwnProperty('error')) throw data.error.data.message;
	
	return data
}
