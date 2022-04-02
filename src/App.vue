<script>
import Batch from './components/Batch.vue';
import SettingsArea from './components/SettingsArea.vue';

export default {
  components: {
    SettingsArea,
    Batch
  },
  data(){
    return {
      batchList: [],
      srcBatch: ""
    }
  },
  methods:{
    addBatch(e){
      let batch = {
        id: this.batchList.length + 1,
        name: e.name,
        suffix: e.suffix
      }
      this.batchList.push(batch)
    },
    changeName(e){
      this.batchList.find(batch => batch.id == e.id).name = e.name;
    },
    changeSuffix(e){
      this.batchList.find(batch => batch.id == e.id).suffix = e.suffix;
    },
    handleBatch(e){
      this.srcBatch = e;
    }
    
  }
}
</script>

<template>
<main class="bg-base-200 grid grid-cols-4 min-h-screen">
  <SettingsArea @add-batch="addBatch" class="col-span-1"/>
  <div class="col-start-2 col-end-5 flex flex-col justify-center items-center">
    <Batch v-for="(batch, index) in batchList"
    :key = index 
    :title = batch.id 
    :name = batch.name
    :suffix = batch.suffix
    :id = batch.id
    :srcBatch = this.srcBatch
    @change-name="changeName"
    @change-suffix="changeSuffix"
    @handle-batch="handleBatch"
        />
  </div>
</main>
</template>