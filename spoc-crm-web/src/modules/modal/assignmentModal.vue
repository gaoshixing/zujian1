<style lang="less">
.model-component{
    .ivu-btn{
        font-size: 14px;
    }
    .assignment{
        padding: 0 8px 0 16px;
    }
    .user-list{
        display: flex;
        flex-wrap: wrap;
        margin: 20px 0;
        .uitem{
            flex: 0 0 14.285714285714286%;
            width: 14.285714285714286%;
            overflow: hidden;margin-right: 0;
        }
    }
}
</style>
    
<template>
    <Modal v-model="assignmentModal" title="选择转让人" width='750'
        :loading="loading" class="model-component">
        <div class="assignment">
            <v-select 
                style="width: 396px;margin-bottom: 15px;"
                placeholder="人员搜索"
                :datafunc="datafunc"
                value='value'
                icon="search" 
                v-model="compact"
                k='cnname'
                @on-enter="textChange" 
                @on-click="textChange" 
                @selected="textChange">
            </v-select>
            <v-search-options :data="company.options" byKey="label" :searchTitle="company.tit" @on-select-item="assignmentChange" labelWidth="80" v-if="company.options.length" multiple style="margin-top: 10px;"></v-search-options>
            <RadioGroup class="user-list" v-model="assignment">
                <Radio class="uitem" :label="item.id" v-for="item in assignmentLists" :key="'assignment' + item.id">{{ item.name }}</Radio>
            </RadioGroup>
        </div>
        <div slot="footer">
            <Button @click="invateCancel">取消</Button>
            <Button type="primary" @click="invateOk">确定</Button>
        </div>
    </Modal>
</template>

<script>

import vSelect from '@public/modules/vSelect';
import valid, {errors, crmCustomer, sys} from '../../libs/request.js';
import vSearchOptions from "@public/modules/vSearchOptions.vue";

export default {
    data(){
        return {
            lists: [],
            assignmentModal: !true,
            loading: true,
            compact: '',
            company: {
                options: [],
                tit: '分公司'
            },
            assignment: '',
            assignmentLists: [],
            hasAssignmentLists: false,
            uid: [],
            companyId:[],
        };
    },
    components: {
        vSelect,vSearchOptions
    },
    methods: {
        getUid() {
            // 获取uid
            this.uid = [];
            if(this.lists.length > 0) {
                this.lists.forEach(item => {
                    this.uid.push(item.cusId);
                });
            }
        },
        getSaleLists(name) {
            // 获取转让人列表
            this.assignmentLists = [];
            let pageSize = -1;
            let flag = '0';
            let companyIds = this.companyId.join(',');
            crmCustomer.ownerUserList({pageSize,name,flag,companyIds}).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.assignmentLists = res.data.data.list;
                }
            }).catch(errors.call(this));
        },
        showAssignment(list) {
            this.lists = list;
            this.getUid();
            this.showTrans();
            // 打开转让客户弹窗
            if(!this.hasAssignmentLists){
                this.hasAssignmentLists = true;
                this.getSaleLists('');
            }
            this.assignmentModal = true;
        },
        textChange() {
            // 搜索
            this.getSaleLists(this.compact);
        },
        invateOk() {
            // 转让人确定
            if(this.assignment) {
                this.saveOwnerId();
            }else{
                this.$Message.error('请选择转让人');
            }
        },
        assignmentChange(val) {
            // 选择分公司
            let arr = [];
            val.childTags.forEach((v, k) => {
                arr.push(v.id);
            })
            this.companyId = arr;
            this.getSaleLists();
        },
        saveOwnerId() {
            // 转让
            let data = {
                ownerId: this.assignment,
                cusIds: this.uid.join()
            }
            crmCustomer.batchSaveOwnerId(data).then(valid.call(this)).then(res=>{
                if(res.ok){
                    // 转让成功，刷新列表
                    this.$Message.success('转让成功');
                    this.assignment = '';
                    this.assignmentModal = false;
                    this.$emit('onRefresh');
                }
            }).catch(errors.call(this));
        },
        invateCancel() {
            // 取消转让人
            this.assignment = '';
            this.assignmentModal = false;
        },
        datafunc() {
            return new Promise((resolve, reject) => {});
        },
        showTrans(){
            // 获取分公司信息
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
    },
}
</script>


