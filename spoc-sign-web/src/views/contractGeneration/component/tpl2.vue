<style lang="less">

</style>

<template>
<Form :rules="rules" :label-width="100" :model="paramsData" ref="f">
    <div>
        <Row>
            <Col span="8">
                <FormItem label="课程名称" prop="name">
                    <Input v-model="paramsData.name">
                    </Input>
                </FormItem>
            </Col>
            <Col span="4" push="2">
                <FormItem label="赠送课程兑换截止时间" prop="endTime">
                    <DatePicker v-model="paramsData.endTime" :editable="false" type="month" :clearable="false"></DatePicker>
                </FormItem>
            </Col>
            <Col span="4" push="4">
                <FormItem label="赠送课程数量" prop="count">
                    <Input v-model="paramsData.count" style="width: 158px;">
                    </Input>
                </FormItem>
            </Col>
        </Row>
        <FormItem label="标准补充协议：">
            <p v-text="tpl">
            </p>
        </FormItem>
    </div>
</Form>
</template>
<script>
import { replace } from '../../../libs/util.js';

export default {
    props:{
		data:{
			type:Object,
			required:true,
		},
		info:{ // 主合同信息
			type:Object,
			required:true,
        },
        policy:{
            type:Object,
            required:true,
        }
	},
    data(){
        return {
            paramsData:{
                name:'',
                endTime:'',
                count:'',
            },
            rules:{
                name:[
                    {required:true,message:'此项为必填'}
                ],
                endTime:[
                    {required:true,message:'此项为必填'}
                ],
                count:[
                    {required:true,message:'此项为必填'}
                ]
            }
        };
    },
    computed:{
        tpl(){
            const item = this.data.htItemList.find(item=>item.id==this.policy.itemId);
            if(!item){
                return this.data.protocal;
            }
            if(this.policy.giftCount){
            	
            }
            const text = item.protocal?item.protocal:this.data.protocal;
            let count = this.paramsData.count;
            let name = this.paramsData.name;
            let date = new Date(this.paramsData.endTime);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            return replace(text,['$1$',count||0],['$2$',name],['$3$',year?year:''],['$4$',month?month:'']);
        }
    },
    created(){
//          const item = this.data.htItemList.find(item=>item.id==this.policy.itemId);
//          this.paramsData.count=item.giftCount;
    },
    methods:{
        setData(){
            this.paramsData=this.policy.jsonData? JSON.parse(this.policy.jsonData):{};
        },
        validForm(){
            return this.$refs.f.validate();
        }
    },
    watch:{
        paramsData:{
            handler(val){
                this.policy.giftCount=val.count;
                this.policy.jsonData = val;
            },
            deep:true,
        },
        tpl(v){
            this.policy.protocalText = v;
            const item = this.data.htItemList.find(item=>item.id==this.policy.itemId);
//          this.paramsData.count=item.giftCount;
        },
        'policy.itemId':{
            handler(val){
	            const item = this.data.htItemList.find(item=>item.id==this.policy.itemId);
	            this.paramsData.count=item.giftCount;
            },
            deep:true,
        }
    }
}
</script>

