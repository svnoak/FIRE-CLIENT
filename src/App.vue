<script>
import Batch from './components/Batch.vue';
import SettingsArea from './components/SettingsArea.vue';

export default {
  components: {
    SettingsArea,
    Batch
  }
}
</script>

<template>
<main class="bg-base-200 flex min-h-screen">
  <SettingsArea />
  <div class="flex flex-col justify-center items-center grow">
    <Batch />
  </div>
</main>
</template>