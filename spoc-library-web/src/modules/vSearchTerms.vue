<style lang="less">
    .v_search_terms{
        .keywords_list{
            display: flex;
            flex-wrap:wrap;
            align-items: center;
            .keyword{
                border: 1px solid #e0e0e0;
                padding: 3px 9px;
                margin-right: 10px;
                margin-bottom: 10px;
                span{
                    margin-right: 10px;
                }
            }
            .itemLabel{
                padding: 3px 9px;   
                margin-right: 10px;
                margin-bottom: 10px;
            }
            margin-bottom: 30px;
        }
    }
</style>
<template>
    <div class="v_search_terms">
        <div class="keywords_list">
            <div class="itemLabel">检索项目：</div>
            <div v-if="!(item.key =='country')" class="keyword" v-for="(item,index) in searchItemsArry" :key="index">
                <span class="word">{{item.label}}</span>
                <span v-if="!(item.key =='country')">{{item.value}}</span>
                <Icon style="cursor:pointer;" type="close" v-if="!(item.key =='country')" @click.native="del(index)"></Icon>
            </div>
        </div>
    </div>
</template>
<script>
let mapA = [
    { k: 'country', v: '美国' },
    {k:'applyDegree',v:'申请学位：'},
    {k:'schoolRanking',v:'U.S.News学校排名：'},
    {k:'majorRanking',v:'U.S.News学院排名：'},
    {k:'policy',v:'考试政策：'},
    {k:'toeflScore',v:'托福最低分：'},
    {k:'ieltsScore',v:'雅思最低分：'},
    {k:'cityType',v:'城市类型：'},
    {k:'gradeSchoolTypes',v:'学院类型：'},
    {k:'gradeSchoolDegree',v:'招生学位：'},
    {k:'region',v:'地区：'},
    {k:'state',v:'州：'},
    {k:'nature',v:'办学性质：'},
    {k:'schoolType',v:'学校类型：'},
    {k:'schoolRankingType',v:'排名类型：'},
    {k:'batch',v:'申请批次：'},
    {k:'tuition',v:'学费/年（$）：'},
    {k:'isBusiness',v:'是否有本科商学院：'},
    {k:'isEngineering',v:'是否有本科工程学院：'},
    {k:'isScholarships',v:'国际生是否可申请奖学金：'},
    {k:'isFinancialaid',v:'国际生是否可申请助学金：'},

]
export default {
    name:'vSearchTerms',
    props: ['mapDict','searchItems','regionName','stateName'],
    data () {
        return {
        //   ditData:this.associateDitData,
          data:[],
        }
    },
    computed: {
        searchItemsArry(){
            let arr = [];
            let arrRanking = [];
            // let obj = Object.assign({},this.searchItems)
            for (const key in this.queryObj) {
                if (this.queryObj.hasOwnProperty(key)) {
                    const element = this.queryObj[key];
                    if (element) {
                        mapA.forEach(v => {
                            if (v.k == key) {
                                arr.push({ label: v.v, key: key, value: element })
                            }
                            if (key.includes(v.k) && !key.endsWith(v.k)) {
                                arrRanking.push({ label: v.v, key: key, value: element })
                            }
                        })
                    }
                }
            }


            console.log('arr',arr);
            console.log('arrRanking',arrRanking)
            //合并start和stop
            let mergeArr = [];
            // let midObj = {}
            arrRanking.forEach(element => {
                console.log('element', element);

                // if (midObj[element.label]) {
                //     if (element.key.includes('start')) {
                //         midObj[element.value] = element.value + '-' + midObj[element.value]
                //     } else {
                //         midObj[element.value] = midObj[element.value] + '-' + element.value
                //     }
                // } else {
                //     midObj.label = element.label;
                //     if (element.key.includes('start')) {
                //         midObj[element.value] = element.value + '-' + midObj[element.value]
                //     } else {
                //         midObj[element.value] = midObj[element.value] + '-' + element.value
                //     }
                // }
                if(element.key.includes('Start')){
                let stopKey=  element.key.replace('Start','Stop');
                let mergeObj = { label: element.label, key:element.key, value: element.value };
                    arrRanking.forEach(element=>{
                    if(element.key == stopKey){
                        mergeObj.value +='-'+element.value; 
                        mergeObj.key +=','+element.key; 
                        // console.log(mergeObj);
                        mergeArr.push(mergeObj)
                    } 
                    })
                
                }
                
            });
            // let midObjArr = Object.entries(midObj);
            // midObjArr.forEach(v => {
            //     console.log('vvvvvvvvvvvvvvvv', v);

            //     mergeArr.push({ v })
            // })

            // console.log('midObjmidObjmidObjmidObjmidObj', midObj);
            // console.log('==========', mergeArr);
            // console.log(arr);
            mergeArr = [...mergeArr, ...arr]
            mergeArr.forEach(v=>{ 
                if(v.key =='region'){
                    v.value = this.regionName;
                }
                if(v.key =='state'){
                    v.value = this.stateName;
                }

                if(v.key =='isBusiness'||v.key =='isEngineering'||v.key =='isScholarships'||v.key =='isFinancialaid'){
                    if(v.value==1){
                        v.value='是';
                    } else{
                        v.value='否';
                    }
                }
       
               
                this.convertLabel('nature',v,'ss_school_nature');
                this.convertLabel('applyDegree',v,'ss_school_major_level_type');
                this.convertLabel('schoolType',v,'ss_school_school_type');
                this.convertLabel('gradeSchoolDegree',v,'ss_school_degree');
                this.convertLabel('schoolRankingType',v,'ss_rank_type');
                
            })  

            // console.log(mergeArr);
            return mergeArr;
        },
        queryObj(){
            return this.searchItems;
        }
    },
    methods: {
        del(index) {
            let obj = Object.assign({},this.queryObj)
            let deleteKey = this.searchItemsArry[index].key;

            
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if(deleteKey.includes(key)){
                        delete obj[key];
                    }                            
                }
            }    
            // console.log('=========122222========',this.queryObj);
            

            this.$emit('reSearch',obj)



            // this.mergeArr.forEach(v=>{
            //     this.queryObj
            // })
            
            // let queryObj = {};
            // this.mergeArr.forEach(v => {
            //     queryObj[v.key] = v.value
            // })
            // console.log(queryObj);

        },
        //转化显示的lable为中文
        convertLabel(covertkey,v,mapDictName){
             if(v.key==covertkey){
                let resString='';
                v.value.split(',').forEach(value=>{
                    this.mapDict[mapDictName].forEach((item)=>{
                        for (const key in item) {
                            if(item[key] == value){
                                resString += ','+item.label;
                            }
                        }
                    })
                }) 
                v.value = resString.substring(1);
            }
        }
    },
    updated () {
        console.log('SDADADAADADA',this.searchItems);
        
    }
}
</script>
