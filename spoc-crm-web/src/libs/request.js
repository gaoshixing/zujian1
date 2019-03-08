import { httpCreate} from '@public/libs/request';
export const baseURL = '/spoc-crm/a/ws/crm';
export const baseURLCommon = '/spoc-crm/a/ws/common';
export const baseURLSys = '/spoc-crm/a/ws/sys';

export const http = httpCreate(baseURL);
export const httpCommon = httpCreate(baseURLCommon);
export const httpSys = httpCreate(baseURLSys);

export {errors, sys, common, other , default, valid, sysConfig,  crmCustomerSale } from '@public/libs/request';

export { crmCustomer, } from './crmCustomer'
export { recordManage, } from './recordManage';
export { MARKETP, } from './marketP';
export { crmCustomerPub } from './crmCustomerPub';
export { crmAllocPlan } from './crmAllocPlan';
export { crmCustomerShare } from './crmCustomerShare';
export { messageManage, } from './messageManage';
export { ADMIN } from './admin';
export { crmTrace } from './crmTrace'
export { comTag } from './comTag';
export { crmAllocResult } from './crmAllocResult';
export { crmLocation, } from './crmLocation';
export { crmNotification, } from './crmNotification';
export { crmCustomerTmk, } from './crmCustomerTmk';
export { crmCustomerImport, } from './crmCustomerImport';
export { crmChannel} from './crmChannel';
export { STATISTICSC} from './statisticsComment';
export { crmStatistics } from './crmStatistics';
export { newResource } from './newResource';