import axios from "axios";
import qs from "qs";

const loginRouter = 'portal.login';

export const baseURL = "/spoc-salary/a/ws/salary";
export const baseURLSys = "/spoc-salary/a/ws/sys";
export const baseURLCommon = "/spoc-plan/a/ws/sys";
export const baseURLChoiceschool = "/spoc-choiceschool/a/ws/sys";

export const http = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true,
});

export const httpBlob = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true,
    responseType: 'blob',
});

export const httpCommon = axios.create({
    baseURL:baseURLCommon,
    timeout: 20000,
    withCredentials: true,
});

export const httpChoiceschool = axios.create({
    baseURL:baseURLChoiceschool,
    timeout: 20000,
    withCredentials: true,
});


export const httpFormData = axios.create({
    baseURL: baseURLChoiceschool,
    timeout: 20000,
    withCredentials: true,
    transformRequest: [function (data, headers) {
        return qs.stringify(data);
    }]
});

export const httpSys = axios.create({
    baseURL:baseURLSys,
    timeout: 20000,
    withCredentials: true,
});


 
export { errors, default, valid, crmCustomerSale, sys } from '@public/libs/request';
import { httpCreate} from '@public/libs/request';


//export {CONTRACTCATEGORY} from './contractCategory';
export { salUserBasicInfo } from './salUserBasicInfo';
export { user } from './user';
export { salCommon } from './salCommon';
export { salWorkHistory } from './salWorkHistory';
export { salUserEducation } from './salUserEducation';
export { salPerpetualCalenderRest } from './salPerpetualCalenderRest';
export { salRewardsPenalties } from './salRewardsPenalties';
export { salSalaryInfo } from './salSalaryInfo';
export { salEntryInfo } from './salEntryInfo';
export { salPerformanceInfo } from './salPerformanceInfo';
export { salDeparture } from './salDeparture';
export { salAttendance } from './salAttendance';
export { indexPage } from './indexPage';
export { salHistoryLog } from './salHistoryLog';
export { salSocialSecurity } from './salSocialSecurity';

export { attendanceManageApi } from './attendanceManage';
export { equation } from './equation';
export { salaryManageApi, } from './salaryManage';
export { socialSecurityApi, } from './socialSecurity';

export const httpJSON = httpCreate(baseURLChoiceschool);

export const listGrantMenu = (params) => {
    return axios.get('/spoc-plan/a/ws/sys/menu/listGrantMenu',{params});
}

export const getOfficeTree = (params) => {
    return http.get('/salUserBasicInfo/buildTree', {params});
};
export const delFac = (id) => {
    return httpFormData.post('/office/delete', {id})
}
export const getFacInfo = (id) => {
    return httpChoiceschool.get('/office/form', {params: {id}})
}
export const saveOffice = (data) => {
    return httpFormData.post('/office/saveOffice', data);
}
export const dictData = (type) => {
    return httpChoiceschool.get('/dict/listData', {params: {type}});
}
export const getOfficeList = () => {
    return httpChoiceschool.get('/office/list')
}
export const loadJobTree = (params) => {
    return http.get('/salUserBasicInfo/buildTreeForDict', {params});
}
export const dictDataSave = (data) => {
    return httpJSON.post('/dict/save', data);
}
export const dictDataDelJson = (params) => {
    return httpChoiceschool.post('/dict/delete', params)
}
export const dictDataId = (id) => {
    return httpChoiceschool.get('/dict/getById', {params: {id}});
}

