<style lang="less">
.crm-transfer{
    .user-list{
        display: flex;
        flex-wrap: wrap;
        margin: 20px 0;
        .uitem{
            flex: 0 0 10%;
            width: 10%;
            overflow: hidden;
        }
    }
}
.crm-invate{
    .in-tips{
        margin: 10px 0 20px 40px;
        color: #999;
    }
}
</style>
<template>
    <div>
        <Modal class-name="vertical-center-modal crm-invate" v-model="invate.show" title="确定邀约" width="728">
            <div>
                <p class="in-tips">邀约成功资源将被提交给分单员</p>
                <Form ref="invate" :rules="invate.rules" :model="invate.data" :label-width="100">
                    <FormItem label="邀约时间" prop="date">
                        <DatePicker type="date" v-model="invate.data.date" style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem label="备注" prop="remarks">
                        <Input type="textarea" v-model="invate.data.remarks"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="invateCancel">取消</Button>
                <Button type="primary" @click="invateOk">确定</Button>
            </div>
        </Modal>
        <Modal class-name="vertical-center-modal crm-transfer" v-model="trans.show" :title="trans.share?trans.shareTitle:trans.transTitle" width="728">
            <div>
				<Input v-model="trans.text" icon="ios-search-strong" placeholder="人员搜索" style="width:400px" @on-enter="doSearch"></Input>
            
				<v-search-options :data="company.options" byKey="label" :searchTitle="company.tit" @on-select-item="companyChange" labelWidth="80" v-if="company.options.length" multiple style="margin-top: 10px;"></v-search-options>
                <Checkbox-group v-if="trans.share" class="user-list" v-model="trans.id">
                    <Checkbox class="uitem" :key="'u'+item.id" v-for="item in userlist" :label="item.id">{{item.name}}</Checkbox>
                </Checkbox-group>
                <Radio-group v-else class="user-list" v-model="trans.id">
                    <Radio class="uitem" :key="'u'+item.id" v-for="item in userlist" :label="item.id">{{item.name}}</Radio>
                </Radio-group>
            </div>
            <div slot="footer">
                <Button @click="transCancel">取消</Button>
                <Button type="primary" @click="transOk" :disabled="!trans.id">确定</Button>
            </div>
        </Modal>
        <Modal class-name="vertical-center-modal crm-abandon" v-model="abandon.show" title="放弃客户" width="728">
            <div>
				<Form ref="abandon" :rules="abandon.rules" :model="abandon.data" :label-width="80">
                    <FormItem label="放弃理由" prop="text">
                        <Input type="textarea" v-model="abandon.data.text"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="abandonCancel">取消</Button>
                <Button type="primary" @click="abandonOk" :disabled="!abandon.data.text">确定</Button>
            </div>
        </Modal>
        <Modal v-model="moveGroup" title="移动" @on-ok="moveGroupFun" width='550'
            :loading="loading"
            v-if="group"
            @on-cancel="moveGroupCancel" class="model-component">
            <RadioGroup v-model="moveId">
                <Radio v-for="item in groupLists" v-if="item.id != '5004'" :key="item.id" :label="item.id">{{ item.name }}</Radio>
            </RadioGroup>
        </Modal>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import valid, { errors , crmCustomerShare,sys,crmCustomer ,crmCustomerSale,crmCustomerTmk, common } from '../../../libs/request.js';
import vSearchOptions from "@public/modules/vSearchOptions.vue";

export default {
    props:{
        uid:{
            type:[String,Number],
            required:true
        },
        flag:{
            type:[Number,String],
            default:0,
        },
        shareList:{
            type:Array,
            required:true,
        },
        groupId:{
            type:[String,Number],
            required:false
        },
        group: {
            type: [String,Boolean],
            default: false,
            required: false
        }
    },
    data(){
        return {
            moveGroup: false,
            moveId: '',
            groupLists: [],
            loading: true,
            groupIdBackups: '',
            // 
        	companyId:[],
            userlist:[],
            trans:{
                show:false,
                share:false,
                shareTitle:'选择共享人',
                transTitle:'选择转让人',
                text:'',
                id:'',
            },
            invate:{
                show:false,
                data:{
                    date:'',
                    remarks:''
                },
                rules:{
                    date:[
                        {required:true,message:"该项为必填"}
                    ],
                }
            },
            abandon:{
                show:false,
                data:{
                    text:''
                },
                rules:{
                    text:[
                        {required:true,message:"该项为必填"}
                    ]
                },
            },
            shareData:[],
            company: {
                options: [],
                tit: '分公司'
            },
        }
    },
    mounted() {
        if(this.groupId) {
            this.groupIdBackups = this.groupId;
            this.moveId = this.groupId;
        }
    },
    components: {
        vSearchOptions
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
    	companyChange(val){
				let arr = [];
				val.childTags.forEach((v, k) => {
					arr.push(v.id);
				})
				this.companyId = arr;
				this.getTransUserList();
    	},
    	controlledList(){
			let params = {
				types: '1,3',
				grades: '2'
			}
			sys.controlledList(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr = res.data.data.map((item) => {
						return {
							label: item.companyName,
							id: item.id
						};
					})
					arr.unshift({
						label: '不限',
						id: ''
					});
					this.company.options = arr;
				}
			}).catch(errors.call(this));
    	},
        showTrans(){
        	this.controlledList();
            this.getTransUserList('');
            this.trans.show = true;
            this.trans.share = false;
            this.trans.id = '';
        },
        showShare(){
        	this.controlledList();
            this.getShareUserList('');
            this.trans.show = true;
            this.trans.share = true;
            this.trans.id = this.shareList.map(item=>item.shareId);
        },
        showInvate(){
            this.invate.show = true;
        },
        transCancel(){
            this.trans.show = false;
        },
        transOk(){
            this.updateLoadingStatus({isLoading: true});
            if(this.trans.share){
                return this.doShare(this.trans.id);
            }
            crmCustomer.saveOwnerId(this.trans.id,this.uid,this.flag).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.$Message.success(res.data.message);
                    this.$emit('transok',res.data);
                    this.trans.show = false;
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading: false});
            });
        },
        doShare(userId){
            let data = {
                curIdSale: this.uid,
                shareIds: userId.join(),
            }
            crmCustomerShare.batchsave(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.success(res.data.message);
                    this.$emit('share-ok',res.data);
                    this.trans.show = false;
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading: false});
            });
        },
        invateCancel(){
            this.invate.show = false;
        },
        invateOk(){
            this.$refs.invate.validate(ok=>{
                if(ok){
                    const data = {
                        cusId:this.uid,
                        time:this.invate.data.date.format('yyyy-MM-dd hh:mm:ss'),
                        remark:this.invate.data.remarks
                    };
                    crmCustomerTmk.saveStatusInvite(data).then(valid.call(this)).then(res=>{
                        if(res.ok){
                            this.$Message.success(res.data.message);
                            this.invate.show = false;
                            this.$emit('invate-ok');
                        }
                    }).catch(errors.call(this));
                }
            });
        },
        doSearch(){
            if(this.trans.share){
                this.getShareUserList(this.trans.text);
            } else {
                this.getTransUserList(this.trans.text);
            }
        },
        doGiveUp(status){
            this.$refs.abandon.resetFields();
            this.abandon.show = true;
            this.abandon.status = status;
        },
        abandonOk(){
            const id = this.uid;
            const status = this.abandon.status;
            const reason = this.abandon.data.text;
            crmCustomer.abandon({id,status,reason,flag:this.flag}).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.abandon.show = false;
                    this.$Message.success(res.data.message);
                }
            }).catch(errors.call(this));

        },
        abandonCancel(){
            this.abandon.show = false;
        },

        getShareUserList(name){
            this.userlist=[];
            const pageSize=-1;
            const cusId = this.uid;
            const companyIds=this.companyId.join(',');
            crmCustomerShare.userList({cusId,name,pageSize,companyIds}).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.userlist = res.data.data.list;
                }
            }).catch(errors.call(this));
        },
        getTransUserList(name){
            this.userlist=[];
            const pageSize=-1;
            const cusId = this.uid;
            const flag = this.flag;
            const companyIds=this.companyId.join(',');
            crmCustomer.ownerUserList({cusId,pageSize,name,flag,companyIds}).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.userlist = res.data.data.list;
                }
            }).catch(errors.call(this));
        },
        showMoveGroup(){
            // 显示移动分组弹窗
            this.getFzLists();
            this.moveGroup = true;
        },
        getFzLists() {
            // 获取分组列表
            let params = {
                parentId: 5001
            }
            common.getUserTagList(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.groupLists = res.data.data;
                }
            }).catch(errors.call(this));
        },
        moveGroupFun() {
            // 移动分组
            if(this.moveId) {
                let params = [
                    {
                        tagId: this.moveId,
                        itemId: this.uid,
                        type: 'crm_customer_group'
                    }
                ];
                // console.log(params)
                common.saveUserComTagRel(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.groupIdBackups = this.moveId;
                        this.$Message.success('移动分组成功');
                        this.moveGroup = false;
                        this.$emit('onRefresh');
                    }
                }).catch(errors.call(this));
            }else{
                this.$Message.error('请选择分组');
                this.loading = false;
                setTimeout(() => {
                    this.loading = true;
                }, 0);
            }
        },
        moveGroupCancel() {
            // 取消移动分组
            this.moveId = this.groupIdBackups ? this.groupIdBackups : '';
        },
    }
}
</script>


