<style lang="less">

</style>

<template>

    <div>
        <Form :rules="rules0" :model="paramsData" ref="f" :label-width="100">
            <div>
                <Row>
                    <Col span="8">
                        <FormItem label="赠送截止日期" prop="time">
                    		<DatePicker v-model="paramsData.time" :editable="false" type="date" :clearable="false"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        </Form>
        
        <FormItem label="标准补充协议：">
            <p v-text="tpl">
            </p>
        </FormItem>
    </div>

</template>
<script>
import { replace , digitUppercase } from '../../../libs/util.js';

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
        const req = [
            {required:true,message:'此项为必填'}
        ];

        return {
            paramsData:{
                time:'',
            },
            rules0:{
                time:req,
            },
        };
    },
    computed:{
        tpl(){
            const item = this.currItem;
            if(!item.id){
                return this.data.protocal;
            }
            const text = item.protocal?item.protocal:this.data.protocal;
            const p = this.paramsData;
            const num=item.htItemSettingMap.giftCount;
            let date = new Date(this.paramsData.time);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            console.info(item,this.policy.itemId);
            return replace(text,['$1$',num],['$2$',year||'__'],['$3$',month||'__'],['$4$',day||'__']);
        },
        currItem(){
            const item = this.data.htItemList.find(item=>item.id==this.policy.itemId);
            return item || {};
        }

    },
    created(){
        this.policy.giftCount=1;
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
                const item = this.currItem;
//              if(item.protocalType==0){ // 赠送学校
//                  this.policy.giftCount = val.snum||1;
//              } else if(item.protocalType==1){ // 赠专业
//                  this.policy.giftCount = val.znum||1;
//              } else if(item.protocalType==2){
//                  this.policy.giftCount = val.plussnum||1;
//              } else if(item.protocalType==3){
//                  this.policy.giftCount = val.plusznum||1;
//              } else {
//                  this.policy.giftCount=0;
//              }
                this.policy.jsonData = val;
                this.$emit('on-change');
            },
            deep:true,
        },
        tpl(v){
            this.policy.protocalText = v;
        },
    }
}
</script>

