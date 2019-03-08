<template>
    <div class="companyFilterx">
        <!-- <case-bar
            :tagList ='controlledList'
            title="　分公司"
            typeKind='remarks'
            v-if="isHeaderManage"
            @addAcitveCon='addAcitveCon'
            :num="numCompany">
        </case-bar> -->
        <case-bar1 v-if="isHeaderManage" title="分公司" :tagList='controlledList' @addAcitveCon='addAcitveCon' key1='remarks' :num='numCompany'></case-bar1>
        <case-bar1 v-if="isManage||isHeaderManage" title="规划组" :tagList='planGroupList' @addAcitveCon='addAcitveGroup' key1='name' :num='numGroup'></case-bar1>
        <!-- <case-bar
            :tagList ='planGroupList'
            
            typeKind='group'
            
            :num="numGroup"
            @addAcitveGroup='addAcitveGroup'>
        </case-bar> -->
    </div>
</template>

<script>
import valid, { errors, common, plServiceGroup, sys, STATISTICS } from "../../../libs/request";
import caseBar1 from './casebarN'
import { mapState, mapGetters } from 'vuex'
export default {
    data() {
        return {
            controlledList: [],
            planGroupList: [],
            peopleList: [],
            numCompany: 0, //公司选中序号
            numGroup: 0, //规划组选中序号
            numTeacher: 0, //中方顾问选中序号+
            currentTime: '',
        }
    },

    components: {
        caseBar1
    },

    computed: {
        ...mapState(['userInfo']),
	    ...mapGetters('plan',['isAdmin', 'isBranchOfficeLeader', 'isCeo', 'isServer']),            
        // 判断是否分公司leader,判定是否显示规划组标签
        isManage() {
            if(this.isAdmin||this.isBranchOfficeLeader) {
                if(!this.isHeaderManage){
                    this.getGroupLeaderList()
                }
                return true
            }
            return false
        },
        
        // 判断是否集团leader,判定是否显示分公司标签
        isHeaderManage() {
            if(this.isAdmin|| this.isCeo || this.isServer) {
                this.getControlledList()
                return true
            }
            return false
        }
    },

    created() {
        console.log(this.isServer, 89)
        this.getTime()
    },

    methods: {
        getTime() {
            STATISTICS.getTime({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.currentTime = res.data.data.date
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        //获取全部分公司
        getControlledList() {
            let obj = {
                grade: '2',
                types: '1,2'
            }
            sys.officeList(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    res.data.data.allCompany.unshift({id: '',
                            remarks: '全部',})
                    this.controlledList = res.data.data.allCompany
                    this.companyId = res.data.data.allCompany[0].id //加载第一个分公司的规划组
                    this.getGroupLeaderList()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        
        //获取全部规划组 或者切换分公司时调用
        getGroupLeaderList() {
            if((!this.isHeaderManage) && this.isManage) { //如果不是分公司leader。则获取当前用户所属机构的规划组
                this.companyId = this.userInfo.officeId
            }
            let obj = {
                officeId: this.companyId,
                menuId: '401',

            }
            common.findGroupName(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    res.data.data.unshift(
                        {
                            id: '',
                            name: '全部',
                        }
                    )
                    this.planGroupList = res.data.data
                    this.planGroupId = res.data.data[0].id
                    this.$emit('toggleGroup', this.companyId, this.planGroupId)
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        //切换分公司
        addAcitveCon(id, index) {
            this.companyId = id
            this.numCompany = index
            this.numGroup = 0
            this.numTeacher = 0 
            this.pageNo  = 1
            this.getGroupLeaderList()
        },

        //切换规划组
        addAcitveGroup(id, index) {
            this.planGroupId = id
            this.numGroup = index
            this.numTeacher = 0
            this.pageNo  = 1
            this.$emit('toggleGroup', this.companyId, this.planGroupId)
        },
    }
}
</script>

<style lang='less'>

</style>
