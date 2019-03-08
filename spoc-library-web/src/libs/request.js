import axios from "axios";

export { major } from "./major.js";
export { school } from "./schoolManage.js";
export { SchoolMajor } from "./ssSchoolMajor.js";
export { ssApplyRequire } from "./ssApplyRequire.js";
export { usnews } from "./usnews.js";
export { tmBaseSearch } from "./tmSearch.js";
export { sysAcademeMajor,sysAcademeBasicInfo,TMSEARCH,common } from './sys.js';
export { TEMPLATE, } from './CrmSetLocation.js';

export const baseURL = "/spoc-search/a/ws/search";
export const commonURL = '/spoc-choiceschool/a/ws/sys';
const loginRouter = 'portal.login';


export const http = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true,
});

export const commonHttp = axios.create({
    baseURL:commonURL,
    timeout: 20000,
    withCredentials: true,
});

const post = (u, data) => {
    return http.post(`/ssGradeschool${u}`, data);
};

const get = (u, data) => {
    return http.get(`/ssGradeschool${u}`, data);
};

export default function () {
    return (res) => {
        if (res.data) {
            if (res.data.status == 'login') {
                if (this.$route.name != loginRouter) {
                    this.$router.push({ name: loginRouter });
                }
            } else if (res.data.status == 'error' || res.data.status == 'authority') {
                this.$Message.error(res.data.message);
            } else if (res.data.status == 'location') {
                location.href = res.data.location;
            } else if (res.data.status == 'success') {
                res.ok = true;
            } else {
                console.error("unknow status");
            }
        }
        return res;
    }
}

export const errors = function () {
    return (err) => {
        if (err) {
            this.$Message.error(err.toString());
        }
    }
}


/* 学院管理模块 */

export const academeManage = {
    // 获取学院列表
    fetchGradeschoolList(params) {
        return get('/list', { params })
    },
    //删除学院
    delete(ids) {
        return get('/batchDelete', {
           params:{ids: ids.join(',')} 
        })
    },
    //导出学院
    export(params) {
        return get('/export',{params})
    },
    //导入学院

    import(data) {
        return post('/importFile', data);
    },
    downReport() {
        // return `${baseURL}${k}/downReport`;
    },
    // downloadTemplate(){
    //   // return `${baseURL}${k}/downloadTemplate`;
    // },
    // 学院搜索（按名称联想)
    academySearch(cnName) {
        return get('/listThink', {
            params: { cnName }
        })
    },
    exportFile(data) {
        return post('/exportFile', data);
    },
	//下载列表所选EXCEL
	exportSelected(params){
		return `${baseURL}/ssGradeschool/exportSelected`;
	},
	//下载列表EXCEL
	exportEXCEL(params){
		return `${baseURL}/ssGradeschool/export?searchType=${params.searchType}&keyword=${params.keyword}`;
	},
}

// 添加和编辑学院-基本信息
export const fillAcademeBasicInfo = {
    //添加学院
    fillAcademeBasicInfo(data) {
        return post('/save', data)
    },

    // 查看学院基本信息（按Id）
    fetchBasicInfo(id) {
        return get('/form', { params: { id } })
    },

}

// 添加和编辑保存学院专业项目
export const fillAcademeMajor = {

    // 查看学院详情
    fetchAcademeDetail(id) {
        return get('/details', { params: { id } })
    }
}

export const listGrantMenu = (params) => {
    return axios.get('/spoc-choiceschool/a/ws/sys/menu/listGrantMenu',{params});
}

