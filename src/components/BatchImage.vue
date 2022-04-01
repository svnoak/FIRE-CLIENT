<script>
export default {
    props:{
        src: String
    }
}
</script>

<template>
    <img 
    :src="src" 
    alt="product-image"
    class="h-full border border-slate-300">
</template>