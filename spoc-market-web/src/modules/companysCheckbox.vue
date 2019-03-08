<style lang="less">
.wpMarketCompanyCheckbox{
    overflow: hidden;
    .name{
        float: left;
    }
    .companys{
        float: left;
    }
}
</style>
<template>
<div class="wpMarketCompanyCheckbox">
    <div class="name" :style="nameStyle">{{name}}</div>
    <div class="companys" :style="companyStyle">
        <RadioGroup v-model="showCheckboxGroup" @on-change="changeViewStatu">
            <Radio :label="0">
                <span>仅本公司可见</span>
            </Radio>
            <Radio :label="1">
                <span>其他公司可见</span>
            </Radio>
        </RadioGroup>
        <span style="color:#ff3434;">{{warning}}</span>
       <!--  <Checkbox :disabled="disabled" v-model="showCheckboxGroup" >
            其他学校可见<span style="color:#ff3434;">（勾选本项，则其他分校微信公众号也可查看引用本条微信文章内容）</span>
        </Checkbox> -->
        <CheckboxGroup style="margin-top:10px;" v-show="showCheckboxGroup" v-model="companyIds" @on-change="checkComany">
            <Checkbox :disabled="disabled" :label="item.id" v-for="item in companyList" :key="item.id">{{item.remarks}}</Checkbox>
        </CheckboxGroup>
    </div>
</div>
</template>
<script>
    import valid, { errors, wpMarketCommon} from "../libs/request";
    export default {
        props:{
            warning:{
                type: String,
                default: '(勾选本项，则其他分校微信公众号也可查看引用本条微信文章内容)'
            },
            name:{
                type: String,
                default: '分公司可见：'
            },
            nameStyle:{
                type: Object,
                default: ()=>{ 
                    return {
                        'padding': '10px 12px 10px 0',
                        'width': '100px',
                        'text-align':'right'
                    }
                }
            },
            companyStyle:{
                type:Object,
                    default: ()=>{ 
                    return {
                        'width': '80%',
                        'line-height': '18px'
                    }
                }
            },
            hasChecked: {
                type: Array,
                default:()=>{
                    return  []
                }
            },
            disabled:{
                type: Boolean,
                default:false
            }
        },
        data () {
            return {
                showCheckboxGroup: 0,
                companyIds:[],
                companyList:[]
            }
        },
        mounted(){
            this.loadCompany()
        },
		methods: {
            changeViewStatu(){
                if(!this.showCheckboxGroup){
                  this.companyIds = []
                  this.checkComany()  
                }
            },
            checkComany(){
                this.$emit('checkComany', this.companyIds)
            },
            loadCompany() {
                let data = {
                    grade: 2,
                    types: 1
                }
                wpMarketCommon.officeList(data).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.companyList = res.data.data.allCompany
                      
                    }
                }).catch(errors.call(this)).finally(() => {
                });
            },
        },
        watch:{
            hasChecked: function(newValue, oldValue){
                this.companyIds = newValue
                if(this.companyIds.length){
                    this.showCheckboxGroup = 1
                }
            }
        }
    }
</script>