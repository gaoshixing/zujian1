<style lang="less">
	.preview{
		font-size: 14px;
		width: 970px;
		height:100%;
		padding-bottom: 100px;
		margin: auto;
	    /*.pdfviewer{
	        border: none;
			height: 90vh;
			box-shadow: 1px 1px 15px #ddd;
		}*/
		.pdfBox{
			height: 1170px;
			overflow-y: auto;
			border: 6px solid #000;
			box-sizing: border-box;
		}
		.noPdf, .pdf-converting{
			height: 20vh;
			box-shadow: 1px 1px 15px #ddd;
			font-size: 20px;
			display: flex;
			justify-content: center;
			background: rgba(1, 1, 1, 0.4);
			.text{
				align-self: center;
				color: #fff;
			}
		}
	}
</style>

<template>
	<div class="preview">
		<div v-if="!noPdf">
			<!--<iframe class="pdfviewer" v-if="pdfurl" :src="pdfurl" width="100%" height="100vh"></iframe>-->
			
				<div ref="cpdf" v-if="pdfurl" class="pdfBox">
					<canvas v-for="n in page_count" class="canvasstyle" :id="'canvas'+n" :ref="'canvas'+n"></canvas>
				</div>
			<div class="pdf-converting" v-else>
				<p class="text">文件转码中，请稍后...</p>
			</div>
		</div>
		<div v-if="noPdf" class="noPdf">
			<p class="text">合同模板不存在！！！</p>
		</div>
	</div>
</template>

<script>
	import valid,{errors,common,contract,htContractTpl} from "../../../libs/request.js";
	import PDFJS from 'pdfjs-dist';
	let t;
	export default{
		data(){
			return{
				info:{},
				pdfInfo:{},
				noPdf:false,
				wid: 948, //刚进入页面中的pdf容器的宽度
				pdfDoc: null, //pdfjs 生成的对象
				pageNum: 1, //
				pageRendering: false,
				pageNumPending: null,
				scale: null, //放大倍数
				page_num: 0, //当前页数
				page_count: 0, //总页数
			}
		},
        computed:{
            pdfurl(){
				if(this.pdfInfo.status && this.pdfInfo.status=='1'){
	                return common.displayUrl(this.pdfInfo.id);
				}
			},
		},
		created(){
			let params={
				id:this.$route.query.id
			}
			htContractTpl.form(params).then(valid.call(this)).then(res => {
	    		if(res.ok){
					this.info = res.data.data;
					const ht = this.info.attachments.find(item=>item.type=='ht_contract_tpl_preview');
					if(ht){
						if(ht.status=='1'){
							this.pdfInfo = ht;
						} else{
							this.startPolling(ht.id);
						}
					}else{
						this.noPdf=true;
		                this.$Message.info({
		                    content: '合同模板不存在！！！',
		                    duration: 10,
		                    closable: true
		                });
					}
	    		}
			}).catch(errors.call(this));
		},
		beforeDestroy(){
			this.stopPolling();
		},
		methods:{
			startPolling(id){
				t = setInterval(()=>{
					common.convertForm(id).then(valid.call(this)).then(res=>{
						if(res.ok && res.data.data){
							this.pdfInfo = res.data.data;
							if(res.data.data.status=='1'){
								this.stopPolling();
							}
						}
					}).catch(errors.call(this));
				},5000);
			},
			stopPolling(){
				clearInterval(t);
			},
			renderPage(num) { //渲染pdf
				let vm = this
				this.pageRendering = true;
				let canvas = document.getElementById('canvas'+num); // Using promise to fetch the page
				vm.pdfDoc.getPage(num).then(function(page) {
					vm.scale = vm.wid / page.getViewport(1.0).width ;
					//vm.wid是在data中定义的一个变量，最初设置的pdf的宽度
					var viewport = page.getViewport(vm.scale);
					// var viewport = page.getViewport(vm.scale); //alert(vm.canvas.height)
					canvas.height = viewport.height;
					canvas.width = viewport.width; // Render PDF page into canvas context
					console.log(canvas)
					let ctx = canvas.getContext('2d');
					var renderContext = {
						canvasContext: ctx,
						viewport: viewport
					};
					var renderTask = page.render(renderContext); // Wait for rendering to finish
					renderTask.promise.then(function() {
						vm.pageRendering = false;
						if(vm.pageNumPending !== null) { // New page rendering is pending
							this.renderPage(vm.pageNumPending);
							vm.pageNumPending = null;
						}
					});
				});
				vm.page_num = vm.pageNum;
			},
		},
		watch: {
			pdfurl: {
				handler: function(val, oldVal) {
					if(val) {
						let that = this;
						PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min');
						PDFJS.getDocument(that.pdfurl).then((pdfDoc_) => { //初始化pdf
							that.pageNum = 1
							that.pdfDoc = pdfDoc_;
							that.page_count = that.pdfDoc.numPages;
							console.log(that.page_count,that.pdfDoc)
							that.$nextTick(()=>{
								for(let i=1;i<=that.page_count;i++){
									that.renderPage(i);
								}
							})
						});
					}
				},
				deep: true
			},
		}
	}
</script>
