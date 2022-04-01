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
      batchList: []
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
    }
  }
}
</script>

<template>
<main class="bg-base-200 flex min-h-screen">
  <SettingsArea @add-batch="addBatch"/>
  <div class="flex flex-col justify-center items-center grow">
    <Batch v-for="(batch, index) in batchList" 
    :key = index 
    :title = batch.id 
    :name = batch.name
    :suffix = batch.suffix
    :id = batch.id
    />
  </div>
</main>
</template>