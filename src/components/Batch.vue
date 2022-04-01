<script>
import BatchImageArea from './BatchImageArea.vue';

export default {
    components: {
        BatchImageArea
    },
    props: ["id", "title", "name", "suffix"],
    data(){
        return{
            batchId: this.id,
            nameInput: "",
            suffixInput: ""
        }
    },
    emits: ['nameInput', 'suffixInput'],
    methods: {
        changeName(e){
            this.nameInput = e.target.value;
            this.$emit('changeName', {id: this.batchId, name: this.nameInput});
        },
        changeSuffix(e){
            this.suffixInput = e.target.value;
            this.$emit('changeSuffix', {id: this.batchId, suffix: this.suffixInput});
        }
    }
}
</script>

<template>
    <div :id=id class="card bg-base-100 shadow-xl m-4 w-9/12">
        <div class="card-body">
            <h2 class="card-title">#{{id}}</h2>
            <input type="text"
            :value=name
            placeholder="Filename" 
            class="input border input-xs" 
            :class="{'input-bordered border-error': !name}"
            @change="changeName"
            >
            
            <input type="text" 
            :value=suffix 
            placeholder="File suffix" 
            class="input input-xs" 
            :class="{'input-bordered': !suffix}"
            @change="changeSuffix"
            >

            <BatchImageArea />
        </div>
    </div>
</template>