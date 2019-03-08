import axios from 'axios';
var qs = require('qs');

const util = {};
util.title = function(title) {
	if (title === undefined) {
		return window.document.title;
	}   
	window.document.title = (title ? title : '');
};

//模板加代理插件
util.ajax = (function() {
	var ajax = axios.create({
		baseURL: '',
		timeout: 60000,
		withCredentials: false,
		responsetype: 'json',
		validateStatus: function(status) {  /* eslint-disable-line */
			return true; //错误码交给checkAjaxJson去验证
		},
		transformResponse: [function(data) {
			return data;
		}]
	});
	ajax.interceptors.request.use((config) => {
		var webUrl=String(window.location.hash).substr(1);
		var index=webUrl.indexOf('?');
		if(index>=0)webUrl=webUrl.substr(0,index);
		if (config.method === 'post') {
			if(!config.data)config.data={};
			if(config.data instanceof FormData){
				//config.data.append("webUrl",webUrl);
			}else{
				//config.data.webUrl = webUrl;
				config.data = qs.stringify(config.data);
			}
		}else{
			if(!config.params)config.params={};
			//config.params.webUrl=webUrl;
		}
		return config;
	}, (error) => {
		return Promise.reject(error);
	});
	return ajax;
})();

var CheckFun = function(json) {
	this.json = json;
};
CheckFun.prototype = {
	autoRun: function() {
		var arg = Array.prototype.slice.call(arguments, 0);
		for(var i=0;i<arg.length;i++){
			var command=String(arg[i]?arg[i]:'').replace(/^\s*$/g,'');
			if(this!=window && typeof this['then' + command.substr(0,1).toUpperCase() + command.substr(1)] ==='function'){
				this['then' + command.substr(0,1).toUpperCase() + command.substr(1)]();
			}
		}
		return this;
	},
	thenError: function(fun) {
		if (this.json.status == 'error' || this.json.status == 'fail') {
			if (typeof fun == 'function') {
				this.json.status = 'error';
				fun(this.json);
			} else {
				//默认错误处理函数
				if (window.WebSiteApp) {
					window.WebSiteApp.$Message.error(this.json.message);
				} else if (console && console.error) {
					console.error(this.json.message);
				}else{
					alert(this.json.message);
				}
			}
		}else if(this.json.status==='authority'){
			if (window.WebSiteApp) {
				window.WebSiteApp.$Message.error(this.json.message?this.json.message:'您没有访问权限，请更换账号后重试');
			} else if (console && console.error) {
				console.error(this.json.message?this.json.message:'您没有访问权限，请更换账号后重试');
			}else{
				alert(this.json.message?this.json.message:'您没有访问权限，请更换账号后重试');
			}
		}
		return this;
	},
	thenSuccess: function(fun) {
		if (this.json.status == 'success') {
			if (typeof fun == 'function') fun(this.json);
		}
		return this;
	},
	thenComplete: function(fun) {
		if (typeof fun == 'function') fun(this.json);
		return this;
	},
	thenLogin: function(fun) {
		if (this.json.status == 'login') {
			if (typeof fun == 'function') {
				if (fun(this.json) === false) {
					return this;
				}
				window.WebSiteApp.$router.push('/login.html');
			}else{
				window.WebSiteApp.$router.push('/login.html');
			}
		}
		return this;
	}
};

util.checkAjaxJson = function(res) {
	var jsonData = {};
	/*if(res.){

    }*/
	var errStatus = {
		300: '资源已被转移至其他位置',
		301: '请求的资源已被永久移动到新URI',
		302: '请求的资源已被临时移动到新URI',
		305: '请求的资源必须通过代理访问',
		400: '错误资源访问请求',
		401: '资源访问未授权',
		403: '资源禁止访问',
		404: '未找到要访问的资源',
		405: '请更换请求方法',
		406: '无法访问',
		408: '请求超时',
		413: '请求实体过大',
		414: '请求URI过长',
		500: '内部服务器错误',
		501: '未实现',
		503: '服务无法获得'
	};
	if (res.status >= 300 && res.status < 600) {
		var errorMessage = '未知的访问错误，状态吗：' + String(res.status);
		if (errStatus[String(res.status)]) {
			errorMessage = errStatus[String(res.status)];
		}
		jsonData.status = 'error';
		jsonData.message = errorMessage;
		jsonData.data = res.data;
	} else if (res.config.responsetype !== 'json') {
		jsonData.status = 'error';
		jsonData.message = '无法解析服务器端数据格式。';
		jsonData.data = res.data;
	} else if (typeof res.data === 'string') {
		try {
			jsonData = JSON.parse(res.data);
		} catch (e) {
			jsonData.status = 'error';
			jsonData.message = '无法解析服务器端数据格式。';
			jsonData.data = res.data;
		}
	}
	if (jsonData.status === undefined) {
		jsonData.status = 'error';
		jsonData.message = '无法解析服务器端数据格式。';
		jsonData.data = res.data;
	}
	return new CheckFun(jsonData);
};
util.checkAjaxError = function(error,errorMessage) {
	console.error(error);
	//默认错误处理函数
	var errorMsg=errorMessage?errorMessage:'Ajax处理函数发生错误';
	if (window.WebSiteApp) {
		window.WebSiteApp.$Message.error(errorMsg);
	} else if (console && console.error) {
		console.error(errorMsg);
	}else{
		alert(errorMsg);
	}
	return {autoRun:CheckFun.prototype.autoRun};
};

   
export default util;
