import { httpCreate, } from '@public/libs/request';
export const baseURL = "/spoc-apply/a/ws/apply";

export const http = httpCreate(baseURL);

export {errors, sys, common, other , default, plServiceGroup} from '@public/libs/request';

export {docEssayTask} from './docEssayTask'
export { docuLibrarySearch, } from './docuLibrarySearch';
export { closeApproval, } from './closeApproval';
export { STATISTICS, } from './statistics';
export { aplApplyTask, } from './aplApplyTask';
export { aplApplyInfo, } from './aplApplyInfo';
export { aplApplyConfirm, } from './aplApplyConfirm';
export { aplApplyResult, } from './aplApplyResult';
export { aplSafebox, } from './aplSafebox';
export { aplApplyResource, } from './aplApplyResource';
export { aplEndAudit, } from './aplEndAudit';
export { aplApplyStatus, } from './aplApplyStatus';
export { aplApplyReferee, } from './aplApplyReferee';
export { aplShareUrl, } from './aplShareUrl';

