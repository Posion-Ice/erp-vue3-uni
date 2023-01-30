import config from "@/config.js";
import request from "@/utils/request.js";

// odoo 登录功能
export function Login (params) {
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
export async function Call (params) {
    var json = {
        jsonrpc: '2.0',
        method: 'call',
        id: 1,
        params: {
            model: params.model,
            method: params.method,
            args: params.args || [],
            kwargs: params.kwargs || {}
        }
    }

    return request.post(`${config.odooURL}/web/dataset/call_kw/${params.model}/${params.method}`, json)
}

// odoo 查询功能
export async function Search (params) {
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

    return request.post(config.odooURL + '/web/dataset/search_read', json)
}
