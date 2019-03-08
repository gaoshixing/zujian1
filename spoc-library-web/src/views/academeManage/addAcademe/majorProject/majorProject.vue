<style lang="less">
  .lib_addAcademe_step3{
    .search{
      width:200px; 
      input{
        background-color: #fff;
      }
    }
    .bt1{
      width: 80px;
    }
    td.majorName{
      color: #44bcb7;
      cursor: pointer;
    }
    .save{
      text-align: center;
      margin-top: 50px;
      button{
        padding-left: 35px;
        padding-right: 35px;
      }
    }
    .ivu-table th{
      background-color: #f7f7f7;
    }
  }
</style>

<template>
  <div class="lib_addAcademe_step3">
    <v-title title="学院专业项目">
      <Input :disabled="$route.query.edit==1" icon="search" placeholder="请输入专业名称" @on-click="onSearch" @on-enter="onSearch" v-model="searchText" class="search">
      </Input>
      <v-btn-options slot="right" :btns="btns"></v-btn-options>
    </v-title>
    <Table size="large" :columns="programColumn" :data="majorList" @on-selection-change="onTableItemSelect"></Table>
    <div class="page">
      <Page show-elevator show-total show-sizer :current="majorList.pageNo" :total="majorList.count" @on-page-size-change="onPageSizeChange" @on-change="onPageChange" v-if="majorList.pageCount>10"></Page>
    </div>
    <div class="save">
    <Button type="primary" @click="save">预览</Button>
    </div>
      <Modal
        v-model="modal1"
        @on-ok="delMajor"
        title="提示"
      >
        <p>确认删除吗？</p>
    </Modal>
  </div>
</template>
<script>
import vTitle from "@public/modules/vTitle";
import vBtnOptions from "../../../../modules/vBtnOptions";
import valid,{errors, fillAcademeMajor,SchoolMajor } from "../../../../libs/request";
import { mapMutations } from "vuex";
export default {
  name:'addAcadmeStep3',
  data () {
    return {
      searchText:'',
      btns:[
        {class:'bt1',text:'删除',btnClick:this.delMajorConfirm},
        {class:'bt2',text:'导入专业',btnClick:this.import},
        {class:'bt3',text:'添加专业',btnClick:this.add}
      ], 
      selectedItemIds:'',
      programColumn: [
         {
             type: 'selection',
             width: 60,
             align: 'center'
         },
         {
            title:'专业',
            align: 'center',
            key:'name',
            className:'majorName',
            render: (h,params)=>{
              return h('div',{
                on:{
                  click:()=>{
                    this.jumpMajorInfo(params)
                  }
                }
              },params.row.name)
            }
         },
         {
             title: "排名",
             key: "majorRank",
             align: 'center',
         },
         {         
            title: "学位类型",
            key: "levelType",
            align: 'center',
         },
         {
            title: "项目链接",
            key: "majorLink",
            align: 'center',
            render:(h,params)=>{
              return h('div',{
                
              },params.row.majorLink?params.row.majorLink:'/')
            }
         }, 
         {
             title: "Program Concentration",
             key: "majorBranchLink",
             align: 'center',
             render:(h,params)=>{
              return h('div',{
                
              },params.row.majorBranchLink?params.row.majorBranchLink:'/')
            }
         }, 
         {
             title: "操作",
             align: 'center',
             render:(h,params)=>{
               return h('div',{
                 style:{
                   display:'flex',
                   justifyContent: 'center',
                   color: '#44bcb7'
                 }
               },[
                  h('div',{
                    style:{
                    cursor:'pointer',
                    paddingLeft:'10px',
                    paddingRight:'10px',
                    },
                    on:{
                      click:()=>{
                        this.edit(params)
                      }
                    }
                  },'编辑'),
                  h('div',{
                    style:{
                    cursor:'pointer',
                     paddingLeft:'10px',
                    paddingRight:'10px',
                    },
                    on:{
                      click:()=>{
                        this.copy(params)
                      }
                    }  
                  },'复制')
               ])
             }
         }
      ],
      listParams:{
        gradeschoolId: this.$route.query.schoolId,
        name:'',
        pageNo:'1',
        pageSize:'10',
      },
      majorList:[],
      modal1:false,
    }
  },
  components: {
    vTitle,
    vBtnOptions
  },
  created () {
    this.fetchAcademeMajor();
  },
  methods: {
    ...mapMutations(['updateLoadingStatus']),
    onSearch(){
        this.listParams.pageNo = 1;
        this.listParams.cnName = this.searchText;
         this.fetchAcademeMajor();
    },
    onTableItemSelect(selItem){
      this.selectedItemIds = selItem;
    },
    delMajorConfirm(){
      if(!this.selectedItemIds[0]){
        this.$Message.info('请过勾选要删除的专业');
        return;
      }else{
        this.modal1=true;
      } 
    },
    // 删除专业
    delMajor(){
      this.updateLoadingStatus({ isLoading: true});
        SchoolMajor.deleteSsGradeschool(this.selectedItemIds.map(v=>{return v.id})).then(valid.call(this)).then(res => {
          if (res.ok) {
              this.fetchAcademeMajor();
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          this.updateLoadingStatus({ isLoading: false });
      });
    },
    import(){
      this.$router.push({name:'library.import',query:{t:2}});
    },
    add(){
       this.$router.push({name:'library.academeAddMajor',params:{processStep:2},query:{schoolId:this.$route.query.schoolId}})
    },
    edit(params){
      this.$listeners['update:currentTitle'](1);
      this.$router.push({name:'library.academeAddMajor',query:{majorId:params.row.id,schoolId:this.$route.query.schoolId},params:{currentTitle:1,processStep:2}})
      this.$parent.stepList = [{label:'基本信息'},{label:'专业项目'},{label:'U.S.News'}]
      this.$parent.hintTitContent = '带tu标识的项，表示内容来自US.News，由系统自动填写，建议审核填写是否正确！'
      this.$parent.stepTips = '三'
    },
    copy(params){
      this.schoolMajorCopy(params.row.id)
    },
    save(){
      if(this.$route.params.currentTitle == 1){
        this.$router.push({name:'library.editAcademeUSNews',params:{processStep:3}})
      }else{
        this.$router.push({name:'library.academeManage'})
      }
    },
    jumpMajorInfo(params){
     this.$router.push({name:'library.graduateProgramInfo',query:{majorId:params.row.id}})
    },
    // 获取专业表
    fetchAcademeMajor(){
       this.updateLoadingStatus({ isLoading: true});
        SchoolMajor.fetchAcademeMajor(this.listParams).then(valid.call(this)).then(res => {
          if (res.ok) {
            console.log(res.data.data);

            this.majorList=res.data.data.list;
            console.log(this.majorList);
            
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          this.updateLoadingStatus({ isLoading: false });
      });
    },
    //分页
    onPageChange(page){
      this.listParams.pageNo = page;
      this.fetchAcademeMajor();
    },
   onPageSizeChange(pageSize){
      this.listParams.pageSize = pageSize;
      this.fetchAcademeMajor();
   },
  //  复制专业
  schoolMajorCopy(id){
     this.updateLoadingStatus({ isLoading: true});
        SchoolMajor.schoolMajorCopy(id).then(valid.call(this)).then(res => {
          if (res.ok) {
            this.fetchAcademeMajor(this.listParams)
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          this.updateLoadingStatus({ isLoading: false });
      });
  }
       
  },
}
</script>
