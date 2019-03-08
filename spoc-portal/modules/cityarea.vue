<template>
    <div>
        <Select v-if="showCountry" filterable v-model="country" :style="width ? ('width:' + width ) : 'width: 33%'" @on-change="onTreeCountryChange">
            <Option v-for="c1 in cityTree.country" :key="c1.id" :value="c1.id">{{c1.name}}</Option>
        </Select>
        <Select v-if="s2flag" filterable v-model="province" :style="width ? ('width:' + width) : 'width: 32%'" @on-change="onTreeProvinceChange">
            <Option v-for="c2 in cityTree.province" :key="c2.id" :value="c2.id">{{c2.name}}</Option>
        </Select>
        <Select v-if="s3flag" filterable v-model="city" :style="width ? ('width:' + width) : 'width: 30%'">
            <Option v-for="c3 in cityTree.city" :key="c3.id" :value="c3.id">{{c3.name}}</Option>
        </Select>
    </div>
</template>
<script>
import valid,{errors , sys} from '../libs/request.js'
export default {
    props:{
        cou:{
            required:false,
        },
        pro:{
            required:true,
        },
        ci:{
            required:true,
        },
        width: {
            required: false,
        }
    },
    data(){
        return {
            country:'',
            province:'',
            city:'',
            cityTree:{
                country:[],
                province:[],
                city:[],
            },
            cache:{},
            loaded:false,
            s2flag:true,
            s3flag:true,
            showCountry: true,
            style: ''
        }
    },
    mounted(){
        // console.log(this.cou,this.pro,this.ci);
        if(this.cou || this.cou == '') {
            this.showCountry = true;
            const arr = [this.findByName(),this.getAreaListData(this.cou),this.getAreaListData(this.pro)];
            Promise.all(arr).then((res)=>{
                this.cityTree.country=res[0];
                this.cityTree.province=res[1];
                if(!res[2].length){
                    const item = this.findById(res[1],this.pro);
                    res[2]=[Object.assign({},item,{id:'-1'})];
                }
                this.cityTree.city=res[2];
                this.country = this.cou;
                this.province = this.pro;
                this.city = this.ci;
                this.loaded = true;
            });
        }else{
            this.showCountry = false;
            this.country = '7';
            const arr = [this.getAreaListData(this.country),this.getAreaListData(this.pro)];
            Promise.all(arr).then((res)=>{
                this.cityTree.province=res[0];
                if(!res[1].length){
                    const item = this.findById(res[0],this.pro);
                    res[1]=[Object.assign({},item,{id:'-1'})];
                }
                this.cityTree.city=res[1];
                this.province = this.pro;
                this.city = this.ci;
                this.loaded = true;
            });
        }
        
    },
    methods:{
        setAds(cou, pro, ci) {
            const arr = [this.getAreaListData(cou),this.getAreaListData(pro)];
            Promise.all(arr).then((res)=>{
                this.cityTree.province=res[0];
                if(!res[1].length){
                    const item = this.findById(res[0],pro);
                    res[1]=[Object.assign({},item,{id:'-1'})];
                }
                this.cityTree.city=res[1];
                this.country = cou;
                this.province = pro;
                this.city = ci;
                this.loaded = true;
            });
        },
        onTreeCountryChange(id){
            this.cityTree.province=[];
            this.province='';
            this.city='';
            this.getAreaListData(id).then(res=>{
                if(res.length){
                    this.cityTree.province = res;
                }else{
                    const item = this.findById(this.cityTree.country,id);
                    if(item){
                        const a = [Object.assign({},item,{id:'-1'})]
                        this.cityTree.province=a;
                        this.cityTree.city=a;
                        this.province='-1';
                        this.city='-1';
                    }
                }
                // fix iview bug
                this.s2flag=false;
              /*   this.$nextTick(()=>{
                    this.s2flag=true;
                }) */
                let _this = this
                setTimeout(()=>{
                    _this.s2flag=true;
                    _this.$forceUpdate()
                })
            });
            
        },
        onTreeProvinceChange(id){
            if(id=='-1'){
                const item = this.findById(this.cityTree.province,id);
                this.cityTree.city=item?[item]:[];
                this.city='-1';
                return
            }
            this.city='';
            this.cityTree.city = [];
            this.getAreaListData(id).then(res=>{
                if(res.length){
                    this.cityTree.city = res;
                } else {
                    const item = this.findById(this.cityTree.province,id);
                    if(item){
                        this.cityTree.city=[Object.assign({},item,{id:'-1'})];
                        this.city='-1';
                    }
                }
                // fix iview bug
                this.s3flag=false;
                this.$nextTick(()=>{
                    this.s3flag=true;
                })
            });
            
        },
        findById(arr,id){
            const item = arr.find(i=>i.id==id);
            if(item){
                return Object.assign({},item);
            }
            return null;
        },
        findByName() {
            // 查找国家
            return new Promise((resolve,rej)=>{
                let params = {
                    name: '',
                    level: 2
                }
                sys.areaFindByName(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        resolve(res.data.data)
                    }
                }).catch(errors.call(this));
            });
        },
        getAreaListData(id){
            return new Promise((resolve,rej)=>{
                if(!id){
                    return resolve([]);
                }
                if(this.cache[id]){
                    return resolve(this.cache[id]);
                }
                let params = {
                    id: id,
                }
                sys.areaListLocation(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.cache[id]=res.data.data;
                        resolve(res.data.data);
                    }
                }).catch(errors.call(this));
            });
        },
    },
    watch:{
        country(val){
            if(this.loaded && val){
                this.$emit('update:cou',val);
                this.$emit('update:pro','');
                this.$emit('update:ci','');
            }
            
        },
        province(val){
            if(this.loaded && val){
                this.$emit('update:pro',val);
                this.$emit('update:ci','');
            }
        },
        city(val){
            if(this.loaded && val){
                this.$emit('update:ci',val);
            }
        },
    }
}
</script>

