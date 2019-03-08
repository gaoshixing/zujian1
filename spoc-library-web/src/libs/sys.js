import { commonHttp as http, baseURL, commonURL} from "./request.js";

export const common = {
    listData(obj) {
        return http.get('/dict/listData',{params:obj})   
    },
    batchListData(obj) {
        return http.get('/dict/batchListData',{params:obj})    
    },
    uploadImg(){
        return `${commonURL}/user/uploadImg`    
    },
    areaRest(obj) {
        return http.get('/Area/listLocation',{params:obj})    
    }
}

/*学院基本信息*/
export const sysAcademeBasicInfo = {
  // fetch 学院类型
  fetchGradeSchoolType(type){
    return http.get('/dict/listData',{params:{type}})
  },
  //上传图片
  uploadUrl(){
      return `${commonURL}/user/uploadImg`;
    },
  //fetch招生学位
  fetchDegree(type){
      return http.get('/dict/listData',{params:{type}})
  }
}

/* 添加编辑学院专业*/ 
export const sysAcademeMajor = {
    //fetch字典表data
    fetchDictData(params){
        return http.get('/dict/listData',{params:params})
    },
     //fetch考试类型data
     fetchTestType(params){
        return http.get('/dict/batchListData',{params:params})
    },
}
export const TMSEARCH = {
    //   字段关联字典表
    associateDit(types){
        return http.get('/dict/batchListData',{params:{types}})
    },
}