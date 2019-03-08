import { httpCreate, } from '@public/libs/request';
export const baseURL = "/spoc-docu/a/ws/docu";
export const http = httpCreate(baseURL);

export {errors, sys, common, other , default,} from '@public/libs/request';

export { docuManage, } from './docuManage';
export { docuLibrary, } from './docuLibrary';
export { docuLibrarySearch, } from './docuLibrarySearch';

export {docEssayTask} from './docEssayTask'
