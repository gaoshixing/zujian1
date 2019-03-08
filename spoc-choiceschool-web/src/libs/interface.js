var context="/spoc-choiceschool";
var searchBase='/spoc-search';
var docu='/spoc-docu';
var interfaceUrl={
    basicData:{
        dictListData:context+"/a/ws/sys/dict/listData",
        getMenu:context+"/a/ws/sys/menu/listGrantMenu",
        listLocation:context+"/a/ws/sys/Area/listLocation",
        findByName:context+'/a/ws/sys/Area/findByName',
        uploadFile:context+'/a/ws/sys/attachment/uploadFile',
        updatePwd:context+"/a/ws/sys/user/updatePwd",
        buildTmpPwd:context+"/a/ws/sys/user/buildTmpPwd",
    },
    xxChoiceSchool:{
        save:context+"/a/ws/choiceschool/xxChoiceSchool/save",
        changeStatus:context+"/a/ws/choiceschool/xxChoiceSchool/changeStatus",
        saveXxChat:context+"/a/ws/choiceschool/xxChoiceSchool/saveXxChat",
        choiceStatistic:context+"/a/ws/choiceschool/xxChoiceSchool/choiceStatistic",
        uploadFile:context+'/a/ws/choiceschool/xxChoiceSchool/uploadFile',
        saveResult:context+'/a/ws/choiceschool/xxChoiceSchool/saveResult',
        deleteAttachment:context+'/a/ws/choiceschool/xxChoiceSchool/deleteAttachment',
        deleteResult:context+'/a/ws/choiceschool/xxChoiceSchool/deleteResult',
        choiceSchoolInit:docu+'/a/ws/docu/docEssay/choiceSchoolInit',
    },
    xxLogin:{
        login:context+"/a/ws/sys/login",
        userInfoData:context+"/a/ws/sys/user/userInfoData",
        logout:context+"/a/ws/sys/logout"
    },
    xxGroup:{
        save:context+"/a/ws/choiceschool/xxGroup/save",
        deleteXxGroup:context+"/a/ws/choiceschool/xxGroup/delete",
        deleteXxGroupUser:context+"/a/ws/choiceschool/xxGroupUser/delete",
        treeUserData:context+"/a/ws/choiceschool/xxGroupUser/treeUserData",
        batchsaveXxGroupUser:context+"/a/ws/choiceschool/xxGroupUser/batchsave",
        officeList:context+"/a/ws/sys/office/list",
        treeAddUserData:context+"/a/ws/choiceschool/xxGroupUser/treeAddUserData",
        treeAddUserOffice:context+"/a/ws/choiceschool/xxGroupUser/treeAddUserOffice",
        setLeaderFlag:context+"/a/ws/choiceschool/xxGroupUser/setLeaderFlag",
        setCheckFlag:context+"/a/ws/choiceschool/xxGroupUser/setCheckFlag",
        updateSort:context+"/a/ws/choiceschool/xxGroup/updateSort"
    },
    xxMajor:{
        list:context+"/a/ws/choiceschool/xxMajor/list"
    },
    xxSchool:{
        list:context+"/a/ws/choiceschool/xxSchool/list",
        form:context+"/a/ws/choiceschool/xxSchool/form",
        save:context+"/a/ws/choiceschool/xxSchool/save",
        batchdelete:context+"/a/ws/choiceschool/xxSchool/batchdelete",
        search:searchBase+'/a/ws/search/ssSchool/listThink', // 联想输入学校
    },
    xxStudent:{
        list: context + "/a/ws/choiceschool/xxStudent/list",
        listAudit: context + "/a/ws/choiceschool/xxStudent/listAudit",
        listStatistic: context + "/a/ws/choiceschool/xxStudent/listStatistic",
        deleteAttachment:context+"/a/ws/choiceschool/xxStudent/deleteAttachment",
        uploadFile:context+"/a/ws/choiceschool/xxStudent/uploadFile",
        listAllTeachers:context+"/a/ws/choiceschool/xxStudent/listAllTeachers",
        listTeachers:context+"/a/ws/choiceschool/xxStudent/listTeachers",
        assign:context+"/a/ws/choiceschool/xxStudent/assign",
        reassign: context + "/a/ws/choiceschool/xxStudent/reAssign",
        form: context + "/a/ws/choiceschool/xxStudent/form",
        formChoiceSchool: context + "/a/ws/choiceschool/xxStudent/formChoiceSchool",
        save:context+"/a/ws/choiceschool/xxStudent/save",
        saveXxInnerinfo:context+"/a/ws/choiceschool/xxStudent/saveXxInnerinfo",
        saveXxStudyinfoList:context+"/a/ws/choiceschool/xxStudent/saveXxStudyinfoList",
        saveXxEaxminfoList:context+"/a/ws/choiceschool/xxStudent/saveXxEaxminfoList",
        saveXxSkillinfoList:context+"/a/ws/choiceschool/xxStudent/saveXxSkillinfoList",
        saveXxApplyobject:context+"/a/ws/choiceschool/xxStudent/saveXxApplyobject",
        assignTeachers:context+"/a/ws/choiceschool/xxStudent/assignTeachers",
        reAssignTeachers:context+"/a/ws/choiceschool/xxStudent/reAssignTeachers",
        groupUserInfoData:context+"/a/ws/choiceschool/xxGroupUser/groupUserInfoData",
        contactList:context+"/a/ws/choiceschool/xxStudent/contactList"
    },
    schoolMajor:{
        listSGMajor:searchBase+'/a/ws/search/ssSchoolMajor/listSGMajor' // 列出专业
    },
    gradeSchool:{
        search:searchBase+'/a/ws/search/ssGradeschool/listThink'  // 列出学院
    },
    
};
export default interfaceUrl;

export const uploadUrl = context+'/a/ws/choiceschool/xxSchool/uploadImg';