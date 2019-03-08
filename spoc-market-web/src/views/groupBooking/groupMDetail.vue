<style lang='less'>
    .groupMDetail_Gsx {
        .handle {
            margin-top: 70px;
            text-align: center;

        }
    }
        
</style>
<template>
    <div class="groupMDetail_Gsx">
        <group-infor
            v-if="dataInfo.goodsList[0].formIds.length"
            :data='dataInfo'
            :picture='picture'
            :isReject='isReject'
            :fid='dataInfo.goodsList[0].formIds[0]'
            :uid='dataInfo.goodsList[0].formIds[0]'
        >
            <template slot="title"
                v-if="isReject">
                <title-mod
                    :data='dataInfo'
                    >
                </title-mod>
            </template>
            <template slot="footer">
                <p class="handle">
                    <Button class="def_btn" @click="goBack">返回</Button>
                    <Button type="primary" v-if="idEdit" class="primary_btn" @click="editor">编辑</Button>
                </p>
            </template>
        </group-infor>
         <!-- 对话框 -->
        <Modal
            ref="md"
            v-model="modal1"
            title="编辑"
            width=728
            @on-ok="ok"
            @on-cancel="cancel">
            <div style="text-align:center">
                <p style="color:red;margin-bottom:20px">活动已经开始只能更改结束时间</p>
                <span>拼团结束时间：</span> <DatePicker type="datetime" :value='dataInfo.endTime' @on-change="timeChange" style="width:160px"></DatePicker>
            </div>
        </Modal>
    </div>
</template>

<script>
import groupInfor from './components/groupInfor'
import titleMod from './components/titleMod'
import valid, {
    errors,
    common,
    sys,
    groupB
} from "../../libs/request";
export default {
    data() {
        return  {
            picture: '',
            formId: '',
            modal1: false,
            idEdit: this.$route.query.isEdit||'',
            id: this.$route.query.shopId,
            dataInfo: {
                goodsList: [{details: '', formIds: []}],
                id: 1212,
                content: '',
                formName: '线下活动报名表',
                rejectList: [
                    
                ]
            },
            isReject: this.$route.query.isReject || false 
        }
    },

    created() {
    },

    mounted() {
        this.geDetail()
    },

    components: {
        groupInfor,
        titleMod
    },

    methods: {
        getFormTable() {
            // 获取动态表单列表
            let params = {
                groupId: 'com_form_tpl_kind_goods',
                pageSize: -1,
            }
            common.listFormMean(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data.list;
                    let arr = [];
                    if(data) {
                        arr =  data.filter((item) => {
                            return item.id == this.formId; 
                        });
                    }
                    if(arr.length > 0) {
                        this.$set(this.dataInfo, 'formName', arr[0].name)
                    }
                }
            }).catch(errors.call(this));
        },

        getPicture(id) {
            // 获取图片
            let params = {
                id: id
            }
            sys.getPath(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.picture = res.data.data.path;
                }
            }).catch(errors.call(this));
        },
        
        goBack() {
            this.$router.go(-1)
        },

        geDetail() {
            let obj = {
                id: this.id
            }
            groupB.getDetail(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let Data = res.data.data
                    this.dataInfo = Data
                    this.formId = Data.goodsList[0].formIds[0]
                    this.getFormTable()
                    this.getPicture(Data.goodsList[0].attachmentId)
                }
            }).catch(errors.call(this))
        },

        editor() {
            // if (this.dataInfo.packStatus != 'packempty' && this.dataInfo.auditStatus != 'reject') {
            //     this.modal1 = true
            //     return
            // }
            this.$router.push({
                name: 'groupM.newGroup',
                query: {
                    id: this.id
                }
            })
        },

        timeChange(val) {
            this.dataInfo.endTime = val
        },

        ok() {
            if (!this.dataInfo.endTime) {
                this.$Message.info('请填写时间')
                this.$refs.md.visible = true
                this.modal1 = true
                return
            }
            let obj = {
                id: this.id,
                endTime: this.dataInfo.endTime,
            }
            groupB.timeOut(obj).then(valid.call(this)).then(res => {
                if(res.ok) {    
                    this.$Message.info(res.data.message)
                }
            }).catch(errors.call(this))
            
        },

        cancel() {

        }
    }
}
</script>

