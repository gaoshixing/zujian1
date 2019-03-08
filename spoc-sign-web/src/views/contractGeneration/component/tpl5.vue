<style lang="less">

</style>

<template>
<Form :rules="rules" :model="paramsData" ref="f" :label-width="100">
    <div>
        <Row>
            <Col span="8">
                <FormItem label="服务费退还比例" prop="rate">
                    <Input v-model="paramsData.rate">
                        <span slot="append">%</span>
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
                rate:''
            },
            rules:{
                rate:[
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
            let rate = this.paramsData.rate;
            return replace(text,['$1$',rate]);
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

