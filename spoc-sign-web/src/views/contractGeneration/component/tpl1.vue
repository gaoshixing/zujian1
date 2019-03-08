<style lang="less">

</style>

<template>
<div class="protocol_content">
    <FormItem label="标准补充协议：">
        <p v-text="tpl">
        </p>
    </FormItem>
    
</div>
</template>
<script>
import { replace , digitUppercase, convertCurrency } from '../../../libs/util.js';
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
        },
        tplObj:{
            type:Object,
        },
        actualPrice:{
            type:[String,Number]
        },
        totalPrice:{
            type:[String,Number]
        },
	},
    data(){
        return {
            
        };
    },
    computed:{
        tpl(){
            const item = this.tplObj;
            if((!item) || (item && JSON.stringify(item) == '{}')){
                return this.data.protocal;
            }
            const text = item.protocal?item.protocalText:this.data.protocal;
            const r = item.ratio==0?100:item.ratio;
            let total = convertCurrency(this.totalPrice||this.info.price);
            let ratio = (r/10).toFixed(2);
            if(!ratio){
                return this.data.protocal;
            }
            let money = convertCurrency(Number(this.actualPrice||this.info.price).toFixed(2));
            const v = replace(text,['$1$',total],['$2$',ratio],['$3$',money]);
            this.policy.protocalText = v;
            return v;
        }
    },
    methods:{
        setData(){
        },
        validForm(){
            return Promise.resolve(true);
        }
    },
    watch:{
        tpl(v){
            this.policy.protocalText = v;
        }
    }
}
</script>

