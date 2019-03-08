<style lang="less">

</style>

<template>

    <div>
        <Form :rules="rules0" :model="paramsData" ref="f" :label-width="100" v-if="currItem.protocalType==0">
            <div>
                <Row>
                    <Col span="8">
                        <FormItem label="赠送学校数量" prop="snum">
                            <Input v-model="paramsData.snum">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        </Form>
        <Form :rules="rules1" :model="paramsData" ref="f" :label-width="100" v-else-if="currItem.protocalType==1">
            <div>
                <Row>
                    <Col span="8">
                        <FormItem label="赠送专业数量" prop="znum">
                            <Input v-model="paramsData.znum">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="合同约定学校申请数量" prop="csnum">
                            <Input v-model="paramsData.csnum">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="合同约定专业申请数量/学校" prop="cznum">
                            <Input v-model="paramsData.cznum">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        </Form>
        <Form :rules="rules2" :model="paramsData" ref="f" :label-width="100" v-else-if="currItem.protocalType==2">
            <div>
                <Row>
                    <Col span="8">
                        <FormItem label="合同约定学校申请数量" prop="csnum">
                            <Input v-model="paramsData.csnum">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="增加学校数量" prop="plussnum">
                            <Input v-model="paramsData.plussnum">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        </Form>
        <Form :rules="rules3" :model="paramsData" ref="f" :label-width="100" v-else-if="currItem.protocalType==3">
            <div>
                <Row>
                    <Col span="8">
                        <FormItem label="增加专业数量" prop="plusznum">
                            <Input v-model="paramsData.plusznum">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="合同约定学校申请数量" prop="csnum">
                            <Input v-model="paramsData.csnum">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="合同约定专业申请数量/学校" prop="cznum">
                            <Input v-model="paramsData.cznum">
                            </Input>
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
            {required:true,message:'此项为必填'},
            {pattern:/^[1-9]\d{0,9}$/,message:'请输入正整数'}
        ];

        return {
            paramsData:{
                snum:'',
                znum:'',
                plussnum:'',
                plusznum:'',
                csnum:'',
                cznum:'',
            },
            rules0:{
                snum:req,
            },
            rules1:{
                znum:req,
                csnum:req,
                cznum:req
            },
            rules2:{
                csnum:req,
                plussnum:req,
            },
            rules3:{
                plusznum:req,
                csnum:req,
                cznum:req,
            },
        };
    },
    computed:{
        tpl(){
            let item = this.currItem;
            if(!item.id){
                return this.data.protocal;
            }
            let text = item.protocal?item.protocal:this.data.protocal;
            let p = this.paramsData;
            console.info(item,this.policy.itemId);

            if(item.protocalType==0){ // 赠送学校，赠送专业， 增加学校，增加专业
                return replace(text,['$1$',p.snum]);
            } else if (item.protocalType==1){
                return replace(text,['$1$',p.znum],['$2$',p.csnum],['$3$',Number(p.cznum)+Number(p.znum)] );
            } else if (item.protocalType==2){
                let feed = item.publicPrice* p.plussnum;
                this.paramsData.money=feed;
                return replace(text,['$f$',digitUppercase(item.publicPrice)],['$1$',p.csnum],['$2$',p.plussnum],['$3$',digitUppercase(feed)]);
            } else if(item.protocalType==3){
                let feed = item.publicPrice* p.plusznum;
                this.paramsData.money=feed;
                return replace(text,['$f$',digitUppercase(item.publicPrice)],['$1$',p.plusznum],['$2$',p.csnum],['$3$',Number(p.plusznum)+Number(p.cznum)],['$4$',digitUppercase(feed)]);
            }
        },
        currItem(){
            let item = this.data.htItemList.find(item=>item.id==this.policy.itemId);
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
                let item = this.currItem;
                if(item.protocalType==0){ // 赠送学校
                    this.policy.giftCount = val.snum||1;
                } else if(item.protocalType==1){ // 赠专业
                    this.policy.giftCount = val.znum||1;
                } else if(item.protocalType==2){
                    this.policy.giftCount = val.plussnum||1;
                } else if(item.protocalType==3){
                    this.policy.giftCount = val.plusznum||1;
                } else {
                    this.policy.giftCount=0;
                }
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

