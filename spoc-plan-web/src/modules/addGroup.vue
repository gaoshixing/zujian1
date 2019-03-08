<style lang="less">
.plan-add-group-m{

}
</style>
<template>
    <div>
        <Modal
        v-model="isvisible"
        class-name="plan-add-group-m"
        title="创建讨论组"
        width="730px"
        >
            <div>
                <Form ref="form" :model="form.data" :label-width="100" :rules="form.rules">
                    <FormItem label="讨论组名称" prop='name'>
                        <Input v-model="form.data.name" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="选择人员">
                        <Button type="primary" @click="choosePeople">点击选择</Button>
                        <span>&emsp;已选择&nbsp;{{members.length}}&nbsp;人</span>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="ghost" size="large" @click="doCancel">取消</Button>
                <Button type="primary" size="large" @click="doSave">保存</Button>
            </div>
        </Modal>
        <role-people @fresh="doChoosePeople" ref="people"></role-people>
    </div>
</template>

<script>

import valid,{ errors, plServiceGroup, common } from '../libs/request';
import rolePeople from '@public/modules/rolePeopleRadio';

export default {
    data(){
        const message='此项为必填';
        const req=[{required: true, message, trigger: 'blur' } ];
        const req2=[{ required: true, message, trigger: 'change' }]
        return {
            form:{
                data:{
                    name:'',
                    peoples:[],
                    // tags:''
                },
                rules:{
                    name:req,
                }
            },
            isvisible:false,
        }
    },
    computed:{
        members(){
            const arr=[];
            this.form.data.peoples.forEach(item=>
            {
                arr.push({user:item.id});
            });
            return arr;
        }
    },
    components:{
        rolePeople
    },
    methods:{
        show(){
            this.$refs.form.resetFields();
            this.isvisible = true;
        },
        choosePeople(){
            // show choose tag modal
            this.$refs.people.show();
        },
        doCancel(){
            this.isvisible = false;
            this.$emit('close');
        },
        doSave(){
            this.$refs.form.validate(ok=>{
                if(ok){
                    const name = this.form.data.name;
                    const comServiceMemberList = this.members;
                    common.saveDiscussion({name,comServiceMemberList}).then(valid.call(this)).then(res=>{
                        if(res.ok){
                            this.$emit('fresh');
                        }
                    }).catch(errors.call(this));
                    this.isvisible = false;
                    this.$emit('close');
                } else {
                    console.info(ok);
                }
            });
        },
        doChoosePeople(data){
            this.form.data.peoples = data;
        }

    }
}
</script>


