import {http} from "./request.js";
const post = (u,data)=>{
  return http.post(`/repository${u}`,data);
};

const get = (u,data)=>{
  return http.get(`/repository${u}`,data);
};



/* 藤门搜索模块 */

export const tmBaseSearch = {
  /*基本搜索*/
  // 本科学校搜索（按名称联想）
  schoolSearch(keyword) {
      return get('/school/associate', { params: { keyword } })
  },
  // 研究生院搜索（按名称联想）
  gradeSchoolSearch(keyword){
    return get('/gradeSchool/associate',{params:{keyword}})
  },
  // 本科专业搜索（按专业名称联想）
  schoolMajorSearch(keyword){
    return get('/schoolMajor/associate',{params:{keyword}})
  },
  // 研究生专业搜索（按专业名称联想）
  gradeMajorSearch(keyword){
    return get('/gradeSchoolMajor/associate',{params:{keyword}})
  },
  //  本科学校列表（按名称）-带分页和排序
  fetchSchoolList(params) {
      return get('/school/text', {params})
  },
  // 本科专业列表（按名称）-带分页和排序
  fetchScholMajorList(params) {
      return get('/schoolMajor/text', {params})
  },
  // 研究生院（按名称）-带分页和排序
  fetchGradeList(params) {
      return get('/gradeSchool/text', {params})
  },
  //研究生专业（按名称）-带分页和排序
  fetchGradeMajor(params) {
      return get('/gradeSchoolMajor/text', {params})
  },
  //热词接口
  fetchHotwords() {
      return get('/hotwords')
  },

  /*高级搜索*/

    //  本科学校列表（高级搜索）-带分页和排序
    querySchoolList(params){
        return get('/school/query',{params})
    },
    // 研究生院列表（高级搜索）-带分页和排序
    queryGradeList(params){
        return get('/gradeSchool/query',{params})
    },
    // 本科专业列表（高级搜索）-带分页和排序
    querySchoolMajorList(params){
        return get('/schoolMajor/query',{params})
    },
    // 研究生院专业列表（高级搜索）-带分页和排序
    queryGradeMajorList(params){
        return get('/gradeSchoolMajor/query',{params})
    },
}
