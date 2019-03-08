<style lang="less">
.protocol_content{
	padding-top:6px;
	.table{
		text-align: center;
		/*border: 1px #dddee1 solid;*/
		background: #dddee1;
		line-height: 32px;
		td{
			background: #FFFFFF;
		}
		th{
			background: #f7f7f7;
		}
	}
}
</style>

<template>
	<div class="protocol_content">
		<!--<FormItem label="" label-width="1">-->
			<div v-html="tpl">
			</div>
		<!--</FormItem>-->

	</div>
</template>
<script>
	import { replace, digitUppercase } from '../../../../libs/util.js';
	export default {
		props: {
			data: {
				type: Object,
				required: true,
			},
			info: { // 主合同信息
				type: Object,
				required: true,
			},
			policy: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {

			};
		},
		computed: {
			tpl() {
				let v='';let tr='';let th='';
				this.policy.list.forEach((items, index) => {
					const item = this.data.htItemList.find(item => item.id == items.itemId);
					if(!item) {
						return this.data.protocal;
					}
					const textObj = this.data.protocal ? this.data.protocal : items.protocalText;
					let text='';
					let obj={};
					if(textObj){
						obj=JSON.parse(textObj||'{}');
					}
					if(item.htItemSettingMap.ApplyType==1){
						text=obj.mb;
					}else{
						text=obj.my;
					}
					//	            let total = digitUppercase(this.info.price);
					//	            let money = digitUppercase(Math.round(this.info.price*r));
					let name = item.name;
//					let num = items.giftCount;
//					items.itemSubId = item.htItemSubList[0].id;
//					items.itemSubName = item.htItemSubList[0].name;
					let costPrice = items.costPrice;
					let publicPrice = items.publicPrice;
					let ratio = items.ratio;
//					v = replace(text, ['$1$', this.data.name], ['$2$', name], ['$3$', num], ['$4$', Number(publicPrice||0).toFixed(2)], ['$5$', ratio/100], ['$6$', Number(costPrice||0).toFixed(2)]);
					v = replace(text, ['$1$', this.data.name], ['$2$', name], ['$3$', (item.htItemSettingMap.ServeLimit||'N/A')+'-'+(item.htItemSettingMap.ServeLimitEnd||'N/A')], ['$4$', Number(publicPrice||0).toFixed(2)],['$5$', ratio/100], ['$6$', Number(costPrice||0).toFixed(2)]);
					if(this.parseDom(v)[0].tagName=="TABLE"){
						th = this.parseDom(v)[0].childNodes[0].childNodes[0].outerHTML;
						tr += this.parseDom(v)[0].childNodes[0].childNodes[1].outerHTML;
					}
				})
				if(th){
					v='<table class="table" border="0" width="100%" cellpadding="0" cellspacing="1"><tbody>'+ th+tr +'</tbody></table>';
				}
				
				this.policy.list.forEach((items, index) => {
					items.protocalText = v;
				});
				return v;
			}
		},
		created(){
		},
		methods: {
			parseDom(arg) {
				let objE = document.createElement("div");
				objE.innerHTML = arg;
				return objE.childNodes;
			},
			setData() {},
			validForm() {
				return Promise.resolve(true);
			}
		},
		watch: {
			tpl(v) {
				this.policy.list.forEach((items, index) => {
					items.protocalText = v;
				});
			}
		}
	}
</script>