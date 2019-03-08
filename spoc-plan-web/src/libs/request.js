import { httpCreate, } from '@public/libs/request';

export {errors, sys, common, other , default,plServiceStatus } from '@public/libs/request';

export const baseURL = "/spoc-plan/a/ws/plan";
export const SchoolBaseURL = "/spoc-choiceschool/a/ws/choiceschool";
export const http = httpCreate(baseURL);
export const httpSchool = httpCreate(SchoolBaseURL);

export {plServiceMember} from './plServiceMember'
export {plServiceGroup} from './plServiceGroup'
export {plFile} from './plFile'
export {plServiceGantt} from './plServiceGantt'
export {plTask} from './plTask'
export {RILI} from './rili'
export {plBill} from './plBill'
export {plNotepad} from './plNotepad'
export {plRateUser, plRateLevel} from './plRate'
export {plReport} from './plReport'
export {plHandover} from './plHandover'
export {STATISTICS} from './statistics'
export {plSchool} from './school'
export {xxStudent} from './xxStudent'
