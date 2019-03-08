<style lang="less">
.model-component{
    
}
</style>
    
<template>
    <Modal class-name="vertical-center-modal crm-transfer" v-model="shareModal" title="选择共享人" width="728">
        <div>
            <Input v-model="shareText" icon="ios-search-strong" placeholder="人员搜索" style="width:396px;margin-bottom: 15px;" @on-enter="doSearch"/>
            <v-search-options :data="company.options" byKey="label" :searchTitle="company.tit" @on-select-item="companyChange" labelWidth="80" v-if="company.options.length" multiple style="margin-top: 10px;"></v-search-options>
            <Checkbox-group class="user-list" v-model="shareId">
                <Checkbox class="uitem" :key="'u'+item.id" v-for="item in userlist" :label="item.id">{{item.name}}</Checkbox>
            </Checkbox-group>
        </div>
        <div slot="footer">
            <Button @click="transCancel">取消</Button>
            <Button type="primary" @click="transOk">确定</Button>
        </div>
    </Modal>
</template>

<script>

import vSearchOptions from "@public/modules/vSearchOptions.vue";
import valid, {errors, crmCustomerShare, crmCustomerSale, sys} from '../../libs/request.js';

export default {
    data(){
        return {
            lists: [],
            shareModal:false,
            shareText: '',
            company: {
                options: [],
                tit: '分公司'
            },
            shareId: [],
            userlist:[],
            uid: '',
            companyId:[],
        };
    },
    components: {
        vSearchOptions
    },
    methods: {
        doSearch() {
            // 搜索共享人
            this.getShareUserList(this.shareText);
        },
        companyChange(val){
            let arr = [];
            val.childTags.forEach((v, k) => {
                arr.push(v.id);
            })
            this.companyId = arr;
            this.getShareUserList();
        },
        transCancel() {
            // 关闭共享弹窗
            this.shareModal = false;
        },
        transOk() {
            // 确认共享
            let data = {
                curIdSale: this.uid,
                shareIds: this.shareId.join()
            }
            crmCustomerShare.batchsave(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.success('共享成功');
                    this.$emit('onRefresh');
                    this.shareModal = false;
                }
            }).catch(errors.call(this));
        },
        showShare(id, boo) {
            // 打开共享
            this.uid = id;
            this.showTrans();
            this.getShareUserList('');
            this.shareModal = true;
            this.shareId = [];
            this.shareText = '';
            if(boo) {
                this.showShareInfo();
            }
        },
        getShareUserList(name) {
            // 获取共享人名单
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
        showTrans(){
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
        showShareInfo() {
            // 获取当前共享人
            let data = {
                id: this.uid
            }
            crmCustomerSale.showShareInfo(data).then(valid.call(this)).then(res=>{
                if(res.ok){
                    let data = res.data.data;
                    res.data.data.forEach(item => {
                        this.shareId.push(item.shareId);
                    });
                }
            }).catch(errors.call(this));
        },
    },
}
</script>


