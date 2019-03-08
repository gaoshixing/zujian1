<style lang="less">
.v_common_process{
    // background-color: pink;
    .ranking_interval{
        display: flex;
        align-items: center;
        margin: 5px 20px 0 20px;
        .box{
          width: 60px;
          height: 25px;
          border: 1px solid #33b59f;
          color:#33b59f;
          text-align: center;
          line-height: 25px;
        }
        .line{
          width: 10px;
          border-top: 3px solid #33b59f;
          margin: 5px;
        }
      }
}
</style>
<template>
  <div class="v_common_process">
        <Row type="flex">
            <Col>
                <RadioGroup v-model="groupValue">
                <Radio v-for="(item,index) in groupArr" :key="index" :label="item.v" v-show="item.k != '不限'">{{item.k}}</Radio>
                </RadioGroup>
            </Col>
            <Col>
                <div class="ranking_interval">
                <div class="box">{{rankingStart}}</div>
                <div class="line"></div>
                <div class="box">{{rankingEnd}}</div>
                </div>
            </Col>
            <Col span="6">
                <Slider v-model="ranking" range :min="min" :max="max"></Slider>
            </Col>
        </Row>
  </div>
</template>
<script>

export default {
    name:'v-Process',
    props: {
        start:{
            required:true
        },
        end:{
            required:true
        },
        groupArr:{
            type:Array,
            required:true
        },
        min:{
            type:[Number,String],
            default:0
        },
        max:{
            type:[Number,String],
            default:100
        }
    },
    data () {
        return {
            ranking:[],
            groupValue:',',
            rankingStart:'',
            rankingEnd:'',
        }
    },
    watch: {
        ranking(val){
            this.groupValue=val.toString();
        },
        groupValue(val){
            if(val ===`${this.min},${this.max}`){
               this.groupValue=',';
            }else{
                let arr = this.groupValue.split(',');
                this.rankingStart = arr[0];
                this.$emit('update:start', this.rankingStart)
                this.rankingEnd = arr[1];
                this.$emit('update:end', this.rankingEnd)
            }
    }
        
    }
}
</script>
