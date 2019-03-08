import { http, httpSysX } from './request';

const postAuto  = (src, data) => {
	return http.post(`/wpAutoReply/${src}`, data);
};

const getAuto = (src, data) => {
	return http.get(`/wpAutoReply/${src}`, data);
};
const postMass  = (src, data) => {
	return http.post(`/wpCustomSendall/${src}`, data);
};

const getMass = (src, data) => {
	return http.get(`/wpCustomSendall/${src}`, data);
};
const postmenu  = (src, data) => {
	return http.post(`/wpCustomMenu/${src}`, data);
};
const postMassId  = (src, data) => {
	return http.post(`/wpAppsFollow/${src}`, data);
};
const httpSet  = (src, data) => {
	return http.post(`/wpAppsSetting/${src}`, data);
};
const httpSetg  = (src, data) => {
	return http.get(`/wpAppsSetting/${src}`, data);
};

const getmenu = (src, data) => {
	return http.get(`/wpCustomMenu/${src}`, data);
};
const getQR = (src, data) => {
	return http.get(`/wpApps/${src}`, data);
};

const getSearch = (src, data) => {
    return http.get(`/wpTag/${src}`, data)
}
export const publicAction = {
    // GET /a/ws/market/wpAutoReply/list
    getAutoList(params) {
        return getAuto('list', {params})
    },    

    // POST /a/ws/market/wpAutoReply/delete
    deleteAutoList(params) {
        return postAuto('delete', params)
    },

    // POST /a/ws/market/wpAutoReply/save
    saveAuto(params) {
        return postAuto('save', params)
    },
    updateWelcome(params) {
        return postAuto('updateWelcome', params)
    },
    getWelcome(params) {
        return postAuto('getWelcome', params)
    },
    //GET /a/ws/market/wpAutoReply/form
    getDetail(params) {
        return getAuto('form', {params})
    },

    // POST /a/ws/market/wpCustomSendall/save 保存群发并发送
    massSend(params) {
        return postMass('save', params)
    },
    
    // GET /a/ws/market/wpCustomSendall/sendCount?appId  获取当日发送次数
    sendCount(params) {
        return getMass('sendCount', {params})
    },

    // POST /a/ws/market/wpCustomMenu/delete 删除自定义菜单
    deleteMenu(params) {
        return postmenu('delete', params)
    },
    // GET /a/ws/market/wpCustomMenu/form 编辑或自定义菜单详情
    getForm(params) {
        return getmenu('form', {params})
    }, 
    // GET /a/ws/market/wpCustomMenu/listData 自定义菜单VO列表（不分页）
    getMenuList(params) {
        return getmenu('listData', {params})
    }, 
    // POST /a/ws/market/wpCustomMenu/release 发布自定义菜单
    sendMenu(params) {
        return postmenu('release', params)
    }, 
    // POST /a/ws/market/wpCustomMenu/save
    saveMenu(params) {
        return postmenu('save', params)
    },
    // 模糊搜索的接口 
    // /a/ws/market/wpTag/list
    searchTag(params) {
        return getSearch('list', {params})
    },
    // 模糊搜索的接口 
    // POST /a/ws/market/wpAppsFollow/userList
    openId(params) {
        return postMassId('userList', params)
    },
    // 上传图片 
    //POST /a/ws/market/uploadMaterial 上传素材
    // POST /a/wx/uploadMaterial
    upfileFodder(params) {
        return httpSysX.post('uploadMaterial', params)
    }, 

    //保存关注引导页设置 POST /a/ws/market/wpAppsSetting/save
    saveSeting(params) {
        return httpSet('save', params)
    }, 
    // 发布json/a/ws/market/wpCustomMenu/menuJson
    getJson(params) {
        return getmenu('menuJson', {params})
    },
    // GET /a/ws/market/wpAppsSetting/form 引导页form
    formImg(params) {
        return httpSetg('form', {params})
    },
    // GET /a/ws/market/wpApps/qrcode 获取公众号二维码
    getQRcode(params) {
        return getQR('form', {params})
    },
    // a/ws/market/wpCustomMenu/listCostomData?appId= 预设菜单
    listCostomData(params) {
        return getmenu('listCostomData', {params})
    }
}