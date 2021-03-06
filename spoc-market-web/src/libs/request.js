import { httpCreate, } from '@public/libs/request';
import qs from 'qs';
export const baseURL = "/spoc-market/a/ws/market";
export const baseURLSys = "/spoc-market/a/ws/sys";
export const baseURLSysX = "/spoc-market/a/wx";
export const baseURLSys1 = "/spoc-choiceschool/a/ws/sys";
export const baseURLPlanCom = "/spoc-plan/a/ws/common";
export const baseURLMarketCom = "/spoc-market/a/ws/common";
export const http = httpCreate(baseURL);
export const httpForm = httpCreate(baseURL, [function (data, headers) {
	return qs.stringify(data);
}]);
export const httpSys = httpCreate(baseURLSys);
export const httpSysX = httpCreate(baseURLSysX);
export const httpPlanCom = httpCreate(baseURLPlanCom);
export const httpMarketCom = httpCreate(baseURLMarketCom);

export {errors, sys, common, other , default,} from '@public/libs/request';

export { crossSellAduit, } from './crossSellAduit.js';
export {wpMarketCommon} from './wpMarketCommon';
export {wpMaterialText} from './wpMaterialText';
export {wpInvitingPage} from './wpInvitingPage';
export {wpMaterialImage} from './wpMaterialImage';
export {wpMaterialDoc} from './wpMaterialDoc';
export {wpMaterialNews} from './wpMaterialNews';
export {wpGoods} from './wpGoods';
export {groupB} from './groupB';
export {wpMaterialFile} from './wpMaterialFile'; 
export {comFormTable} from './comFormTable';
export {overView} from './overView';
export {publicNumM} from './publicNumM';
export {publicAction} from './publicAction';
export {wpTask} from './wpTask.js';
export {marketManM} from './marketManM';
export {useM} from './useM';
export {orderM} from './orderM';
export { wpExpand } from './wpExpand';
export { expandMan } from './expandMan';
export { wpCrmCustomer } from './wpCrmCustomer';
