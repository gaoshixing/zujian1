import axios from "axios";

const loginRouter = 'portal.login';

export const baseURL = "/spoc-contract/a/ws/contract";

export const baseURLCommon = "/spoc-contract/a/ws/sys";

export const baseMarket = "/spoc-market/a/ws/market";

export const http = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true,
});

export const httpCommon = axios.create({
    baseURL:baseURLCommon,
    timeout: 20000,
    withCredentials: true,
});

export const httpMarket = axios.create({
    baseURL:baseMarket,
    timeout: 20000,
    withCredentials: true,
});


 
export {errors, default, valid, crmCustomerSale, sys } from '@public/libs/request';



export {CONTRACTCATEGORY} from './contractCategory';
export {choiceschool} from './choiceschool';
export {htTag} from './tag';
export {htContractTpl} from './contractTpl';
export {common} from './sys';
export {SELLTARGET} from './sellTarget';
export {SIGNAPPROVAL} from './signApproval';
export {ANALYSE} from './analyse';
export {htPolicy,htRule} from './htPolicy';
export {htItem} from './htItem';
export {SIGNTAGMANAGE} from './signTagManage';
export {SIGNMANAGE} from './signManage';
export {contract} from './htContract';
export {ec} from './ec';
export {account} from './account';
export {discountTabOther} from './discountTabOther';



export const listGrantMenu = (params) => {
    return axios.get('/spoc-contract/a/ws/sys/menu/listGrantMenu',{params});
}
export const updateIsContract = (params) => {
    return axios.get('/spoc-crm/a/ws/crm/crmCustomer/updateIsContract',{params});
}

