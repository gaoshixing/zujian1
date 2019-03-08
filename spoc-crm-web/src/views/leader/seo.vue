<template>
    <newspaper :edit="edit"></newspaper>
</template>

<script>

import newspaper from '../../modules/newspaper';

export default {
    data(){
        return {
            edit: true
        };
    },
    components: {
        newspaper
    },
    
    methods: {
        
    },
}
</script>


