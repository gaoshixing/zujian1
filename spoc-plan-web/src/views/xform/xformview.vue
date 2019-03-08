<style lang="less">
.xform-view{
    .xel-item{
        margin: 0;
    }
}
</style>
<template>
    <div class="xform-view">
        <xform ref="xform" @on-change="onChange" @willchange="willchange" :pid="pid" :paddingx="paddingx" :viewmode="viewmode" :groupId="groupId" :xdata="data.layout" :xsetting="data.settings" />
    </div>
</template>
<script>
import valid , { errors , common, xxStudent } from '../../libs/request'
import xform from './components/xform'
import { TYPES } from './components/config';
import adapter from './components/adapter.js';

export default {
    props:{
        hasToken:{ //可选。选校申请表单。获取表单数据接口有区别 {token: "",redisKey:""}
            type:Object,
            default:()=>{
            	return {}
            }
        },
        pid:{ // 可选 ID前缀
            type:String,
            default:''
        },
		groupId:{
			type:[Number,String],
			default:'',
		},
        fid:{ // 动态表单的ID,（表单配置等）
            type:[Number,String],
            required:true
        },
        uid:{
            type:[Number,String], // 关联ID,(任务ID，回填数据)
            required:false
        },
        studentId:{
            type:[Number,String], // 学生Id
            required:false
        },
        initId:{ // 初始化时使用的ID
            type:[Number,String],
            required:false,
        },
        viewmode:{ // 只读模式
            type:Boolean,
            default:false
        },
        preview:{ // 预览模式
            type:Object,
            default:()=>{
            	return {}
            }
        },
        paddingx:{
			type:Number,
			default:0,
		},
        
    },
    data(){
        return {
            data:{
                layout:[],
                settings:{}
            }
        }
    },
    components:{
        xform
    },
    created(){
        // console.log(this.studentId)
        if(this.preview.id){
            this.parseSetData(this.preview);
        } else {
            this.reload();
        }
    },
    methods:{
        reload(){
            this.getInitData(this.fid,this.uid);
        },
        getInitData(fid,uid){
            if(fid && uid){
                Promise.all([new Promise((r,j)=>{
                    this.getXFormData(fid).then(r).catch(j);
                }),new Promise((r,j)=>{
                    this.getFormSavedData(fid,uid).then(r).catch(j);
                })]).then(res=>{
                    this.restore(res[1]);
                }).catch(errors.call(this));
            } else {
                this.getXFormData(fid);
            }
		},
        getXFormData(fid){
            if(this.hasToken.token) {
                return common.viewFormToken({
                    id:fid,
                    redisKey: this.hasToken.redisKey,
                    token: this.hasToken.token
                }).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        const r = res.data.data;
                        r.layout.forEach(item=>{
                            item.visible = true;
                        });
                        this.parseSetData(r);
                        if(this.initId){
                            this.getId(this.initId,this.data,this.groupId);
                            // this.getInitUnionData(this.initId,this.data);
                        }
                        return this.data;
                    }
                    return {};
                }).catch(errors.call(this));

            } else {
                return common.viewForm(fid).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        const r = res.data.data;
                        r.layout.forEach(item=>{
                            item.visible = true;
                        });
                        this.parseSetData(r);
                        if(this.initId){
                            this.getId(this.initId,this.data,this.groupId);
                        }
                        return this.data;
                    }
                    return {};
                }).catch(errors.call(this));
            }
        },
        getId(tableId, data, groupId) {
            return common.getDataId({groupId: groupId, tableId: this.fid}).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        if(res.data.data) {
                            // 有id
                            let { category,module } = data.settings;
                            let api = `/${module}/a/ws/common/comFormTable/viewFormData`;
                            adapter.getInitData(api,res.data.data).then(res=>{
                                console.info(res);
                                let r = res.data.data;
                                this.data.layout.forEach(item=>{
                                    if(typeof r[item.name] !='undefined'){
                                        item.value = r[item.name];
                                    }
                                });
                            });
                        }else{
                            this.getInitUnionData(tableId, data);
                        }
                    }
                    return {};
                }).catch(errors.call(this));
        },
        getFormSavedData(fid,uid){
            if(this.hasToken.token) {
                return common.viewFormDataToken(
                    {
                        id:uid,
                        redisKey: this.hasToken.redisKey,
                        token: this.hasToken.token
                    }).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        return res.data.data?res.data.data.data:{};
                    }
                    return {};
                }).catch(errors.call(this));
            } else {
                // return common.getDataId({groupId: this.groupId, tableId: fid}).then(valid.call(this)).then(res=>{
                //     if(res.ok){
                //         if(res.data.data) {
                //             // 有id
                //             return common.viewFormData(res.data.data).then(valid.call(this)).then(res=>{
                //                 if(res.ok){
                //                     return res.data.data?res.data.data.data:{};
                //                 }
                //                 return {};
                //             }).catch(errors.call(this));
                //         }else{
                //             return xxStudent.getFormData({id: this.studentId}).then(valid.call(this)).then(res=>{
                //                 if(res.ok){
                //                     return res.data.data?res.data.data:{};
                //                 }
                //                 return {};
                //             }).catch(errors.call(this));
                //         }
                //     }
                //     return {};
                // }).catch(errors.call(this));
                return common.viewFormData(uid).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        return res.data.data?res.data.data.data:{};
                    }
                    return {};
                }).catch(errors.call(this));
            }
        },
        getInitUnionData(id,xform){ // 初始化数据
            const { category,module } = xform.settings;
            const api = `/${module}/${category.replace('describe','getFormData')}`;
            adapter.getInitData(api,id).then(res=>{
                console.info(res);
                const r = res.data;
                this.data.layout.forEach(item=>{
                    if(typeof r[item.name] !='undefined'){
                        item.value = r[item.name];
                    }
                });
            });
        },
        saveFormData(data){ // 上报数据,供外部调用,或自动调用
            const { category,module } = this.data.settings;
            const api = `/${module}/${category.replace('describe','saveFormData')}`;
            if(!data){
                data = this.getData();
            }
            const d = Object.assign({},data,{id:this.studentId}); // 上报需要initId(studentId)
            console.log(d)
            return adapter.saveFormData(api,d).then(res=>{
                res.ok = true;
                return res;
            });
        },
        onChange(el,index){
            this.$emit('on-change',el,index);
        },
        valid(){
            return this.$refs.xform.valid();
        },
        getData(){
            return this.$refs.xform.getData();
        },
        save(updata){ // 传入true 自动执行上报数据
            const id=this.uid;
            const data = this.getData();
            if(this.hasToken.token) {
                return common.saveFormDataToken({
                        id,
                        data,
                        redisKey: this.hasToken.redisKey,
                        token: this.hasToken.token
                    }).then(valid.call(this)).then(res=>{ // 保存成功
                        if(updata){
                            return this.saveFormData(data);
                        }
                        return res;
                    }).catch(errors.call(this));
            } else {
                data.id = this.studentId;
                return common.saveFormData({id,data}).then(valid.call(this)).then(res=>{ // 保存成功
                    if(updata){
                        return this.saveFormData(data);
                    }
                    return res;
                }).catch(errors.call(this));
            }
        },
        restore(data){
            if(data){
                this.data.layout.forEach(item=>{
                    const name = item.name;
                    if(typeof data[name] !='undefined'){
                        item.value = data[name];
                    }
                });
            }
        },
        willchange(v,item){ // xel -> xform -> xformview , v：选中的项目，item：el的所有配置
            setTimeout(()=>{
                this.rePaint();
            },0);
        },
        getOtherExcept(union,value){
            const ids = [];
            Object.keys(union).forEach(v=>{
                if(v!=value){
                    const ar = union[v]||[];
                    ids.push(...ar);
                }
            });
            return ids;
        },
        changeVisible(arr,vis){
            arr.forEach(id=>{
                const item = this.data.layout.find(i=>i.id==id);
                if(item){
                    item.visible = vis;
                    if([TYPES.RADIO,TYPES.SELECT].includes(item.model) && item.settings.union){
                        if(vis===false){ // 如果一个元素被关联时置为隐藏，则关于此元素的子关联选项也全部设置为隐藏
                            const ids = this.getUnionAllIds(item.settings.union);
                            this.$nextTick(()=>{ // 重要：doPaint函数完成计算所有状态后，才能设置子关联选项隐藏
                                this.changeVisible(ids,vis);
                            });
                        }
                    }
                }
            });
        },
        parseSetData(res){ // parse and set init data
			let { layout , settings } = res;
			if(!layout){
				layout = [];
			}
			if(!settings){
				settings = {};
            }
           
			this.data.layout = layout;
			this.data.settings = settings;
			this.rePaint();
        },
        rePaint(){
            const okids = [];
            this.data.layout.forEach(item=>{
                if([TYPES.RADIO,TYPES.SELECT].includes(item.model)){
                    this.doPaint(item.value,item,okids);
                }
            });
        },
        doPaint(value,item,ids){
            const { id , settings } = item;
            const union = settings?settings.union:null;
            if(union){ // 此组件有关联配置配置
                const t = union[value] || [];
                const other = this.getOtherExcept(union,value); // 取得同级其他项
                this.changeVisible(t,true);
                this.pushIDs(ids,t);
                const otherIDs = this.cleanID(ids,other);
                this.changeVisible(otherIDs,false);
                // 如果选中的是此项，则将此项内部含有的设置为显示，同级的隐藏
            }

        },
        cleanID(ids,id){ // 返回id数组里不在ids中的元素
            return id.filter(i=>{
                if(ids.includes(i)){
                    return false
                }
                return true;
            });
        },
        pushIDs(ids,id){
            id.forEach(i=>{
                if(!ids.includes(i)){
                    ids.push(i)
                }
            });
        },
        getUnionAllIds(union){
            const ids =[];
            Object.keys(union).forEach(k=>{
                ids.push(...union[k]);
            });
            return Array.from(ids);
        }
    }

}
</script>


