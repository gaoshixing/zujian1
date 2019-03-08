import {http,baseURL} from "./request.js";

const post = (u,data)=>{
    return http.post(`/ssSchoolMajor${u}`,data);
};

const get = (u,data)=>{
    return http.get(`/ssSchoolMajor${u}`,data);
};

/* 学校管理模块 */
export const SchoolMajor = {
	//添加和编辑学校-学术信息
	saveSchool(obj){
		return post('/saveSchool',obj)
	},
	listSchool(params){
		return get('/list',{params})
	},
	batchdeletedeleteSchool(params){
		return get('/batchdeleteSchool',{params})
	},
	importFile(data){
		return post('/importFile',data);
  },
  //删除学院专业
  deleteSsGradeschool(ids){
    return get('/batchdeleteSsGradeschool',{params:{ids:ids.join(',')}})
  },
  //学院/学校专业列表（支持分页和搜索）
  fetchAcademeMajor(params){
    return get('/list',{params})
  },
    //查看学院专业详情
  fetchMajorDetail(id){
    return get('/findByGradeschoolId',{params:{id}})
  },
  // 查看学校专业详情
  findBySchollId(id){
    return get('/findBySchollId',{params:{id}})
  },
  //编辑和添加学院专业
  editAcademeMajor(data){
    return post('/saveGradeSchool',data)
  },
	importGrade(data){
		return post('/importGrade',data);
	},
    //专业搜索（按名称联想）
  listThink(params){
    return get('/listThink',{params})
  },
  // 复制学院学校专业
  schoolMajorCopy(id){
      return get('/schoolMajorCopy',{params:{id}})
  },
  // 专业分支搜索（按名称联想）
  majorBranch(params){
    return get('/listBranchName',{params})
  },
  //导出学校专业
  exportSchooMajor(params){
    return `${baseURL}/ssSchoolMajor/exportSchooMajor?searchType=${params.searchType}&keyword=${params.keyword}`;
  },
  // 导出全部研究生专业
  exportGradeSchooMajor(params){
    return `${baseURL}/ssSchoolMajor/exportGradeSchooMajor?searchType=${params.searchType}&keyword=${params.keyword}`;
  }
}