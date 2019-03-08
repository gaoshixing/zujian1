<style lang="less" scoped>
.testDetail{
    float: left;
    width: 730px;
    min-height: 105px;
    margin-top:20px;
    .ivu-form-item{
        width:auto;
    }
}
</style>
<template>
<div class="">
    <div class="testDetail" v-if="['Elementaryschool','Highschool'].indexOf(item.type)>=0">
        <Form-item label="学校全称（中文）">
            <Input v-model="item.highSchool" style="width:200px"></Input>
        </Form-item>
        <Form-item label="学校全称（英文）">
            <Input v-model="item.highSchoolEn" style="width:200px"></Input>
        </Form-item>
        <Form-item label="毕业国家">
            <Select filterable v-model="item.country" style="width:200px" @on-change="onTreeCountryChange">
                <Option v-for="c in countryList" :key="c.name+c.id" :value="c.id">{{c.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="毕业省/直辖市">
            <Select v-model="item.province" style="width:200px" @on-change="onTreeProvinceChange">
                <Option v-for="c in provinceList" :key="c.name+c.id" :value="c.id">{{c.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="毕业城市"> 
            <Select v-model="item.city" style="width:200px">
                <Option v-for="c in cityList" :key="c.name+c.id" :value="c.id">{{c.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="入学时间（年/月）">
            <Input v-model="item.enterYear" style="width:200px"></Input>
        </Form-item>
        <Form-item label="毕业时间（年/月）">
            <Input v-model="item.graduationYear" style="width:200px"></Input>
        </Form-item>
        <Form-item label="课程体系">
            <Input v-model="item.course" style="width:200px"></Input>
        </Form-item>
        <Form-item label="总分或平均分（按实际分值填写）">
            <Input v-model="item.total" style="width:200px"></Input>
        </Form-item>
        <Form-item label="换算为GPA（分数/满分）">
            <Input v-model="item.gpa" style="width:200px"></Input>
        </Form-item>
        <Form-item label="年级排名（排名/总人数）">
            <Input v-model="item.rank" style="width:200px"></Input>
        </Form-item>
        <Form-item label="其他备注">
            <Input v-model="item.remarks" style="width:200px"></Input>
        </Form-item>
    </div>
    <div class="testDetail" v-else-if="item.type=='University'">
        <Form-item label="学校全称（中文）">
            <Input v-model="item.highSchool" style="width:200px"></Input>
        </Form-item>
        <Form-item label="学校全称（英文）">
            <Input v-model="item.highSchoolEn" style="width:200px"></Input>
        </Form-item>
        <Form-item label="毕业国家">
            <Select filterable v-model="item.country" style="width:200px"  @on-change="onTreeCountryChange">
                <Option v-for="c in countryList" :key="'country'+c.id" :value="c.id">{{c.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="毕业省/直辖市">
            <Select filterable v-model="item.province" style="width:200px" @on-change="onTreeProvinceChange">
                <Option v-for="c in provinceList" :key="'province'+c.id" :value="c.id">{{c.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="毕业城市">
            <Select filterable v-model="item.city" style="width:200px">
                <Option v-for="c in cityList" :key="'city'+c.id" :value="c.id">{{c.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="入学时间（年/月）">
            <Input v-model="item.enterYear" style="width:200px"></Input>
        </Form-item>
        <Form-item label="毕业时间（年/月）">
            <Input v-model="item.graduationYear" style="width:200px"></Input>
        </Form-item>
        <Form-item label="学位">
            <Select v-model="item.level" style="width:200px">
                <Option v-for="(i,index) in xxStudyInfoLevel" :key="index" :value="i.value">{{isEn?i.value:i.label}}</Option>
            </Select>
        </Form-item>
        <Form-item label="专业（Major）">
            <Input v-model="item.major" style="width:200px"></Input>
        </Form-item>
        <Form-item label="第二专业（Major）">
            <Input v-model="item.secondMajor" style="width:200px"></Input>
        </Form-item>
        <Form-item label="辅修专业（Minor）">
            <Input v-model="item.minorMajor" style="width:200px"></Input>
        </Form-item>
        <Form-item label="总分或平均分（按实际分值填写）">
            <Input v-model="item.total" style="width:200px"></Input>
        </Form-item>
        <Form-item label="换算为GPA（分数/满分）">
            <Input v-model="item.gpa" style="width:200px"></Input>
        </Form-item>
        <Form-item label="年级排名（排名/总人数）">
            <Input v-model="item.rank" style="width:200px"></Input>
        </Form-item>
        <Form-item label="其他备注">
            <Input v-model="item.remarks" style="width:200px"></Input>
        </Form-item>

    </div>
    <div class="testDetail" v-else-if="item.type=='Summerschool'">
        <Form-item label="学校全称（中文）">
            <Input v-model="item.highSchool" style="width:200px"></Input>
        </Form-item>
        <Form-item label="学校全称（英文）">
            <Input v-model="item.highSchoolEn" style="width:200px"></Input>
        </Form-item>
        <Form-item label="学校类型（中学/大学）">
            <Input v-model="item.summerType" style="width:200px"></Input>
        </Form-item>
        <Form-item label="学校国家">
            <Select filterable v-model="item.country" style="width:200px"  @on-change="onTreeCountryChange">
                <Option v-for="(c,index) in countryList" :key="index" :value="c.id">{{c.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="学校省/直辖市">
            <Select v-model="item.province" style="width:200px" @on-change="onTreeProvinceChange">
                <Option v-for="(c,index) in provinceList" :key="index" :value="c.id">{{c.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="学校城市">
            <Select v-model="item.city" style="width:200px">
                <Option v-for="(c,index) in cityList" :key="index" :value="c.id">{{c.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="入学时间（年/月）">
            <Input v-model="item.enterYear" style="width:200px"></Input>
        </Form-item>
        <Form-item label="完成时间（年/月）">
            <Input v-model="item.graduationYear" style="width:200px"></Input>
        </Form-item>
        <Form-item label="项目名称">
            <Input v-model="item.projectName" style="width:200px"></Input>
        </Form-item>
        <Form-item label="是否有学分（是/否）">
            <Select v-model="item.isScore" style="width:200px">
                <Option v-for="(i,index) in boolOptions" :key="index" :value="i.value">{{i.label}}</Option>
            </Select>
        </Form-item>
        <Form-item label="课程名称">
            <Input v-model="item.course" style="width:200px"></Input>
        </Form-item>
        <Form-item label="总分或平均分（按实际分值填写）">
            <Input v-model="item.total" style="width:200px"></Input>
        </Form-item>
        <Form-item label="换算为GPA（分数/满分）">
            <Input v-model="item.gpa" style="width:200px"></Input>
        </Form-item>
        <Form-item label="年级排名（排名/总人数）">
            <Input v-model="item.rank" style="width:200px"></Input>
        </Form-item>
        <Form-item label="其他备注">
            <Input v-model="item.remarks" style="width:200px"></Input>
        </Form-item>

    </div>
</div>
</template>
<script>
export default {
    props:{
        item:{
            type:Object,
            required:true,
        },
        countryList:{
            type:Array,
            required:true,
        },
        isEn:{
            type:Boolean,
            default:false,
        },
        getAreaListData:{
            type:Function,
            required:true,
        },
        findById:{
            type:Function,
            required:true,
        },
        xxStudyInfoLevel:{
            type:Array,
            required:true,
        }
    },
    data(){
        return {
            boolOptions:[{id:0,value:'1',label:'是'},{id:1,value:'0',label:'否'}],
            provinceList:[],
            cityList:[],
            cityload:0,
            // item:this.oneitem
        };
    },
    mounted(){
        setTimeout(()=>{
            this.onTreeCountryChange(this.item.country);
            this.onTreeProvinceChange(this.item.province);
        },100);
    },
    methods:{
        onTreeCountryChange(id){
            if(id !='-1' && /^\d+$/.test(id)){
                this.getAreaListData(id,data=>{
                    this.cityload++;
                    if(data.data.length){
                        this.provinceList = data.data;
                        if(this.cityload>2){
                            this.item.city='';
                        }
                    } else {
                        const item = this.findById(this.countryList,id);
                        if(item){
                            item.id = '-1';
                            this.provinceList=[item];
                            this.cityList=[item];
                            this.item.province='-1';
                            this.item.city='-1';
                        }
                    }
                })
            }
        },
        onTreeProvinceChange(id){
            if(id=='-1'){
                const item = this.findById(this.provinceList,id);
                this.cityList=item?[item]:[];
                this.item.city='-1';
                this.cityload++;
            }
            else if(/^\d+$/.test(id)){
                this.getAreaListData(id,data=>{
                    this.cityload++;
                    if(data.data.length){
                        this.cityList = data.data;
                    } else {
                        const item = this.findById(this.provinceList,id);
                        if(item){
                            this.cityList=[Object.assign({},item,{id:'-1'})];
                            this.item.city='-1';
                        } else { // try again
                            setTimeout(()=>
                            {
                                const item2 = this.findById(this.provinceList,id);
                                if(item2){
                                    item2.id = '-1';
                                    this.cityList=[item2];
                                    this.item.city='-1';
                                }
                                console.warn("try again");
                            },1000);
                        }
                    }
                })
            }
        },
    },
    watch:{
    },
}
</script>

