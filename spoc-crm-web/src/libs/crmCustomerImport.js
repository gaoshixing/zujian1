import { http} from "./request";

const k = '/crmCustomerImport'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmCustomerImport = {
    // POST /a/ws/crm/crmCustomerImport/save 保存资源导入
    save(data){
		  return post('/save',data);
    },
    // POST /a/ws/crm/crmCustomerImport/listPage 资源导入VO列表（带分页）
    listPage(data){
		  return post('/listPage',data);
    },
    // GET /a/ws/crm/crmCustomerImport/form 编辑或资源导入详情
    form(params) {
      return get('/form', {params});
    },
    // POST /a/ws/crm/crmCustomerImport/submitImport 提交资源导入
    submitImport(data){
		  return post('/submitImport',data);
    },
    getUserCompanyInfo(params) {
        return get('/getUserCompanyInfo', {params});
    },
    delete(data){
        return post('/delete',data);
    },
    getSaleList(params) {
        return get('/getSaleList', {params});
    },
    allocCustomer(data){
        return post('/allocCustomer',data);
    },
    getTotalCustomerNumber(params) {
        return post('/getTotalCustomerNumber', params);
    },
};