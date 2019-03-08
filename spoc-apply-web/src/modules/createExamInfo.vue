<style lang="less">
</style>
<template>
	<div>
		<Modal v-model="showViewExam" width=940 title="查看申请系统及账号/密码" ok-text="确认" @on-ok="ok(4)" @on-cancel="cancel()">
			<div>
				<div>
					<p style="line-height:48px;display:inline-block;width:400px;"><span style="display:inline-block;color:#999999;text-align:right;width:74px;padding-right:14px;">学生</span><span>{{studentName}}</span></p>
					<p style="line-height:48px;display:inline-block;width:191px;"><span style="display:inline-block;color:#999999;text-align:right;width:74px;padding-right:14px;">申请邮箱号</span><span style="color:#44bcb7;">qwe@163.com</span></p>
					<p style="line-height:48px;display:inline-block;width:204px;"><span style="display:inline-block;color:#999999;text-align:right;width:74px;padding-right:14px;">邮箱密码</span><span>asdasdas</span></p>
				</div>
				<div>
					<p style="margin-bottom:20px;">标化考试账号/密码</p>
				</div>
				<div v-for="(item, index) in examLists" :key="'examList_'+ index">
					<div style="overflow:hidden;margin-bottom:20px;" v-show="!item.isEdit">
						<div style="float:left;overflow:hidden;width:142px;margin-left:16px;padding-right:40px;">
							<div style="float:left;color:#999999;margin-right:10px;">考试名称</div>
							<div style="float:left;width:40px;word-wrap:break-word;">{{item.sys}}</div>
						</div>
						<div style="float:left;overflow:hidden;width:282px;padding-right:40px;">
							<div style="float:left;color:#999999;margin-right:10px;">注册网址</div>
							<div style="float:left;width:180px;word-wrap:break-word;color:#44bcb7;">{{item.queryUrl}}</div>
						</div>
						<div style="float:left;overflow:hidden;width:194px;padding-right:40px;">
							<div style="float:left;color:#999999;margin-right:10px;">账号</div>
							<div style="float:left;width:120px;word-wrap:break-word;">{{item.queryAccount}}</div>
						</div>
						<div style="float:left;overflow:hidden;width:194px;padding-right:40px;">
							<div style="float:left;color:#999999;margin-right:10px;">密码</div>
							<div style="float:left;width:120px;word-wrap:break-word;">{{item.queryPwd}}</div>
						</div>
						<div style="float:left;width:80px;">
							<span style="color:#44bcb7;margin-right:10px;cursor:pointer;" @click="editApplyBox(item)">[编辑]</span>
							<span style="color:#ff3333;cursor:pointer;" @click="deleteApplyBox(item.id)">[删除]</span>
						</div>
					</div>
					<div style="overflow:hidden;margin-bottom:20px;"  v-show="item.isEdit">
						<div style="float:left;overflow:hidden;width:142px;margin-left:16px;padding-right:40px;">
							<Select v-model="updataSys" placeholder="选择考试名称" style="width:102px;" >
								<Option v-for="item in examList" :value="item.value" :key="'toeflScore_' + item.value">{{ item.label }}</Option>
							</Select>   
						</div>
						<div style="float:left;overflow:hidden;width:282px;padding-right:40px;">
							<Input style="width:242px;" v-model="updataQueryUrl" placeholder="输入注册网址"></Input>
						</div>
						<div style="float:left;overflow:hidden;width:194px;padding-right:40px;">
							<Input style="width:154px;" v-model="updataQueryAccount" placeholder="输入账号"></Input>
						</div>
						<div style="float:left;overflow:hidden;width:194px;padding-right:40px;">
							<Input style="width:154px;" v-model="updataQueryPwd" placeholder="输入密码"></Input>
						</div>
						<div style="float:left;width:80px;">
							<span style="color:#44bcb7;margin-right:10px;cursor:pointer;" @click="updateApplyBox">[保存]</span>
							<span style="color:#ff3333;cursor:pointer;" @click="cancelApplyBox">[取消]</span>
						</div>
					</div>
				</div>
				<div style="overflow:hidden;margin-bottom:20px;">
					<div style="float:left;overflow:hidden;width:142px;margin-left:16px;padding-right:40px;">
						<Select v-model="newSys" placeholder="选择考试名称" style="width:102px;" >
							<Option v-for="item in examList" :value="item.value" :key="'newSys_' + item.value">{{ item.label }}</Option>
						</Select>   
					</div>
					<div style="float:left;overflow:hidden;width:282px;padding-right:40px;">
						<Input style="width:242px;" v-model="newQueryUrl" placeholder="输入注册网址"></Input>
					</div>
					<div style="float:left;overflow:hidden;width:194px;padding-right:40px;">
						<Input style="width:154px;" v-model="newQueryAccount" placeholder="输入账号"></Input>
					</div>
					<div style="float:left;overflow:hidden;width:194px;padding-right:40px;">
						<Input style="width:154px;" v-model="newQueryPwd" placeholder="输入密码"></Input>
					</div>
					<div style="float:left;width:80px;">
						<span style="color:#44bcb7;margin-right:10px;cursor:pointer;" @click="saveApplyBox">[保存]</span>
					</div>
				</div>
				<Table :data="modalTableDatas"  height="220" :columns="modalTableColumns">
				</Table>
			</div>
		</Modal>
	</div>
</template>
<script>
	import valid, {
		errors,
		aplSafebox
	} from "../libs/request";

	export default {
		props: {
			studentType: {
				type: String
			},
		/* 	showViewExam: {
				type: Boolean,
				default: false
			}, */
			groupId: {
				type: String
			},
            studentName:{
                type: String
            }
		},
		data() {
			return {
				showViewExam: false,
				updataId:'',//正在修改密码的ID
				isEditing: false,
				examLists:[],
				newSys: '',
				newQueryUrl: '',
				newQueryAccount: '',
				newQueryPwd: '',
				updataSys: '',
				updataQueryUrl: '',
				updataQueryAccount: '',
				updataQueryPwd: '',
				examList:[],
				modalTableDatas:[
				],
				modalTableColumns:[
					{
                        title: '申请学校',
						key: 'schoolName',
					},
					{
                        title: '专业项目',
						key: 'program',
					},
					{
                        title: '申请系统',
						key: 'sys',
						render: (h, params) => {
							return h('a',{
								style:{
									color:'#44bcb7'
								},
								on:{
									click: () => {
										/* const {href} = this.$router.resolve({
													name: 'docu.addStudent',
													query: {
														bar:1
													}
												}) */
										/* window.open(params.row.sysUrl , '_blank') */
										this.open(params.row.sysUrl)
									}
								}
							} ,[
								params.row.sys
							])
								
						}
					},
					{
                        title: '申请用户名',
						key: 'account',
					},
					{
                        title: '申请密码',
						key: 'accountPwd',
					},
					{
                        title: '申请结果查询网址',
						key: 'queryUrl',
						render: (h, params) => {
							return h('a',{
								style:{
									color:'#44bcb7'
								},
								on:{
									click: () => {
									/* 	const {href} = this.$router.resolve({
													name: 'foo',
													query: {
														bar:1
													}
												}) */
									/* 	window.open(params.row.queryUrl, '_blank') */
										this.open(params.row.queryUrl)
									}
								}
							} ,[
								params.row.queryUrl
							])
								
						}
					},
					{
                        title: '申请结果查询账号',
						key: 'queryAccount',
					},
					{
                        title: '申请结果查询密码',
						key: 'queryAccountPwd',
					},
				]
			}
		},
		components: {
		},
		mounted() {
		},
		methods: {
			updateApplyBox(){
				if(this.updataSys.trim() === '' && this.updataQueryUrl.trim() === '' && this.updataQueryAccount.trim() === '' && this.updataQueryPwd.trim() === ''){
					this.$Message.error('考试名称、注册网址、账号、密码不能都为空！');
					return 
				}
				let obj = {
					groupId: this.groupId,
					type:'exam',
					sys: this.updataSys.trim(),
					queryUrl: this.updataQueryUrl.trim(),
					queryAccount: this.updataQueryAccount.trim(),
					queryPwd: this.updataQueryPwd.trim(),
					id: this.updataId
				}
				aplSafebox.save(obj).then(valid.call(this))
				.then(res => {
					if(res.ok) {
						this.getExamList()
						this.updateReset()
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
			},
			cancelApplyBox(){
				for(let i = 0; i < this.examLists.length; i++){
					if(this.examLists[i].id == this.updataId){
						this.examLists[i].isEdit = false
						break;
					}
				}
				this.updateReset()
			},
			updateReset(){
				this.updataId = ''
				this.updataSys = ''
				this.updataQueryUrl = ''
				this.updataQueryAccount = ''
				this.updataQueryPwd = ''
				this.isEditing = false
			},
			deleteApplyBox(id){
				let obj = {
					id:id
				}
				aplSafebox.delete(obj).then(valid.call(this))
				.then(res => {
					if(res.ok) {
						this.isEditing = false
						this.getExamList()
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
			},
			editApplyBox(item){
				if(!this.isEditing){
					this.isEditing = true
					this.updataId = item.id
					this.updataSys = item.sys
					this.updataQueryUrl = item.queryUrl
					this.updataQueryAccount = item.queryAccount
					this.updataQueryPwd = item.queryPwd
					for(let i = 0; i < this.examLists.length; i++){
						if(this.examLists[i].id == item.id){
							this.examLists[i].isEdit = true
							break;
						}
					}
				} else {
					this.$Message.error('请先保存或取消编辑正在编辑的数据!');
				}
			},
			saveApplyBox(){
				if(this.isEditing){
					this.$Message.error('请先保存或取消编辑正在编辑的数据!');
					return
				}
				if(( typeof this.newSys == 'undefined' || this.newSys.trim() === '') && this.newQueryUrl.trim() === '' && this.newQueryAccount.trim() === '' && this.newQueryPwd.trim() === ''){
					this.$Message.error('考试名称、注册网址、账号、密码不能都为空！');
					return 
				}
				let obj = {
					groupId: this.groupId ,
					type:'exam',
					sys: this.newSys,
					queryUrl: this.newQueryUrl.trim(),
					queryAccount: this.newQueryAccount.trim(),
					queryPwd: this.newQueryPwd.trim(),
				}
				aplSafebox.save(obj).then(valid.call(this))
				.then(res => {
					if(res.ok) {
						this.newSys = ''
						this.newQueryUrl = ''
						this.newQueryAccount = ''
						this.newQueryPwd = ''
						this.isEditing = false
						this.getExamList()
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
			},
			//获取考试类别
			getExamTypeList(studentType){
                console.log("studentType ==" + studentType)
				if(studentType == 'HS' ){ //中学
					this.examList = [
						{value:'TOEFL', label:'TOEFL'},
						{value:'TOEFL Junior', label:'TOEFL Junior'},
						{value:'SSAT', label:'SSAT'},
					]
				} else if(studentType == 'UG'){ //本科
					this.examList = [
						{value:'TOEFL', label:'TOEFL'},
						{value:'SAT', label:'SAT'},
						{value:'ACT', label:'ACT'},
					]
				} else {// 研究生
					this.examList = [
						{value:'TOEFL', label:'TOEFL'},
						{value:'GRE', label:'GRE'},
						{value:'GMAT', label:'GMAT'},
						{value:'LSAT', label:'LSAT'},
					]
				}
			},
			ok() {
				//console.log('ok');
				//this.$emit('onclickCloseModal', false)
			},
			cancel() {
				//this.$emit('onclickCloseModal', false)
				//console.log('cancel');
			},
			getList(){
				let obj = {
					groupId: this.groupId 
				}
				aplSafebox.list(obj).then(valid.call(this))
				.then(res => {
					if(res.ok) {
						this.modalTableDatas =  res.data.data
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
			},
			getExamList(){
				let obj = {
					groupId: this.groupId ,
					type:'exam'
				}
				aplSafebox.examList(obj).then(valid.call(this))
				.then(res => {
					if(res.ok) {
						this.examLists =  res.data.data
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
			},
			open(url){
				if(url.indexOf('http')==0){
					window.open(url)
				} else {
					window.open("http://" + url)
				}
			}
		},
		watch: {
            showViewExam: function(newVal, oldVal){
                if(newVal){
					this.isEditing = false
                    this.getList()
                    this.getExamTypeList(this.studentType)
                    this.getExamList()
                }
            }
		}
	}
</script>