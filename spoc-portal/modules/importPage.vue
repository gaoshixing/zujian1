<style lang="less">
@border:#e9eaec;
.library-data-import-page{
    margin: 40px 0;
    ul,li{
        list-style: none;
    }
    .f-table{
        width: 100%;
        border-left: 1px solid @border;
        border-top: 1px solid @border;
        .tflex{
            display: flex;
            & > .th, & > .td {
                flex: auto;
            }
        }
        .thead{
            background-color: #f7f7f7;
            overflow: hidden;
            font-size: 14px;
            color: #323232;
            border-bottom: 1px solid @border;
        }
        .tbody{
            background-color: #fff;
            .tr{
                overflow: hidden;
                border-bottom: 1px solid @border;
            }
        }
        .th{
            border-right: 1px solid @border;
            height: 40px;
            float: left;
            box-sizing: border-box;
            text-align: center;
            line-height: 40px;
        }
        .td{
            border-right: 1px solid @border;
            float: left;
            box-sizing: border-box;
            text-align: center;
            vertical-align: middle;
            height: 80px;
            line-height: 80px;
            padding: 0 10px;
            .tip-text{
                width: 72%;
                margin: 0 auto;
                line-height: 2;
                margin-top: 20px;
            }
            .f-filename{
                margin: 22px auto;
                line-height: 1.1;
                overflow: hidden;
                .ivu-upload{
                    display: inline;
                }
                .nn{
                    white-space: nowrap;
                    max-width: 200px;
                    overflow: hidden;
                }
            }
        }
        .t1{
            width: 18%;
        }
        .t2{
            width: 26%;
        }
        .t3{
            width: 20%;
        }
        .t4{
            width: 18%;
        }
        .t5{
            width: 18%;
        }
        .st1{
            width: 10%;
        }
        .st2{
            width: 10%;
        }
        .st3{
            width: 30%;
        }
        .st4{
            width: 50%;
        }
        
        &.res-err-list{
            margin: 30px 0;
            .tbody{
                .td{
                    min-height: 40px;
                    max-height: 80px;
                    line-height: 40px;
                }
            }
        }
    }
    .tip-list{
        margin: 20px 0;
        font-size: 14px;
        .ul{
            li{
                margin: 10px 0;
                .inv{
                    visibility: hidden;
                }
            }
        }
    }
}

</style>

<template>
    <div class="library-data-import-page">
        <div class="f-table">
            <div class="thead tflex">
                <div class="th t1">导入模板</div>
                <div class="th t2">上传文件（Excel文件,格式：.xlsx/.xls）</div>
                <div class="th t3" v-if="isCover">是否覆盖</div>
                <div class="th t4">校验数据并提交</div>
                <div class="th t5">报告</div>
            </div>
            <div class="tbody">
                <div class="tr tflex">
                    <div class="td t1">
                        <Button type="success" @click.native.stop="downloadTemplate">下载模板</Button>
                    </div>
                    <div class="td t2">
                        <div class="f-filename">
                            <Upload action="" :show-upload-list="false" ref="upload" :before-upload="handleUpload">
                                <Button type="success">选择文件</Button>
                            </Upload>
                            <span class="nn" v-text="file.name"></span>
                        </div>
                    </div>
                    <div class="td t3" v-if="isCover">
                        <div class="tip-text">

                            <Checkbox v-if="from == 'CRM'" v-model="isOverWrite">覆盖同一手机号的数据</Checkbox>
                            <Checkbox v-else v-model="isOverWrite">{{tips}}</Checkbox>
                        </div>
                    </div>
                    <div class="td t4">
                        <Button type="success" @click.native.stop="doupload">提交</Button>
                    </div>
                    <div class="td t5">
                        <Button type="success" @click.native.stop="downReport" :disabled="retData.failureNum<1">下载报告</Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="tip-list">
            <ul class="ul">
                <li>• 导入说明：请下载导入模板，并按模板格式整理、提交数据。</li>
                <li v-if="retData.allReportList.length">• 导入结果：Excel总条数 {{retData.totalNum}}，更新条数 {{retData.overwrite}}，错误条数 {{retData.failureNum}}。</li>
                <li>• 导入错误详情（表格中只显示前1000条错误信息，需点击“下载报告”按钮，下载完整导入报告。
                          <br><span class="inv">• </span>注：“错误详情”与“错误报告”将在该页面再次打开时清空，请及时查看下载）</li>
            </ul>
        </div>
        <div class="f-table res-err-list">
            <div class="thead">
                <div class="th st1">序号</div>
                <div class="th st2">错误行号</div>
                <div class="th st3">错误说明</div>
                <div class="th st4">异常数据</div>
            </div>
            <div class="tbody" v-if="$route.query.froms !== 'SALARY'">
                <div class="tr" v-for="(item,index) in retData.allReportList" :key="index">
                    <div class="td st1" v-text="index+1">
                    </div>
                    <div class="td st2" v-text="item.lineNO">
                    </div>
                    <div class="td st3" v-if="item.errorInfo.indexOf(':')<0" v-text="item.errorInfo">
                    </div>
                    <div class="td st3" v-if="item.errorInfo.indexOf(':')>=0">
                        {{item.errorInfo.split(':')[0]}}:<a @click="toViewDetial(item.itemId)">{{item.errorInfo.split(':')[1]}}</a>
                    </div>
                    <div class="td st4" :title="item.errorTitle" v-text="item.errorTitle">
                    </div>
                </div>
            </div>
            <div class="tbody" v-if="$route.query.froms === 'SALARY'">
                <div class="tr" v-for="(item,index) in retData.allReportList" :key="index">
                    <div class="td st1" v-text="index+1">
                    </div>
                    <div class="td st2" v-text="item.errorIndex">
                    </div>
                    <div class="td st3" v-text="item.errorStr">
                    </div>
                    <div class="td st4" :title="item.errorTitle" v-text="item.errorTitle">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import valid, { errors, common, sys, 
    importSalaryAttendanceExcel, 
    importSalarySocialExcel, 
    importSalaryManageExcel, 
    importSalaryPersonnelExcel, 
    importWorkHistory, 
    importEducation, 
    importBonusPenalty,
    importUserBasicInfo,
} from '../libs/request.js';
import {mapMutations,mapGetters} from 'vuex';

// 导出下载模板：
// 1.学校：school 2.标准专业库：major 3.本科专业：school_major 4.研究生专业：grade_major  5.研究生院：grade_school
const typeImport = {
    school:{ import:sys.ssSchoolImport, n:'学校' },
    major:{ import:sys.ssMajorImportFile, n:'标准专业库' },
    school_major:{ import:sys.ssSchoolMajorImportFile,n:'本科专业' },
    grade_major:{ import:sys.ssSchoolMajorImportGrade, n:'研究生专业' },
    grade_school:{ import:sys.academeManageImport, n:'研究生院' },
};

export default {
    data(){
        return {
            from: this.$route.query.froms,
            isOverWrite:false,
            file:{},
            retData:{
                allReportList:[],
                failureNum:0,
            },
            format:['xls','xlsx'],
            maxSize:1024*100*1024,
            reportUrl:sys.ssSchoolDownReport,
            uploadDate: {
                sourceId: '',
                sourceType: '',
                importSourTag: '',
                ifSubmited: '',
            }
        };
    },
    computed:{
        tips(){
            return '覆盖同一'+this.curr.n+'名称（英文）的数据';
        },
        curr(){
            let t = this.$route.query.t;
            return typeImport[t]||typeImport['school'];
        },
        isCover() {
            if(this.$route.query.froms === 'SALARY') return false;
            else return true;
        },
        path() {
            return this.$route.query.path
        }
    },
    mounted() {
        if(this.$route.query.froms === 'CRM') this.crmFormData();
    },

    methods:{
        ...mapMutations(['updateLoadingStatus']),
        toViewDetial(id){
            const {href} = this.$router.resolve({
                name: 'crm.detail',
                query: {
                    id: id,
                    from:'usermanage'
                }
            })
            window.open(href, '_blank')
        },
        crmFormData() {
            let data = {
                id: this.$route.query.cId
            }
            sys.crmFormData(data).then(valid.call(this))
            .then(res => { 
                if (res.ok) {
                    this.uploadDate = res.data.data
            } })
            .catch(errors.call(this)).finally(()=>{
            })
        },

        handleUpload (file) {
            const ext = file.name.split('.').pop();
            if(this.format.indexOf(ext)<0){
                this.$Message.error("需使用xls,xlsx格式");
                return false;
            } else if (file.size>this.maxSize){
                this.$Message.error("文件大小不能超过100MB");
                return false;
            }
            this.file = file;
            return false;
        },
     
        doupload(){
            if(this.file.name){
                var data = new FormData();
                data.append('file',this.file);
                if(this.$route.query.froms === 'CRM') {
                    data.append('isOverWrite',this.isOverWrite);
                    data.append('sourceId',this.uploadDate.sourceId); // 
                    data.append('sourceType',this.uploadDate.sourceType); // 
                    data.append('importSourTag',this.uploadDate.importSourTag); // 
                    data.append('importId', this.$route.query.cId); // 
                    data.append('ifSubmited', this.uploadDate.status == '0' ? false : true); // 
                }
                this.updateLoadingStatus({isLoading:true});
                if (this.$route.query.froms === 'CRM') {
                    sys.crmUploadTemplate(data).then(valid.call(this)).then(this.onEnd).catch(errors.call(this)).finally(()=>{
                        this.updateLoadingStatus({isLoading:false});
                    })
                } else if (this.$route.query.froms === 'SALARY') {
                    // 工资薪酬
                    // data.append('isOverWrite', this.isOverWrite);

                    data.append('isOverWrite', '1');
                    data.append('isImport', '1');

                    let obj = importSalaryAttendanceExcel;

                    if (this.path === 'attendanceManage') obj = importSalaryAttendanceExcel; 
                    else if (this.path === 'socialSecurity') obj = importSalarySocialExcel;
                    else if (this.path === 'salaryManage') obj = importSalaryManageExcel;
                    else if (this.path === 'personnel') obj = importSalaryPersonnelExcel;// 导入员工
                    else if (this.path === 'importWork') obj = importWorkHistory;// 导入工作经历
                    else if (this.path === 'importEducational') obj = importEducation;// 导入教育经历
                    else if (this.path === 'importBonusPenalty') obj = importBonusPenalty;// 导入奖励/升迁
                    else if (this.path === 'importUserBasicInfo') obj = importUserBasicInfo;// 导入基础信息

                    obj(data).then(res => { 
                        if (res.data.status=='success') { 
                            this.$Message.success(res.data.message);
                            this.retData.allReportList = res.data.data ? res.data.data.resultList : [];
                            let params = {
                                ok: true
                            }
                            this.onEnd(params, res.data.data.result);
                        } else {
                            this.$Message.error('导入错误');
                            let data = res.data.data;
                            // console.log(data);
                            // {msg: "非空字段不能为空", no: 4, name: "111"}
                            if(data && data.errorList.length > 0) {
                                let arr = [];
                                data.errorList.forEach(item => {
                                    arr.push({
                                        errorIndex: item.no,
                                        errorStr: item.msg,
                                        errorTitle: item.name,
                                    })
                                });
                                this.retData.allReportList = arr;
                            }
                            // this.retData.allReportList = data ? data.errorList : [];
                            this.retData.totalNum = data.totalNum;
                            this.retData.overwrite = data.overwrite;
                            this.retData.failureNum = data.failureNum;
                            
                        }
                    }).finally(() => this.updateLoadingStatus({isLoading:false}));
                } else {
                    this.curr.import(data).then(valid.call(this)).then(this.onEnd).catch(errors.call(this)).finally(()=>{
                        this.updateLoadingStatus({isLoading:false});
                    });
                }
            } else {
                this.$Message.error("请先选择文件");
            }
        },
        onEnd(res, content){
            if(res.ok){
                let contentTxt = '';
                let data = {};
                if(content) {
                    contentTxt = content;
                    data = {
                        failureNum: 0
                    }
                }else{
                    data = res.data.data;
                    contentTxt = `总条数：${data.totalNum}，更新条数： ${data.overwrite}，错误条数： ${data.failureNum}`
                }
                this.$Modal.info({
                    title: '导入结果',
                    content: contentTxt,
                    onOk: () => {
                        if(!data.failureNum) {
                            if(this.$route.query.froms === 'CRM') {
                                this.$router.push({
                                    name: 'crm.resourceEdit',
                                    query: {
                                        formId: this.$route.query.cId,
                                    }
                                })
                            } else if(this.$route.query.froms === 'SALARY') {
                                if(this.path == 'attendanceManage') {
                                    this.$router.push({
                                        name: 'salary.attendanceManage',
                                    })
                                } else if(this.path == 'socialSecurity') {
                                    this.$router.push({
                                        name: 'salary.socialSecurity',
                                    })
                                } else if(this.path == 'salaryManage') {
                                    this.$router.push({
                                        name: 'salary.salaryManage',
                                    })
                                } else if(this.path == 'personnel' 
                                    || this.path == 'importWork' 
                                    || this.path == 'importEducational' 
                                    || this.path == 'importBonusPenalty' 
                                    || this.path == 'importUserBasicInfo') {
                                    this.$router.push({
                                        name: 'salary.personnel',
                                    })
                                }
                            } 
                            
                        }
                    }
                });
                console.log(data);
                this.retData = data;
            }
        },
        downloadTemplate(){
            // 下载模板
            if (this.$route.query.froms === 'CRM') {
                let obj = {}
                // console.log(sys.crmDownLoadTemplate(obj))
                window.open(sys.crmDownLoadTemplate(obj));
            } else if (this.$route.query.froms === 'SALARY') {
                console.log(this.path)
                if(this.path == 'attendanceManage') window.open(sys.salaryDownLoadTemplate());
                if(this.path == 'socialSecurity') window.open(sys.salaryDownLoadStaffTemplate());
                if(this.path == 'salaryManage') window.open(sys.salaryDownLoadManageTemplate());
                if(this.path == 'personnel') window.open(sys.salaryDownLoadTemplatesSalUserBasicInfo());
                if(this.path == 'importWork') window.open(sys.salWorkHistoryTemplate());
                if(this.path == 'importEducational') window.open(sys.salEducationTemplate());
                if(this.path == 'importBonusPenalty') window.open(sys.salBonusPenaltyTemplate());
                if(this.path == 'importUserBasicInfo') window.open(sys.salUserBasicInfoTemplate());
            } else {
                window.open(sys.ssSchoolDownloadTemplate(this.$route.query.t));
            }
        },
        downReport(){
            if (this.$route.query.froms === 'CRM') {
                window.open(sys.downLoadError());
                return
            }else if (this.$route.query.froms === 'SALARY') {
                if(this.path == 'personnel') {
                    window.open(sys.downLoadImportUserErrorLog());
                    return
                }
            }
            window.open(this.reportUrl());
        }

    }
}
</script>

