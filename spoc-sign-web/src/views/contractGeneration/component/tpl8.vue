<style lang="less">
.yue-form-box{
    .c-title{
        padding-bottom: 20px;
    }
}
</style>

<template>
<div class="yue-form-box">
    <p class="c-title">　　约分项目：</p>
    <Form :label-width="160" :rules="rules" :model="paramsData" ref="f">
        <Row>
            <Col span="4">
                <FormItem :label-width="80">
                    <Checkbox v-model="paramsData.gpa.check">GPA</Checkbox>
                </FormItem>
            </Col>
            <Col span="10" v-if="paramsData.gpa.check">
                <FormItem label="总分（及以上）" prop="gpa.score">
                    <Input v-model="paramsData.gpa.score"></Input>
                </FormItem>
            </Col>
            <Col span="10" v-if="paramsData.gpa.check">
                <FormItem label="GPA满分" prop="gpa.full">
                    <Input v-model="paramsData.gpa.full"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="4">
                <FormItem :label-width="80">
                    <Checkbox v-model="paramsData.toelf.check">托福</Checkbox>
                </FormItem>
            </Col>
            <Col span="10" v-if="paramsData.toelf.check">
                <FormItem label="总分（及以上）" prop="toelf.score">
                    <Input v-model="paramsData.toelf.score"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row v-if="paramsData.toelf.check">
            <Col span="10" push="4">
                <FormItem label="听力不低于（及以上）" prop="toelf.listening">
                    <Input v-model="paramsData.toelf.listening"></Input>
                </FormItem>
            </Col>
            <Col span="10" push="4">
                <FormItem label="口语不低于（及以上）" prop="toelf.speaking">
                    <Input v-model="paramsData.toelf.speaking"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row v-if="paramsData.toelf.check">
            <Col span="10" push="4">
                <FormItem label="阅读不低于（及以上）" prop="toelf.reading">
                    <Input v-model="paramsData.toelf.reading"></Input>
                </FormItem>
            </Col>
            <Col span="10" push="4">
                <FormItem label="写作不低于（及以上）" prop="toelf.writing">
                    <Input v-model="paramsData.toelf.writing"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="4">
                <FormItem :label-width="80">
                    <Checkbox v-model="paramsData.ielts.check">雅思</Checkbox>
                </FormItem>
            </Col>
            <Col span="10" v-if="paramsData.ielts.check">
                <FormItem label="总分（及以上）" prop="ielts.score">
                    <Input v-model="paramsData.ielts.score"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row v-if="paramsData.ielts.check">
            <Col span="10" push="4">
                <FormItem label="听力不低于（及以上）" prop="ielts.listening">
                    <Input v-model="paramsData.ielts.listening"></Input>
                </FormItem>
            </Col>
            <Col span="10" push="4">
                <FormItem label="口语不低于（及以上）" prop="ielts.speaking">
                    <Input v-model="paramsData.ielts.speaking"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row v-if="paramsData.ielts.check">
            <Col span="10" push="4">
                <FormItem label="阅读不低于（及以上）" prop="ielts.reading">
                    <Input v-model="paramsData.ielts.reading"></Input>
                </FormItem>
            </Col>
            <Col span="10" push="4">
                <FormItem label="写作不低于（及以上）" prop="ielts.writing">
                    <Input v-model="paramsData.ielts.writing"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="4">
                <FormItem :label-width="80">
                    <Checkbox v-model="paramsData.sat.check">SAT</Checkbox>
                </FormItem>
            </Col>
            <Col span="10" v-if="paramsData.sat.check">
                <FormItem label="总分（及以上）" prop="sat.score">
                    <Input v-model="paramsData.sat.score"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="4">
                <FormItem :label-width="80">
                    <Checkbox v-model="paramsData.sat2.check">SAT2</Checkbox>
                </FormItem>
            </Col>
            <Col span="10" v-if="paramsData.sat2.check">
                <FormItem label="考试课程数（及以上）" prop="sat2.score1">
                    <Input v-model="paramsData.sat2.score1"></Input>
                </FormItem>
            </Col>
            <Col span="10" v-if="paramsData.sat2.check">
                <FormItem label="每门不低于（及以上）" prop="sat2.score2">
                    <Input v-model="paramsData.sat2.score2"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="4">
                <FormItem :label-width="80">
                    <Checkbox v-model="paramsData.act.check">ACT</Checkbox>
                </FormItem>
            </Col>
            <Col span="10" v-if="paramsData.act.check">
                <FormItem label="总分（及以上）" prop="act.score">
                    <Input v-model="paramsData.act.score"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="4">
                <FormItem :label-width="80">
                    <Checkbox v-model="paramsData.gre.check">GRE</Checkbox>
                </FormItem>
            </Col>
            <Col span="10" v-if="paramsData.gre.check">
                <FormItem label="总分（及以上）" prop="gre.score">
                    <Input v-model="paramsData.gre.score"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="4">
                <FormItem :label-width="80">
                    <Checkbox v-model="paramsData.gmat.check">GMAT</Checkbox>
                </FormItem>
            </Col>
            <Col span="10" v-if="paramsData.gmat.check">
                <FormItem label="总分（及以上）" prop="gmat.score">
                    <Input v-model="paramsData.gmat.score"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="8">
                <FormItem :label-width="80" label="约分时间：" prop="datetime">
                    <DatePicker v-model="paramsData.datetime" :editable="false" type="date" :clearable="false"></DatePicker>
                </FormItem>
            </Col>
            <Col span="10">
                <FormItem label="保录学校排名：" prop="rank">
                    排名前 <Input v-model="paramsData.rank" style="width:120px"></Input> 名
                </FormItem>
            </Col>
        </Row>

    </Form>
    <FormItem label="标准补充协议：">
        <p v-text="tpl">
        </p>
    </FormItem>


</div>
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
        const req =[{
                    required:true,message:'此项为必填'
                }];
        const req2 = [
            {required:true,message:'此项为必填'},
            {pattern:/^([1-9]\d*|0)(\.\d{1,2})?$/,message:'请输入数字'}
        ];
        const req3 = [
            {pattern:/^([1-9]\d*|0)(\.\d{1,2})?$/,message:'请输入数字'}
        ];
        return {
            
            paramsData:{
                gpa:{
                    score:'',
                    full:'',
                    check:false,
                },
                ielts:{
                    score:'',
                    listening:'',
                    speaking:'',
                    reading:'',
                    writing:'',
                    check:false,
                },
                toelf:{
                    score:'',
                    listening:'',
                    speaking:'',
                    reading:'',
                    writing:'',
                    check:false,
                },
                sat:{
                    score:'',
                    check:false,
                },
                sat2:{
                    score1:'',
                    score2:'',
                    check:false,
                },
                act:{
                    score:'',
                    check:false,
                },
                gre:{
                    score:'',
                    check:false,
                },
                gmat:{
                    score:'',
                    check:false,
                },
                datetime:new Date(+new Date() + 86400000*365*4),
                rank:''
            },
            rules:{
                rank:req2,
                datetime:req,
                'gpa.score':req3,
                'gpa.full':req3,
                'toelf.score':req3,
                'toelf.listening':req3,
                'toelf.speaking':req3,
                'toelf.writing':req3,
                'toelf.reading':req3,
                'ielts.score':req3,
                'ielts.listening':req3,
                'ielts.speaking':req3,
                'ielts.reading':req3,
                'ielts.writing':req3,
                'sat.score':req3,
                'sat2.score1':req3,
                'sat2.score2':req3,
                'act.score':req3,
                'gre.score':req3,
                'gmat.score':req3,

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
            let date = new Date(this.paramsData.datetime);

            let $1 = date.getFullYear();
            let $2 = date.getMonth()+1;
            let arr = [];
            if(this.paramsData.gpa.check){
                arr.push(`GPA成绩达到（ ${this.paramsData.gpa.score}  ）/（  ${this.paramsData.gpa.full}  ）分（及以上）`)
            }
            if(this.paramsData.toelf.check){
                arr.push(`标准化考试分数达到托福（  ${this.paramsData.toelf.score}   ）分（及以上）且听力不低于（  ${this.paramsData.toelf.listening}   ）分、口语不低于（  ${this.paramsData.toelf.speaking}   ）分、阅读不低于（  ${this.paramsData.toelf.reading}   ）分、写作不低于（  ${this.paramsData.toelf.writing}   ）分`)
            }
            if(this.paramsData.ielts.check){
                arr.push(`雅思（  ${this.paramsData.ielts.score}   ）分（及以上）且听力不低于（  ${this.paramsData.ielts.listening}   ）分、口语不低于（  ${this.paramsData.ielts.speaking}   ）分、阅读不低于（  ${this.paramsData.ielts.reading}   ）分、写作不低于（  ${this.paramsData.ielts.writing}   ）分`)
            }
            if(this.paramsData.sat.check){
                arr.push(`SAT（  ${this.paramsData.sat.score}  ）分`)
            }
            if(this.paramsData.sat2.check){
                arr.push(`SAT2考试课程数（ ${this.paramsData.sat2.score1}  ）（及以上）且每门不低于（ ${this.paramsData.sat2.score2}  ）（及以上）`)
            }
            if(this.paramsData.act.check){
                arr.push(`ACT（  ${this.paramsData.act.score}   ）分（及以上）`)
            }
            if(this.paramsData.gre.check){
                arr.push(`GRE（  ${this.paramsData.gre.score}   ）分（及以上）`)
            }
            if(this.paramsData.gmat.check){
                arr.push(`GMAT（   ${this.paramsData.gmat.score}   ）分（及以上）`)
            }

            let $3 = arr.join('，');
            let $4 = this.paramsData.rank;

            return replace(text,['$1$',$1],['$2$',$2],['$3$',$3],['$4$',$4]);
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

