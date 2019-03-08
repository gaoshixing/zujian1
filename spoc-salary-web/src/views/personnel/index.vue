<style lang="less">
.personnel-container{
    height: 100%;
    .leftMenu{
        width: 200px;
        border-right: 1px solid #dddee1;
    }
    .personnel-middle{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 100%;
        margin-top: 10px;
    }
    .left-menus{
        height: 100%;
        position: relative;
    }
    .right-container{
        margin-top: 15px;margin-left: 15px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        overflow-y: auto;
    }
    .count-btn-lists{
        @h: 32px;
        line-height: @h;
        height: @h;
        color: #333;
        font-size: 14px;
        margin: 15px 0;
        position: relative;
        & > span{
            color: #44bcb7;
            font-size: 18px;
            font-weight: 700;
            margin-left: 5px;
        }
        .btn-lists{
            float: right;margin-right: 20px;
            .ivu-btn{
                margin-right: 6px;
            }
        }
    }
}
</style>
    
<template>
<div class="personnel-container">
    <Tabs v-model="personnelType" @on-click="changeTabs">
        <TabPane label="在职员工" name="1"></TabPane>
        <TabPane label="离职员工" name="2"></TabPane>
    </Tabs>
    <div class="personnel-middle">
        <div class="left-menus">
            <left-menu :navTab="tab" :isIncumbency="isIncumbency" @onItemClick="itemClick" ref="leftMenus"></left-menu>
            <!-- <left-menu :navTab="tab" @onItemClick="itemClick" ref="leftMenus"></left-menu> -->
        </div>
        <div class="right-container">
            <incumbent-staff :pid="pid" ref="incumbent" v-if="personnelType == 1"></incumbent-staff>
            <employee-staff :pid="pid" ref="employee" v-if="personnelType == 2"></employee-staff>
        </div>
    </div>
</div>
</template>

<script>

import incumbentStaff from './modules/incumbentStaff.vue';
import employeeStaff from './modules/employeeStaff.vue';
import leftMenu from "../../modules/leftMenu";

export default {
    props: {
        pid: {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        return {
            personnelType: '1',
            tab: true,
            current: '1', //当前tab
            item: {}, //树对象
            type: '', //树类型
            isIncumbency: '1', //为1代表在职列表的为0代表离职列表的, 
            shuaxin: false,
        };
    },
    computed: {
        
    },
    components: {
        incumbentStaff,
        employeeStaff,
        leftMenu
    },
    mounted(){
        // this.queryObj.tabs = this.$route.query.tabs;
        if(this.$route.query.tabs) {
            this.shuaxin = true;
            if(this.$route.query.tabs == '2') this.personnelType = this.$route.query.tabs;
            this.changeTabsIndex(this.personnelType);
        }
    },
    methods: {
        setData(year, month, dataType) {
            // let start = new Date(year, month - 1);
            let start = new Date(year, month - 1).format('yyyy-MMMM-dd');
            let end = '';
            // console.log(start);
            if(month == '12') {
                end = new Date(new Date(Number(year) + 1, 0).getTime() - 1000 * 60 * 60 * 24).format('yyyy-MMMM-dd');
            }else{
                end = new Date(new Date(year, month).getTime() - 1000 * 60 * 60 * 24).format('yyyy-MMMM-dd');
            }
            if(dataType == 'joinDate') this.$refs.incumbent.setJoinDate(start, end);
            else if(dataType == 'correctDate') this.$refs.incumbent.setCorrectDate(start, end);
            else if(dataType == 'departureDate') this.$refs.employee.setDepartureDate(start, end);
            // console.log(end)
        },
        changeTabsIndex(item) {
            this.changeTabs(item);
            setTimeout(() => {
                if(this.$route.query.year) this.setData(this.$route.query.year, this.$route.query.month, this.$route.query.data);
            }, 0);
        },
        changeTabs(item) {
           
            // 切换tabs
            // console.log(item)
            if(item != this.current) {
                // 切换tabs
                // if(item == '1') this.isIncumbency = '1'; else this.isIncumbency = '0';
                this.isIncumbency = item == '1' ? '1' : '0';
                this.$refs.leftMenus.uploadData();
                this.current = item;
                setTimeout(() => {
                    this.getLists();
                }, 0);
            }
        },
        itemClick(item, type) {
            console.log(item)
            this.item = item;
            this.type = type;
            if(!this.shuaxin) { //true
                this.getLists();
            } else this.shuaxin = false;
            
        },
        getLists() {
            // 获取数据
            if(this.personnelType == '1') {
                this.$refs.incumbent.setId(this.item, this.type, this.shuaxin);
            }else{
                this.$refs.employee.setId(this.item, this.type, this.shuaxin);
            }
        },
    }
}
</script>


