import {  httpSearch as http, httpChooseSchool } from '@public/libs/request';

export const docuLibrarySearch = {
    schoolSearch(params) {
        return  http.get('ssSchool/listThink', {
            params
        })
    },

    // 学院 ssSchoolMajor/listSGMajor?gradeschoolId=79dad98f0a2a11e8844f88787339da13
    collegeSearch(params) {
        return  http.get('ssGradeschool/listThink', {
            params
        })
    },
    
    // 专业(研究生)poc-search/a/ws/search/ssSchoolMajor/listSGMajor?gradeschoolId
    proList(params) {
        return  http.get('ssSchoolMajor/listSGMajor', {
            params
        })
    },

    searchStudent(params) {
        return httpChooseSchool.get('/xxStudent/findByName', {
            params: params
        })
    }
};
