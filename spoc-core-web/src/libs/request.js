import axios from "axios";
import qs from "qs";
import { httpCreate,sys} from '@public/libs/request';
export {sys} from '@public/libs/request';
const baseURL = "/spoc-choiceschool/a/ws/sys";
const baseURLCRM = "/spoc-crm/a/ws/crm";
const loginRouter ='portal.login';

const http = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true,
    transformRequest: [function (data, headers) {
        return qs.stringify(data);
    }]
});


export const httpJSON = httpCreate(baseURL);
const httpCRM = httpCreate(baseURLCRM);

export default function() {
    return (res)=>{
        if(res.data){
            if(res.data.status=='login'){
                if(this.$route.name != loginRouter){
                    this.$router.push({name:loginRouter});
                }
            } else if (res.data.status=='error' || res.data.status == 'authority'){
                this.$Message.error(res.data.message);
            } else if(res.data.status=='location'){
                location.href = res.data.location;
            } else if(res.data.status=='success'){
                res.ok = true;
            } else{
                console.error("unknow status");
            }
        }
        return res;
    }
}

export const errors =function() {
    return (err)=>{
        if(err){
            this.$Message.error(err.toString());
        }
    }
}

export const getCurrUserInfo = () => {
    return http.get('/user/userInfoData')
}

export const delFac = (id) => {
    return http.post('/office/delete', {id})
}

export const removeUser = (userList) => {
    return http.post('/user/delete', {userList})
};

// getUserList 各种条件查询用户，pageNo,offcie.id,level,role.id,loginName,

export const getUserList = (params) => {
    return http.get('/user/listData', {params});
};

export const listJobTree = () => {
    return http.get('/dict/listJobTree');
};


export const addUser = () => {
    return http.get('/user/form')
};

export const saveUser = (para) => {
    return http.post('/user/save', para);
};

export const getFacInfo = (id) => {
    return http.get('/office/form', {params: {id}})
}

export const getOfficeList = () => {
    return http.get('/office/list')
}

export const getOfficeNameList = () => {
    return http.get('/office/listData')
}

export const saveOffice = (data) => {
    return http.post('/office/saveOffice', data);
}

export const getRoleTree = (id) => {
    return http.get('/role/tree', {params: {id}});
}

export const getRoleInfo = (id) => {
    return http.get('/role/get', {params: {id}});
}

export const getRoleMenu = () => {
    return http.get('/menu/menuIndex')
}

export const getMenuTree = (menuId, roleId) => {
    return http.get('/menu/list', {params: {menuId, roleId}});
}

export const applyRights = (id, menuId, menuList) => {
    return http.post('/role/grantRoleToMenu', {id, menuId, menuList});
}

export const delRole = (id) => {
    return http.post('/role/delete', {id});
}

export const getRole = () => {
    return http.get('/role');
}

export const saveRole = (info) => {
    return http.post('/role/save', info);
}

export const dictData = (type) => {
    return http.get('/dict/listData', {params: {type}});
}

export const dictDataSave = (data) => {
    return httpJSON.post('/dict/save', data);
}

export const dictDataDel = (id) => {
    return http.post('/dict/delete', {id})
}

export const loadJobTree = () => {
    return http.get('/dict/buildTree');
}

export const dictDataId = (id) => {
    return http.get('/dict/getById', {params: {id}});
}

export const listGrantMenu = (param) => {
    return http.get('/menu/listGrantMenu',{params:param});
}

export const saveResItem = (info) => {
    return http.post('/menu/saveMenu', info);
}

export const delRes = (id) => {
    return http.post('/menu/delete', {id});
}

export const getResItemInfo = (id) => {
    return http.get('/menu/getById', {params: {id}});
}

export const uploadUrl = () => {
    return `${baseURL}/user/uploadImg`;
};


export const getLevelData = () => {
    return http.get('/dict/listData?type=sys_user_competence_level');
};

export const getOfficeTree = () => {
    return http.get('/office/buildTree');
};

export const resourceList = (id) => {
    return http.get('/resource/listData', {params: {id}});
};

export const resourceDelete = (id) => {
    return http.post('/menu/delete', {id});
};

export const resourceSave = (para) => {
    return http.post('/menu/saveResource', para);
};
//批量改变用户角色
export const updateUserRole = (param) => {
    return http.post('/user/updateRole', param);
};
//批量改变用户 职能等级 批量改变用户
export const updateUserRel = (params) => {
    return http.post('/user/update', params);
};


//添加资源

export const addMenu = (menu) => {
    return http.post('/menu/saveMenu', menu);
};

//删除资源 

export const deleteMenu = (id) => {
    return http.post('/menu/delete', {id});
};

//排序
export const sortMenu = (menuList) => {
    return http.post('/menu/sortMenu', {menuList});
};

//下级菜单
export const getSubMenu = (param) => {
    return http.get('/menu/listData' , {params:param});
};

//通过id获取资源详情 

export const getMenuById = (id) => {
    return http.get('/menu/getById', {params: {id}});
};

export const listMenuRole = (menuId) => {
    return http.get('/role/listMenuRole',{params:{menuId}});
}

export const listUnAssignUserMap = (params) => {
    return http.get('/user/listUnAssignUserMap',{params});
}


export const listAssigndUserMap = (params) => {
    return http.get('/user/listAssigndUserMap',{params});
}

export const buildSearchTree = () => {
    return http.get('/office/buildSearchTree');
}

// isQuick=0/1
export const saveQuickMenu = (id,isQuick) => {
    return http.post('/menu/saveQuickMenu',{id,isQuick});
}

export const listQuickMenu = () => {
    return http.get('/menu/listQuickMenu');
}

export const menuRights = () => {
    return http.get('/menu/findMenu');
}

// 绑定外部系统账号
export const bindAccount = (params) => {
    return httpCRM.post('/crmAccountMap/bindAccount', params);
}

// 获取外部系统账号
export const getExternalSystemAccount = (params) => {
    return httpCRM.get('/crmAccountMap/getExternalSystemAccount', {params});
}

// 解除绑定外部系统账号
export const unBindAccount = (params) => {
    return httpCRM.post('/crmAccountMap/unBindAccount', params);
}
