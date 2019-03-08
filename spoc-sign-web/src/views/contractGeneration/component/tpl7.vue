<style lang="less">

</style>

<template>
<Form :rules="rules" :label-width="100" :model="paramsData" ref="f">
    <div>
        <Row>
            <Col span="8">
                <FormItem label="申请年份" prop="endTime">
                    <DatePicker v-model="paramsData.endTime" type="year" :clearable="false" style="width:284px;"></DatePicker>
                </FormItem>
            </Col>
        </Row>
        <FormItem label="标准补充协议:">
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
                endTime:''      
            },
            rules:{
                endTime:[
                    {required:true,message:'此项为必填'}
                ]
            }
        };
    },
    computed:{
        tpl(){
            const item = this.data.htItemList.find(item=>item.id==this.policy.itemId);
            let date = new Date(this.paramsData.endTime);
            let year = date.getFullYear();
            if(!item){
            	return replace(this.data.protocal,['$3$',year?year:'']);
//              return this.data.protocal;
            }
            const text = item.protocal?item.protocal:this.data.protocal;
            this.policy.protocalText = text;
            return replace(text,['$3$',year?year:'']);
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

