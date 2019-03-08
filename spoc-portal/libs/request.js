import axios from 'axios';
import qs from 'qs';

const baseURL = '/spoc-choiceschool/a/ws/sys';
const baseURLChooseSchool = '/spoc-choiceschool/a/ws/choiceschool';
const baseURLSearch = '/spoc-search/a/ws/search';
const baseURLCRM = '/spoc-crm/a/ws/crm';
const baseURLSalary = '/spoc-salary/a/ws/salary';

export const baseURLCommon = '/spoc-plan/a/ws/common';
export const baseURLChooseSchoolC = '/spoc-choiceschool/a/ws/common';
export const baseURLSys = '/spoc-choiceschool/a/ws/sys';
export const baseCRMURLSys = '/spoc-crm/a/ws/sys';
export const baseCRMURLCommon = '/spoc-crm/a/ws/common';
export const baseApplyURLCommon = '/spoc-apply/a/ws/common'; 
export const baseMarketURLSys = '/spoc-market/a/ws/sys';

//const baseURL = "/spoc-contract/a/ws/sys";
const loginRouter ='portal.login';

const headers = {
	'X-Requested-With': 'XMLHttpRequest',
	'Pragma': 'no-cache',
	'Expires': 0
};

export const httpCreate = (baseURL, transformRequest) => {
	const config = {};
	if (transformRequest) {
		config.transformRequest = transformRequest;
	}
	return axios.create(Object.assign({
		baseURL,
		timeout: 30000,
		withCredentials: true,
		headers,
	}, config));
};

export const httpCreateTimeoutOneHour = (baseURL, transformRequest) => {
	const config = {};
	if (transformRequest) {
		config.transformRequest = transformRequest;
	}
	return axios.create(Object.assign({
		baseURL,
		timeout: 24*3600000, //现在改为24小时
		withCredentials: true,
		headers,
	}, config));
};

// eslint-disable-next-line
export const http = httpCreate(baseURL, [function (data, headers) {
	return qs.stringify(data);
}]);
export const httpCommon = httpCreate(baseURLCommon);
export const httpChooseSchoolC = httpCreate(baseURLChooseSchoolC);
export const httpSys = httpCreate(baseURLSys);
export const httpCRMSys = httpCreate(baseCRMURLSys);
export const httpCRMCommon = httpCreate(baseCRMURLCommon);
export const httpMarketys = httpCreate(baseMarketURLSys);

export const httpChooseSchool = httpCreate(baseURLChooseSchool);
export const httpSearch = httpCreate(baseURLSearch);
export const httpCRM = httpCreate(baseURLCRM);
export const httpSalary = httpCreate(baseURLSalary);
export const httpCRMTimeoutOneHour = httpCreateTimeoutOneHour(baseURLCRM);
export const httpApplyCommon = httpCreate(baseApplyURLCommon); 

// export const httpCRMFD = httpCreate(baseURLCRM, [function (data, { "Content-Type": "application/x-www-form-urlencoded", }) { let ret = ''; for (let it in data) { ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&' ; }  return ret }]);

export {news} from './newsList';
export {infoSet} from './infoSetting';
export {sysConfig} from './sysConfig';
export {sys} from './sys';
export {common} from './common';
export {other} from './other';
export {xxStudent} from './xxStudent'
export { crmCustomerSale } from './crmCustomerSale';


let autoLogoutNumber = 0;
export default function() {
	return (res)=>{
		
		// bug 1077 曹见芳 2018-7-20 start
		let urlStr = res.config.url;
		let logoutUrl = '/spoc-choiceschool/a/ws/sys/logout';
		if(res.data.statusCode == 401 && urlStr != logoutUrl && autoLogoutNumber == 0) {
			autoLogoutNumber++;
			if(this.$root.onLogout){
                this.$root.onLogout();
            }
            this.$store.dispatch('portal/autoLogout');
		}
		// bug 1077 曹见芳 2018-7-20 end
		
		if(res.data){
			if(res.data.status=='login'){
				if(this.$route.name != loginRouter){
					this.$router.push({name:loginRouter});
				}
			} else if (res.data.status=='error' || res.data.status == 'authority'){
				if(res.data.message.indexOf('电话已存在') > -1){
					//BUG #2085
					this.$Message.error({
						content: res.data.message,
						duration: 6
					});
				} else {
					this.$Message.error(res.data.message);
				}
			} else if(res.data.status=='location'){
				location.href = res.data.location;
			} else if(res.data.status=='success'){
				res.ok = true;
			} else{
				console.error('unknow status');
			}
		}
		return res;
	};
}

export const errors =function() {
	return (err)=>{
		this.$store.commit('updateShowErrorStatus',{showError:true})
		if(err){
			this.$Message.error({
                content: err.toString(),
                duration: 4
            });
		}
	};
};

export const login = (loginData) => {
	autoLogoutNumber = 0;
	return http.post('/login',loginData);
};

export const resetPwd = (data) => {
	return http.post('/user/resetPwd',data);
};

export const codeImgUrl = () =>{
	return '/spoc-choiceschool/servlet/validateCodeServlet?t='+(new Date().getTime());
};

export const saveApp = (info) => {
	return http.post('/menu/saveMenu', info);
};

// isQuick=0/1
export const saveQuickMenu = (id,isQuick) => {
	return http.post('/menu/saveQuickMenu',{id,isQuick});
};

const baseURLPlan = '/spoc-plan/a/ws/plan';
export const httpPlan = httpCreate(baseURLPlan);
export {plServiceGroup} from './plServiceGroup'
export {plServiceStatus} from './plServiceStatus'

/*
* 导入 excel
*/
export const importSalaryAttendanceExcel = (data) => {
	return httpSalary.post('/salAttendance/import', data);
};
export const importSalarySocialExcel = (data) => {
	return httpSalary.post('salPerformanceInfo/import', data);
};
export const importSalaryManageExcel = (data) => {
	return httpSalary.post('salSalaryInfo/import', data);
};
export const importSalaryPersonnelExcel = (data) => {
	return httpSalary.post('salUserBasicInfo/import/importUser', data);
};
export const importWorkHistory = (data) => {
	return httpSalary.post('salWorkHistory/importExcel', data);
};
export const importEducation = (data) => {
	return httpSalary.post('salUserEducation/importExcel', data);
};
export const importBonusPenalty = (data) => {
	return httpSalary.post('salRewardsPenalties/importExcel', data);
};
export const importUserBasicInfo = (data) => {
	return httpSalary.post('salUserBasicInfo/importExcel', data);
};