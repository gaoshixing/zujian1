<template>
	<div class="contentBox">
		<div class="loginBox">
			<div class="logo"></div>
			<template v-if="!firstLogin && !isFindPassword">
				<div class="infoList">
					<Input @on-enter="entLand" v-model="userName" size="large" placeholder="邮箱 账号 手机号"></Input>
					<p class="erro">{{nameTrue}}</p>
				</div>
				<div class="infoList">
					<Input @on-enter="entLand" type="password" v-model="password" size="large" placeholder="密码"></Input>
					<p class="erro">{{PassTrue}}</p>
				</div>
				<div class="infoList clearfix" v-if="showCode">
					<div class="fl codeIpt">
						<Input @on-enter="entLand" v-model="code" size="large" placeholder="验证码"></Input>
						<p class="erro">{{CodeTrue}}</p>
					</div>
					<div class="fr codeImg" @click="getCode">
						<img :src="codeImgUrl">
					</div>
				</div>
				<div class="loginRelated clearfix">
					<div class="fl">
						<Checkbox v-model="isRememberLoginInfo">两周内免登录</Checkbox>
					</div>
					<div class="fr forgetBtn" @click="forgetPassword">忘记密码？</div>
				</div>
				<div class="infoList">
					<Button type="primary" long size="large" @click="judge">登录</Button>
				</div>
			</template>
			<template v-if="firstLogin && !isFindPassword">
				<div>
					<h3>设置登录密码</h3>
					<p>为了您的账户安全，请修改系统登录初始密码。</p>
				</div>
				<div class="infoList">
					<Input @on-blur="valids" type="password" v-model="reset.oldpass" size="large" placeholder="初始密码"></Input>
					<p class="erro">{{reset.err.olderr}}</p>
				</div>
				<div class="infoList">
					<Input @on-blur="valids" type="password" v-model="reset.newpass" size="large" placeholder="新密码为6-32位字符"></Input>
					<p class="erro">{{reset.err.newerr}}</p>
				</div>
				<div class="infoList">
					<Input @on-enter="doReset" @on-blur="valids" type="password" v-model="reset.newpass2" size="large" placeholder="确认密码"></Input>
					<p class="erro">{{reset.err.sameerr}}</p>
				</div>
				<div class="infoList">
					<Button type="primary" long size="large" @click="doReset">登录</Button>
				</div>
			</template>
			<template v-if="isFindPassword">
				<div class="infoList">
					<Input v-model="findName" size="large" placeholder="请输入您的账号"></Input>
				</div>
				<div class="infoList">
					<Input type="text" v-model="findTel" size="large" placeholder="请填写您的手机号"></Input>
				</div>
				<div class="infoList login-auth-code">
					<Input type="text" v-model="findAuthCode" size='large' placeholder="验证码"></Input>
					<Button type="primary" :disabled="btnType" @click="onclickGetAuthCode">{{findButtonText}}</Button>
				</div>
				<div class="infoList">
					<Input type="password" v-model="findPassword" size="large" placeholder="请输入新密码"></Input>
				</div>
				<div class="infoList">
					<Button type="primary" long size="large" @click="resetPwd">登录</Button>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	import valid, { errors, codeImgUrl, login, resetPwd, sys,} from "../libs/request.js";
	import { mapMutations, mapState } from 'vuex';
	import Cookies from 'js-cookie';
	export default {
		data() {
			return {
				firstLogin: false,
				userName: "",
				password: "",
				code: "",
				isRememberLoginInfo: false,
				codeImgUrl: "",
				nameTrue: '',
				PassTrue: '',
				CodeTrue: "",
				showCode: false,
				reset: {
					oldpass: '',
					newpass: '',
					newpass2: '',
					err: {
						olderr: '',
						newerr: '',
						sameerr: ''
					}
				},
				count: 60,
				getting: false, // 读秒是否结束
				findName: null,
				findTel: null,
				findAuthCode: null,
				findPassword: null,
				isFindPassword: false,
				btnType: false,
				findButtonText: '获取验证码',
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		mounted() {
			if(this.userInfo.id) {
				this.$router.push({
					name: this.$store.state.config.homeRouter
				});
			}
			// console.log(this.userInfo, 999)
		},

		methods: {
			...mapMutations(['updateLoadingStatus', 'updateUserInfo']),
			entLand() {
				this.judge();
			},
			judge() {
				var regexpTel = /^([0-9]|[a-zA-Z]|[@$]){4,32}$/;
				if(this.userName == '') {
					this.nameTrue = '请填写账号';
					return
				} else {
					this.nameTrue = '';
				};
				if(this.userName.length > '40') {
					this.nameTrue = '账号长度40个字符之内';
					return
				} else {
					this.nameTrue = '';
				};
				if(this.password == '') {
					this.PassTrue = '请填写密码';
					return
				} else {
					this.PassTrue = '';
				};
				if(!this.password.match(regexpTel)) {
					this.PassTrue = '请输入6-32位新密码';
					return
				} else {
					this.PassTrue = '';
				};
				if(this.showCode == true && this.code.length == '0') {
					this.CodeTrue = '请填写验证码';
					return
				} else {};
				var loginData = {
					username: this.userName,
					password: this.password,
					validateCode: this.code,
					isRememberLoginInfo: this.isRememberLoginInfo
				};
				this.loginAction(loginData);
			},
			valids() {
				var regexpTel = /^([0-9]|[a-zA-Z]|[@$]){4,32}$/;
				if(!this.reset.oldpass) {
					this.reset.err.olderr = '请填写旧密码';
					return;
				}
				this.reset.err.olderr = '';
				if(!this.reset.newpass) {
					this.reset.err.newerr = '请填写新密码';
					return;
				}
				this.reset.err.newerr = '';
				if(!this.reset.newpass.match(regexpTel)) {
					this.reset.err.newerr = '建议使用数字、字母、字符（@、$）的组合密码';
					return;
				}
				this.reset.err.newerr = '';
				if(this.reset.newpass != this.reset.newpass2) {
					this.reset.err.sameerr = '两次输入的密码不一致';
					return;
				}
				this.reset.err.sameerr = '';
				if(!(this.reset.newpass.length >= 6 && this.reset.newpass.length <= 32)) {
					this.reset.err.newerr = '密码为6-32位字符';
					return;
				}
				this.reset.err.newerr = '';
				if(this.reset.oldpass == this.reset.newpass) {
					this.reset.err.newerr = '新密码与初始密码重复';
					return;
				}
				this.reset.err.newerr = '';
				return true;
			},
			doReset() {
				if(!this.valids()) {
					return;
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				let d = {
					lgoinName: this.userName,
					oldPwd: this.reset.oldpass,
					newPwd: this.reset.newpass
				};
				resetPwd(d).then(res => {
					if(res.data.status == 'success') {
						var loginData = {
							username: d.lgoinName,
							password: d.newPwd,
						};
						login(loginData).then((res) => {
							if(res.data.status == 'success') {
								this.updateUserInfo({
									userInfo: {}
								}); // set empty will trigger getUserInfo
								this.$router.push({
									name: this.$store.state.config.homeRouter
								});
							} else {
								this.$Message.error(res.data.message);
							}
						}).catch(errors.call(this)).finally(() => {
							this.updateLoadingStatus({
								isLoading: false
							});
						});

					} else {
						this.$Message.error(res.data.message);
						this.updateLoadingStatus({
							isLoading: false
						});
					}
				}).catch(err => {
					errors.call(this)(err);
					this.updateLoadingStatus({
						isLoading: false
					});
				});

			},
			loginAction(loginData) {
				this.updateLoadingStatus({
					isLoading: true
				});
				login(loginData).then((res) => {
					if(!Cookies.get('lang')) {
						Cookies.set('lang', 'zh', {
							expires: 180
						});
					}
					this.getCode();
					if(res.data.status == 'success') {
						this.updateUserInfo({
							userInfo: {}
						}); // set empty will trigger getUserInfo
						this.$router.push({
							name: this.$store.state.config.homeRouter
						});
					} else {
						this.showCode = res.data.data.validateCodeLogin;
						if(res.data.data.firstLogin) {
							this.firstLogin = true;
						} else {
							this.$Message.error(res.data.message);
						}
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			forgetPassword() {
				this.isFindPassword = true;
			},
			getCode() {
				this.codeImgUrl = codeImgUrl();
			},
			browserInfo() {
				var document = window.document,
					navigator = window.navigator,
					agent = navigator.userAgent.toLowerCase(),
					//IE8+支持.返回浏览器渲染当前文档所用的模式
					//IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
					//IE10:10(兼容模式7||8||9)
					IEMode = document.documentMode,
					//chorme
					chrome = window.chrome || false,
					
					System = {
						//user-agent
						agent: agent,
						//是否为IE
//						isIE: /msie/.test(agent),
						isIE: (!!window.ActiveXObject || "ActiveXObject" in window),
						//Gecko内核
						isGecko: agent.indexOf("gecko") > 0 && agent.indexOf("like gecko") < 0,
						//webkit内核
						isWebkit: agent.indexOf("webkit") > 0,
						//是否为标准模式
						isStrict: document.compatMode === "CSS1Compat",
						//是否支持subtitle
						supportSubTitle: function() {
							return "track" in document.createElement("track");
						},
						//是否支持scoped
						supportScope: function() {
							return "scoped" in document.createElement("style");
						},
						//获取IE的版本号
						ieVersion: function() {
							try {
								return agent.match(/msie ([\d.]+)/)[1] || 0;
							} catch(e) {
								console.log("error");
								return IEMode;
							}
						},
						//Opera版本号
						operaVersion: function() {
							try {
								if(window.opera) {
									return agent.match(/opera.([\d.]+)/)[1];
								} else if(agent.indexOf("opr") > 0) {
									return agent.match(/opr\/([\d.]+)/)[1];
								}
							} catch(e) {
								console.log("error");
								return 0;
							}
						},
						//描述:version过滤.如31.0.252.152 只保留31.0
						versionFilter: function() {
							if(arguments.length === 1 && typeof arguments[0] === "string") {
								var version = arguments[0];
								start = version.indexOf(".");
								if(start > 0) {
									end = version.indexOf(".", start + 1);
									if(end !== -1) {
										return version.substr(0, end);
									}
								}
								return version;
							} else if(arguments.length === 1) {
								return arguments[0];
							}
							return 0;
						}
					};

				try {
					//浏览器类型(IE、Opera、Chrome、Safari、Firefox)
					System.type = System.isIE ? "IE" :
						window.opera || (agent.indexOf("opr") > 0) ? "Opera" :
						(agent.indexOf("chrome") > 0) ? "Chrome" :
						//safari也提供了专门的判定方式
						window.openDatabase ? "Safari" :
						(agent.indexOf("firefox") > 0) ? "Firefox" :
						'unknow';

					//版本号
					System.version = (System.type === "IE") ? System.ieVersion() :
						(System.type === "Firefox") ? agent.match(/firefox\/([\d.]+)/)[1] :
						(System.type === "Chrome") ? agent.match(/chrome\/([\d.]+)/)[1] :
						(System.type === "Opera") ? System.operaVersion() :
						(System.type === "Safari") ? agent.match(/version\/([\d.]+)/)[1] :
						"0";

					//浏览器外壳
					System.shell = function() {
						//遨游浏览器
						if(agent.indexOf("maxthon") > 0) {
							System.version = agent.match(/maxthon\/([\d.]+)/)[1] || System.version;
							return "傲游浏览器";
						}
						//QQ浏览器
						if(agent.indexOf("qqbrowser") > 0) {
							System.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || System.version;
							return "QQ浏览器";
						}

						//搜狗浏览器
						if(agent.indexOf("se 2.x") > 0) {
							return '搜狗浏览器';
						}

						//Chrome:也可以使用window.chrome && window.chrome.webstore判断
						if(chrome && System.type !== "Opera") {
							var external = window.external,
								clientInfo = window.clientInformation,
								//客户端语言:zh-cn,zh.360下面会返回undefined
								clientLanguage = clientInfo.languages;

							//猎豹浏览器:或者agent.indexOf("lbbrowser")>0
							if(external && 'LiebaoGetVersion' in external) {
								return '猎豹浏览器';
							}
							//百度浏览器
							if(agent.indexOf("bidubrowser") > 0) {
								System.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
									agent.match(/chrome\/([\d.]+)/)[1];
								return "百度浏览器";
							}
							//360极速浏览器和360安全浏览器
							if(System.supportSubTitle() && typeof clientLanguage === "undefined") {
								//object.key()返回一个数组.包含可枚举属性和方法名称
								var storeKeyLen = Object.keys(chrome.webstore).length,
									v8Locale = "v8Locale" in window;
								return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器';
							}
							return "Chrome";
						}
						return System.type;
					};

					//浏览器名称(如果是壳浏览器,则返回壳名称)
					System.name = System.shell();
					//对版本号进行过滤过处理
					System.version = System.versionFilter(System.version);

				} catch(e) {
					console.log("error");
				}
				console.log(System)
				return {
					client: System
				};
			},
			/*
			* 找回密码
			*/
			onclickGetAuthCode() {
				this.verificationFunc('auth');
				this.getting = true;
				this.btnType = true; // disabled
				const data = {
					loginName: this.findName,
					mobile: this.findTel,
				};
				sys.sendVerifyCode(data).then(valid.call(this)).then(res => {
					if (res.ok) {
						console.log('auth code res', res);
						this.$Message.info(res.data.message);
						this.getting = true;
						this.btnType = true; // disabled
						this.findButtonText = `${this.count}s后重新获取`; 
						let timer = window.setInterval(()=> {
							this.count--;
							this.findButtonText = `${this.count}s后重新获取`;
							if (this.count <= 0) {
								this.count = 60;
								this.getting = false;
								this.btnType = false;
								this.findButtonText = '获取验证码';
								clearInterval(timer);
							}
						}, 1000);
					} else {
						this.btnType = false;
						this.getting = false;
						console.log('else else');
					}
				}).catch(errors.call(this));
			},
			resetPwd() {
				this.verificationFunc('code');
				const data = {
					loginName: this.findName,
					mobile: this.findTel,
					code: this.findAuthCode,
					newPwd: this.findPassword,
				};
				const datas = new FormData();
				for (let k in data) {
					datas.append(k, data[k]);
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				sys.modifyPassword(datas).then(valid.call(this)).then(res => {
					this.updateLoadingStatus({
						isLoading: false,
					});
					console.log('res', res);
					if(res.data.message === '修改密码成功') {
						// this.updateUserInfo({
						// 	userInfo: {}
						// }); // set empty will trigger getUserInfo
						// this.$router.push({
						// 	name: this.$store.state.config.homeRouter
						// });
						console.log('修改密码成功');
						var loginData = {
							username: this.findName,
							password: this.findPassword,
							validateCode: this.code,
							isRememberLoginInfo: this.isRememberLoginInfo
						};
						this.loginAction(loginData);
					}
					}).catch(errors.call(this));
			},
			verificationFunc(type) {
				const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				if (!this.findName) {
					this.$Message.error('请输入您的账号');
					return false;
				}
				if (!reg.test(this.findTel)) {
					this.$Message.error('请输入正确的手机号');
					return false;
				}
				if (this.getting && type === 'auth') {
					this.$Message.error(`请${this.count}秒后再试`);
					return false;
				}
				if (!this.findAuthCode && type === 'code') {
					this.$Message.error(`请输入验证码`);
					return false;
				}
			},
		},
		watch: {
			userName(newVal, oldVal) {
				if(!!newVal) {
					this.nameTrue = "";
				}
			},
			password(newVal, oldVal) {
				if(!!newVal) {
					this.PassTrue = "";
				}
			},
			code(newVal, oldVal) {
				if(!!newVal) {
					this.CodeTrue = "";
				}
			}
		},
		computed: {},
		mounted() {
			//获取验证码
			this.getCode();
			let Browser = this.browserInfo();
			var browser = Browser.client.name ? Browser.client.name : 'IEedg';
			console.log(Browser)
			if(Browser.client.isIE) {//||Browser.client.type === "Safari"
				this.$Message.info({
					render: h => {
						return h('span', [
							'系统检测到您使用的浏览器可能存在兼容性问题，为了更好的操作体验，推荐下载',
							h('a', {
								attrs: {
									href: 'javascript:void(0)',
								},
								on: {
									click: () => {
										window.open('https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7B9E5235DA-DD13-8895-F4BF-EB61DF4546FA%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe')
									}
								}
							}, '谷歌'),
							' 、 ',
							h('a', {
								attrs: {
									href: 'javascript:void(0)',
								},
								on: {
									click: () => {
										window.open('https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe')
									}
								}
							}, '火狐'), ' 、 ',
							h('a', {
								attrs: {
									href: 'javascript:void(0)',
								},
								on: {
									click: () => {
										window.open('https://ie.sogou.com/')
									}
								}
							}, '搜狗'), ' 、 ',
							h('a', {
								attrs: {
									href: 'javascript:void(0)',
								},
								on: {
									click: () => {
										window.open('https://browser.360.cn/se/')
									}
								}
							}, '360浏览器（极速）'), '浏览器访问。'
						])
					},
					duration: 0,
					closable: true
				});
			}
		}
	}
</script>
<style scoped lang="less">
	.contentBox {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url("../assets/img/login/login_bg.png") no-repeat bottom center;
		background-size: cover;
	}
	
	.loginBox {
		width: 386px;
		height: 448px;
		background: #fff;
		border-radius: 4px;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
		border-top: 5px solid #44bcb7;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -193px;
		margin-top: -240px;
		padding: 0px 35px;
		.logo {
			margin: 30px 0px;
			height: 60px;
			width: 100%;
			background: url("../assets/img/login/login_logo.png") no-repeat center center;
		}
		.infoList {
			margin-top: 15px;
			.codeIpt {
				width: 200px;
			}
			.codeImg {
				width: 100px;
				height: 36px;
				border: 1px solid #e0e0e0;
				background: #f4fcfe;
				border-radius: 4px;
				img {
					width: 100%;
					height: 100%;
					overflow: hidden;
				}
			}
		}
		.loginRelated {
			margin-top: 15px;
			.forgetBtn {
				font-size: 12px;
				cursor: pointer;
			}
		}
		.erro {
			font-size: 12px;
			color: #444;
			color: red;
			height: 20px;
		}
	}
	.login-auth-code {
		.ivu-input-wrapper {
			width: 200px;
		}
		button {
			color: #fff;
			height: 36px;
			float: right;
			border: none;
			outline: none;
			padding: 0 15px;
			border-radius: 5px;
			background-color: #44bcb7;
		}
	}
</style>