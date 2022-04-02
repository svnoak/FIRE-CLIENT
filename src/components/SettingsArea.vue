<script>
export default {
  emits:['addBatch', 'deleteAll'],
  data(){
    return{
      batch: {name: "", suffix: ""}
    }
  }
}
</script>

<template class="col-span-1">
<div class="h-screen bg-base-100 fixed px-10 py-5 flex flex-col justify-between">
  <div>
    <h1 class="font-bold text-5xl text-center">FiRe</h1>
    <div class="divider"></div>
    <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
      <input type="checkbox" class="peer"> 
      <div class="collapse-title text-xl font-medium">
        Batch Settings
      </div>
      <div class="collapse-content"> 
        <form action="" method="post">
          <label class="label">Filenames for this batch</label>
          <input type="text" v-model="batch.name" placeholder="Filename" id="batch-name" class="input input-sm input-bordered w-full max-w-xs">
          <label class="label">Suffix for this batch</label>
          <input type="text" v-model="batch.suffix" placeholder="Filesuffix" id="batch-suffix" class="input input-sm input-bordered w-full max-w-xs">
        </form>
      </div>
    </div>
    
    <button @click="$emit('addBatch', this.batch)" class="btn btn-block mt-3">Add Batch</button>
  </div>
  <button @click="$emit('deleteAll')" class="btn btn-block btn-error">Remove all batches</button>
</div>
</template>