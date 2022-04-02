<script>
import Batch from './components/Batch.vue';
import SettingsArea from './components/SettingsArea.vue';

export default {
  inheritAttrs: false,
  components: {
    SettingsArea,
    Batch
  },
  emits: ['handleBatch'],
  data(){
    return {
      lastId: 0,
      batchList: [],
      srcBatch: false
    }
  },
  methods:{
    addBatch(e){
      let batch = {
        id: this.lastId+1,
        name: e.name,
        suffix: e.suffix
      }
      this.batchList.push(batch);
      this.lastId++;

    },
    changeName(e){
      this.batchList.find(batch => batch.id == e.id).name = e.name;
    },
    changeSuffix(e){
      this.batchList.find(batch => batch.id == e.id).suffix = e.suffix;
    },
    handleBatch(e){
      this.srcBatch = e;
    },
    removeBatch(e){
      let index = this.batchList.findIndex( batch => batch.id == e );
      this.batchList.splice(index, 1);
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
    @remove-batch="removeBatch"
        />
  </div>
</main>
</template>