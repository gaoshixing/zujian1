<style lang="less">
.addTextR{
   
}
</style>
<template>
<div class="addTextR">
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="103">
        <FormItem label="文本内容:" prop="content">
            <Input v-model="formValidate.content" :maxlength="20000" :disabled="noEdit" type="textarea" :rows="4"  style="width:300px;" placeholder="请输入" />
        </FormItem>
        <div style="margin-bottom:10px;">
            <companys-checkbox  
                warning="(其他分公司可见，即其他分公司微信公众号也可查看引用本文本内容)"
                :nameStyle="{'padding': '0 0 10px 0','width': '100px','text-align':'right' }" 
                ref="companysCheckbox" 
                :disabled="noEdit" 
                @checkComany="checkComany" 
                :hasChecked="officeIdList">
            </companys-checkbox>
        </div>
        <FormItem>
            <Button type="primary" @click="handleSubmit" v-if="!noEdit" style="width:76px;height:36px;margin-right:20px;">确定</Button>
            <Button type="primary" @click="back" style="width:76px;height:36px;">返回</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
    import { mapState, mapGetters, mapMutations} from 'vuex'
    import valid, { errors, common, sys, wpMaterialText} from "../../libs/request";
    import companysCheckbox from '../../modules/companysCheckbox.vue';
    export default {
        data () {
            return {
                officeIdList:[],
                formValidate:{
                    content:''
                },
                ruleValidate: {
					content: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}]
                },
                noEdit: false
            }
        },
        components: {
            companysCheckbox
        },
        mounted(){
            if(this.$route.query.id){
                this.loadDetail(this.$route.query.id)
            }
            if(this.$route.query.noEdit){
                if(typeof(this.$route.query.noEdit) == 'string'){
                    this.noEdit = (this.$route.query.noEdit == 'false' ? false : true)
                } else {
                    this.noEdit = this.$route.query.noEdit
                }
            }
        },
        beforeRouteEnter (to, from, next) {
            if(to.query.id){
                to.meta.title = "编辑文本素材"
            }
            next()
        },
		methods: {
            ...mapMutations(["updateLoadingStatus"]),
            loadDetail(id){
                this.updateLoadingStatus({isLoading:true});
                let data = {
                    id
                }
                wpMaterialText.form(data).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let result = res.data.data
                        this.formValidate.content = result.content
                        this.formValidate.code = result.code
                        this.officeIdList = result.officeIdList
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            checkComany(data){
                this.officeIdList = data
            },
            back(){
                this.$router.push({
                    name:'market.resource',
                    query:{
                        type: '5'
                    }
                })
            },
            handleSubmit () {
                this.updateLoadingStatus({isLoading:true});
                if(this.$refs.companysCheckbox.showCheckboxGroup && !this.officeIdList.length) {
                    this.updateLoadingStatus({isLoading:false});
                    this.$Message.error('您已选择分校可见，但未指定分校')
                    return false
                }
                this.$refs.formValidate.validate((validRes) => {
                    if (validRes) {
                        let data = {
                            content: this.formValidate.content,
                            officeIdList: this.officeIdList
                        }
                        if(this.$route.query.id){
                            data.id = this.$route.query.id
                            data.code = this.formValidate.code
                        }
                        wpMaterialText.save(data).then(valid.call(this)).then(res => {
                            if(res.ok) {
                                this.back()
                            }
                        }).catch(errors.call(this)).finally(() => {
                            this.updateLoadingStatus({isLoading:false});
                        });
                    } else {
                        this.updateLoadingStatus({isLoading:false});
                    }
                })
            },
        },
    }
</script>