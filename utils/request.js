import config from "@/config.js"; // 配置文件

export default {

	send(options = {}) {

		// 拼接路径
		let url = /^(http|https):\/\/.*/.test(options.url) ? options.url : config.url + options.url;
		options.url = url;

		// 请求方式
		options.method = options.method || 'GET';

		console.log(JSON.stringify(options)); // 打印请求数据，调试使用

		// 发起 Promise 请求
		return new Promise((resolve, reject) => {
			// Loading 加载
			uni.showLoading({
				mask: true,
				title: 'Loading...'
			})

			uni.request({
				...options,
				url,
				// 统一设置超时时间
				timeout: options.timeout || 60000,
				headers: {
					...options.header,
					// 统一报文格式
					'Content-Type': 'application/json;charset=UTF-8'
				},
				success(res) {
					resolve(res.data)
				},
				fail(error) {
					console.log(JSON.stringify(error))
					reject(error)
				},
				complete() {
					uni.hideLoading()
				}
			})
		})
	},
	
	// GET 请求
	get(url = "", data = {}) {
		return this.send({
			url: url,
			data: data
		})
	},
	
	// POST 请求
	post(url = "", data = {}) {
		return this.send({
			url: url,
			data: data,
			method: "POST"
		})
	}
}
