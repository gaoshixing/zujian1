<style lang="less">

</style>

<template>
<Form :rules="rules" :model="paramsData" ref="f" :label-width="100">
    <div>
        <Row>
            <Col span="8">
                <FormItem label="首付款金额" prop="firstMoney">
                    <Input v-model="paramsData.firstMoney"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="二期付款时间" prop="secondTime">
                    <DatePicker v-model="paramsData.secondTime" :editable="false" type="date" :clearable="false"></DatePicker>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="二期付款金额" prop="secondMoney">
                    <Input v-model="paramsData.secondMoney"></Input>
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
import { replace,digitUppercase } from '../../../libs/util.js';

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
                firstMoney:'',
                secondTime:'',
                secondMoney:''
            },
            rules:{
                firstMoney:[
                    {required:true,message:'此项为必填'}
                ],
                secondTime:[
                    {required:true,message:'此项为必填'}
                ],
                secondMoney:[
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
            const text = item.protocal?item.protocal:this.data.protocal;
            let $1 = this.paramsData.firstMoney;
            let date = new Date(this.paramsData.secondTime);
            let $2 = date.getFullYear();
            let $3 = date.getMonth()+1;
            let $4 = date.getDate();
            let $5 = this.paramsData.secondMoney;
            return replace(text,['$1$',digitUppercase($1)],['$2$',$2],['$3$',$3],['$4$',$4],['$5$',digitUppercase($5)]);
        }
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
                this.policy.jsonData = val;
            },
            deep:true,
        },
        tpl(v){
            this.policy.protocalText = v;
        }
    }
}
</script>

