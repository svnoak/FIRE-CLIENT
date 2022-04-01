<script>
import Navbar from './components/Navbar.vue';
import Batch from './components/Batch.vue';

export default {
  components: {
    Navbar,
    Batch
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  watch: {
    count(newCount) {
      console.log(`New count is ${newCount}`)
    }
  }
}
</script>

<template>
<main>
  <Navbar/>
  <div class="flex flex-col justify-center align-items-center">
    <Batch />
  </div>
</main>
</template>