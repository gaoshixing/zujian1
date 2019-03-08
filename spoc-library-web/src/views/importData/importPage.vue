<style lang="less">
@border:#e9eaec;
.library-data-import-page{
    margin: 40px 0;
    .f-table{
        width: 100%;
        border-left: 1px solid @border;
        border-top: 1px solid @border;
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
            width: 15%;
        }
        .st2{
            width: 20%;
        }
        .st3{
            width: 40%;
        }
        .st4{
            width: 25%;
        }
        
        &.res-err-list{
            margin: 30px 0;
            .tbody{
                .td{
                    height: 40px;
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
            <div class="thead">
                <div class="th t1">导入模板</div>
                <div class="th t2">上传文件（Excel文件,格式：.xlsx/.xls）</div>
                <div class="th t3">是否覆盖</div>
                <div class="th t4">校验数据并提交</div>
                <div class="th t5">报告</div>
            </div>
            <div class="tbody">
                <div class="tr">
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
                    <div class="td t3">
                        <div class="tip-text">
                            <Checkbox v-model="isOverWrite">{{tips}}</Checkbox>
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
                <li>• 导入说明：请下载导入模板，并按模板格式整理数据，选择是否覆盖并提交。</li>
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
            <div class="tbody">
                <div class="tr" v-for="(item,index) in retData.allReportList" :key="index">
                    <div class="td st1" v-text="index+1">
                    </div>
                    <div class="td st2" v-text="item.lineNO">
                    </div>
                    <div class="td st3" v-text="item.errorInfo">
                    </div>
                    <div class="td st4" v-text="item.errorTitle">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import valid,{ errors, major,school,academeManage,SchoolMajor,TEMPLATE } from '../../libs/request.js';
import {mapMutations,mapGetters} from 'vuex';

// 导出下载模板：
// 1.学校：school 2.标准专业库：major 3.本科专业：school_major 4.研究生专业：grade_major  5.研究生院：grade_school
const typeImport = {
    school:{ import:school.import, n:'学校' },
    major:{ import:major.importFile, n:'标准专业库' },
    school_major:{ import:SchoolMajor.importFile,n:'本科专业' },
    grade_major:{ import:SchoolMajor.importGrade, n:'研究生专业' },
    grade_school:{ import:academeManage.import, n:'研究生院' },
};

export default {
    data(){
        return {
            isOverWrite:false,
            file:{},
            retData:{
                allReportList:[],
                failureNum:0,
            },
            format:['xls','xlsx'],
            maxSize:1024*100*1024,
            reportUrl:school.downReport,
        };
    },
    computed:{
        tips(){
            return '覆盖同一'+this.curr.n+'名称（英文）的数据';
        },
        curr(){
            let t = this.$route.query.t;
            return typeImport[t]||typeImport['school'];
        }
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
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
                data.append('isOverWrite',this.isOverWrite);
                this.updateLoadingStatus({isLoading:true});
                if (this.$route.query.froms === 'CRM') {
                    TEMPLATE.uploadTemplate(data).then(valid.call(this)).then(res => { if (res) {
                        this.$Message.info(res.data.message);
                    } }).catch(errors.call(this)).finally(()=>{
                        this.updateLoadingStatus({isLoading:false});
                    })
                } else {
                    this.curr.import(data).then(valid.call(this)).then(this.onEnd).catch(errors.call(this)).finally(()=>{
                        this.updateLoadingStatus({isLoading:false});
                    });
                }
            } else {
                this.$Message.error("请先选择文件");
            }
        },
        onEnd(res){
            if(res.ok){
                let data = res.data.data;
                this.$Modal.info({
                    title: '导入结果',
                    content: `总条数：${data.totalNum}，更新条数： ${data.overwrite}，错误条数： ${data.failureNum}`
                });
                this.retData = data;
            }
        },
        downloadTemplate(){
            if (this.$route.query.froms === 'CRM') {
                window.open(`${location.origin}/spoc-crm/a/ws/crm/crmLocation/import/template`);
            } else {
                window.open(school.downloadTemplate(this.$route.query.t));
            }
            
        },
        downReport(){
            window.open(this.reportUrl());
        }

    }
}
</script>

