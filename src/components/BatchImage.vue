<script>
export default {
    props:{
        src: String
    }
}
</script>

<template>
    <img :src="src" alt="product-image">
</template>