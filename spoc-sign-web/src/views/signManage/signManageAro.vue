<style>

</style>
<template>

	<router-view @jump="formTo">
	</router-view>
  
</template>
<script>
export default {
   data (){
		return{
				
	    }
    },
    
	methods:{
		formTo(obj){
            this.$router.push(
                {
                    name: obj.name,
                    query: obj.query
                }

            )            
        }
	}
};
</script>