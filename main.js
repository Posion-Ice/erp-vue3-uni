import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue';
import uView from './uni_modules/vk-uview-ui';

export function createApp() {
	const app = createSSRApp(App)

	// 注册 uView-ui 定义的 u-toast 组件方法
	app.config.globalProperties.$msg = function(title, type = 'default', duration = 3000, params) {
		return this.$refs.uToast.show({
			title,
			type,
			duration,
			icon: false,
			...params
		})
	}
	app.config.globalProperties.$successMsg = function(title, duration = 3000, params) {
		return this.$msg(title, 'success', duration, params)
	}
	app.config.globalProperties.$warningMsg = function(title, duration = 3000, params) {
		return this.$msg(title, 'warning', duration, params)
	}
	app.config.globalProperties.$errorMsg = function(title, duration = 3000, params) {
		return this.$msg(title, 'error', duration, params)
	}

	app.use(uView)
	return {
		app
	}
}
// #endif
