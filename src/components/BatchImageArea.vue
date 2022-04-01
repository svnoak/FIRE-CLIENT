<script>
import BatchImage from './BatchImage.vue';

export default {
    components: {
        BatchImage
    },
    data() {
        return{
            dragged: false,
            files: [],
            source: ""
        }
    },
    methods: {
        onDrop(e) {
            this.files = e.dataTransfer.files;
        },
        onDragOver(e) {
            this.dragged = true;
        },
        onDragLeave(e){
            this.dragged = false;
        },
        extractSource(file){
            this.source = URL.createObjectURL(file);
        }
    }
}
</script>

<template>
    <ul 
        class="bg-dotted h-32 rounded border-dashed border-gray-300 border-2 flex"
        @dragover.prevent="onDragOver"
        @dragleave="onDragLeave"
        @drop.prevent="onDrop"
    >
    <p v-if="!dragged">Drop image here</p>
    <li v-for="(file, index) in files" :key="index" :load="extractSource(file)">
        <BatchImage :src="source"/>
    </li>
    </ul>
</template>