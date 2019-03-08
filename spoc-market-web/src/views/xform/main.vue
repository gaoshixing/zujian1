<style lang="less">
.x-form-design{
    display: flex;
    min-height: ~'calc(100vh - 105px)';
    width: 100%;
    margin: 0 auto;
    .x-main{
        height: ~'calc(100vh - 110px)';
        overflow-y: auto;
		flex: 5;
    }
    .x-right{
        flex: 2;
        height: ~'calc(100vh - 110px)';
        overflow-y: auto;
	}
	
}
.x-form-define{
	.xbtn-wrap{
		display: flex;
	}
	.btn-flex-wrap{
		flex: 5;
		position: relative;
		.ctl-btns{
			position: absolute;
			right: 0;
			display: inline-block;
			top: -56px;
			.xel-item{
				display: inline-block;
				margin: 10px;
			}
		}		
	}
	.btn-flex-none{
		flex: 2;
	}
	.preview-wrap{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(240,240,240,.8);
        z-index: 800;
        &-center{
            position: fixed;
            width: 320px;
            height: 568px;
            top: 50%;
            left: 50%;
            margin-top: -284px;
            margin-left: -160px;
            background-color: #fff;
            box-shadow: 0 2px 3px 0 rgba(146,146,146,.5);
            box-sizing: border-box;
            .m-header{
                position: relative;
                .close-btn{
                    position: absolute;
                    right: -28px;
                    top: -28px;
                    color: #888;
                    font-size: 28px;
                    cursor: pointer;
                    &:hover{
                        color: #444;
                    }
                }
            }
            .m-body{
				/*padding: 15px;*/
				height: 100%;
				overflow: auto;
                .two-col{
                    display: flex;
                    .fl{
                        flex: 2;
                        padding: 10px;
                    }
                    .fr{
                        flex: 4;
                        padding: 10px;
                    }
                    .f-t{
                        font-size: 14px;
                        margin: 5px 0;
                    }
                }
                .preview_phone{
                	width: 320px;
                	height: 568px;
                	overflow: hidden;
                	overflow-y: auto;    
                	/*background-color: #f0f2fa;*/
                	img{
                		width: 100%;
                		height: auto;
                	}
                	.preview_phone_main{
                		padding: 16px;
                	}
                }
            }
            
            .sbox{
                border: 1px solid #ddd;
                height: 400px;
                &.s-left-item{
                    .opitem{
                        padding: 10px 6px;
                        cursor: pointer;
                        &:hover,&.active{
                            background-color: #eee;
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="x-form-define">
		<div class="xbtn-wrap">
			<div class="btn-flex-wrap">
				<div class="ctl-btns">
					<xel v-for="item in btns" :key="item.key" :data="item"/>
				</div>
			</div>
			<div class="btn-flex-none"></div>
		</div>
		<div class="x-form-design">
			<div class="x-main">
				<fromdesign :data="data.layout" :xsetting="data.settings" :active="active.item" @on-active="onActive"></fromdesign>
			</div>
			<div class="x-right">
				<itemsetting ref="settings" :xform="data" :item="active.item" @on-click="onSettingsClick"  @on-change="onSettingsChange" ></itemsetting>
			</div>
		</div>


		<div class="preview-wrap" v-if="preview.visible">
			<div class="preview-wrap-center">
				<div class="m-header">
                    <Icon class="close-btn" @click.native.stop="preview.visible=false" type="android-close"></Icon>
                </div>
                <div class="m-body">
                	<div class="preview_phone">
	                	<img src="../../assets/images/viewDetailHead.png"/>
	                	<div class="preview_phone_main">
							<xformview pid="preview" :fid="data.id" :preview="preview.data"/>
	                	</div>
                	</div>
                </div>
			</div>
		</div>
		<unionset ref="union" :item="active.item" :xformlastdata="xformlastdata" @doset="updateUnion" />

    </div>
</template>
<script>

import xel from './components/xel';
import fromdesign from './views/formdesign';
import itemsetting from './views/itemsetting';
import { TYPES } from './components/config';
import { uuid, clone , deepEqual } from './libs/util'
import { formData , validLayout } from './libs/form'

import xformview from './xformview'
import unionset from './views/settings/unionset'
import valid,{ common,errors } from '../../libs/request'

export default {
    data(){
        return {
			data:{
				id:0,
				settings:{},
				layout:[],
			},
			btns:[],
            active:{
                item:{}
			},
			preview:{
				visible:false,
				data:{}
			}
        }
	},
	computed:{
		xformlastdata(){ // 当前项以后的所有
            let found = false;
            const ret = [];
            (this.data.layout||[]).forEach(item=>{
                if(found){
                    ret.push(item);
                } else {
                    found = item.id == this.active.item.id;
                }
            })
            return ret;
        }
	},
    components:{
        fromdesign,
		itemsetting,
		xel,
		xformview,
		unionset
    },
    created(){
		this.getInitData(this.$route.params.fid);
		this.btns = [
			{
				id:uuid(),
				model:TYPES.BUTTON,
				name:'预览',
				type:'success',
				color:'#44bcb7',
				value:this.doPreview
			},
			{
				id:uuid(),
				model:TYPES.BUTTON,
				name:'保存',
				type:'success',
				color:'#44bcb7',
				value:this.doSave
			},
		];
    },
    methods:{
		getCids(settings){
			let ids=[];
			Object.keys(settings).forEach(k=>{
				const item = settings[k];
				if(item){
					Object.keys(item).forEach(v=>{
						const vitem = item[v];
						if(vitem && vitem.checked){
							ids.push(...vitem.checked);
						}
					})
				}
			});
			return ids;
		},
		parseSetData(res){
			let { layout , settings } = res;
			if(!layout){
				layout = [];
			}
			if(!settings){
				settings = {module:0};
			}
			const cids = this.getCids(settings);
			layout.forEach(item=>{
				item.visible = !cids.includes(item.id);
			});
			this.data.layout = layout;
			this.data.settings = settings;
			this.doFirstFocus();
		},
		doFirstFocus(){
			const item = this.data.layout[0];
			if(item){
				this.onActive(item);
			}
		},
		getInitData(fid){
			this.getXFormData(fid);
			this.getFormDataSource(fid);
		},
		getXFormData(fid){
			common.viewForm(fid).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.data.id = fid;
					if(res.data.data){
						this.parseSetData(res.data.data);
					}
				}
			}).catch(errors.call(this));
		},
		getFormDataSource(fid){
			common.listFormDataSource(fid).then(valid.call(this)).then(res=>{
				if(res.ok){
					console.info(res.data);
				}
			}).catch(errors.call(this));
		},
		getFormDataSourceField(id){
			common.getFormDataSourceField(id).then(valid.call(this)).then(res=>{
				if(res.ok){
					console.info(res.data);
				}
			}).catch(errors.call(this));
		},
		saveXFormData(){ // check duplicate key and empty key
			const data = this.data;
			try{
				validLayout(data);
				data.settings.category = data.layout[0]?data.layout[0].settings.category:'';
				common.saveForm(data).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.$Message.success(res.data.message);
						this.$router.push({name:'market.infopath'})
					}
				}).catch(errors.call(this));
			}catch(e){
				console.log(e)
				this.$Message.error(e.toString());
			}
		},
        onActive(item){
            this.active.item=item;
        },
        onSettingsChange(el,index,flag){
            const [id,r,k] = el.id.split('@');
			const item = this.active.item;
			const len = Object.keys(el.settings&&el.settings.trigger?el.settings.trigger:{});
			const lvv = Object.keys(el.settings&&el.settings.values?el.settings.values:{});
			let bases={};
			let values={};
			if(len.length>0){ // 包含有触发器
				const v = el.settings.trigger[el.value];
				if(v){ // 所选值对应有触发器值
					bases = clone(v);
				} else { // 所选值对应无触发器值，执行fallback
					bases = el.settings.trigger.$fallback ? clone(el.settings.trigger.$fallback):{};
				}
			}
			if(lvv.length>0){ // 包含有同级附加值变动
				const v = el.settings.values[el.value];
				if(v){ // 所选值与附加值变动对应
					values = clone(v);
				} else { // 无对应，使用fallback
					values = el.settings.values.$fallback ? clone(el.settings.values.$fallback):{};
				}
			}
			if(k){ // 是三级修改，1. 合并触发器值， 2.应用三级修改值。
				const s = Object.assign({},item[r]||{},bases); // its order is important
				s[k]=el.value;
				console.log(flag)
				if(k=='category'&&flag=="tab2"){
					this.data.layout.forEach(item=>{
						item.settings[k]=el.value;
					});
				}else{
					item[r]=s;
				}
            } else { // 二级修改 , 同样需要合并触发器值，修改二级值
				const a = Object.assign({},item.settings||{},bases);
				if(!deepEqual(item.settings,a)){ // important to avoid update loop
					item.settings = a;
				}
				if(r.charAt(0)=='^'){ // 是一个顶级修改，直接修改全局setting,并修改每一个元素的module
					const mk = r.substr(1);
					this.data.settings[mk]=el.value;
					this.data.layout.forEach(item=>{
						item.settings[mk]=el.value;
					});
				} else { // 普通二级修改
					if(r=='display'){
						this.data.layout.forEach(item=>{
							item[r]=el.value;
						});
					}else{
						item[r]=el.value;
					}
				}
			}
			Object.keys(values).forEach(k=>{ // 应用附加值，附加值权重大
				item[k]=values[k];
			});
		},
		onSettingsClick({ev,item}){
			this.$refs.union.show();
		},
		doPreview(){
			this.preview.data = clone(this.data);
			this.preview.visible = true;
		},
		doPub(){

		},
		doSave(){
			this.saveXFormData();	
		},
		updateUnion(id,un){
			if(!this.active.item.settings){
				this.active.item.settings={};
			}
			this.active.item.settings.union=clone(un);
			this.doSave();
		}
        
    }
}
</script>


