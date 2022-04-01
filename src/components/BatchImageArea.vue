<script>
import BatchImage from './BatchImage.vue';

export default {
    components: {
        BatchImage
    },
    data() {
        return{
            dropped: false,
            files: [],
            source: "",
            dragInfo: "Drag files here",
            srcImgIndex: -1,
            newImgIndex: -1

        }
    },
    methods: {
        onDrop(e) {
            if( this.files.length < 1 ){
                this.dropped = true;
                let files = e.dataTransfer.files
                for( let file of files ){
                    let url = URL.createObjectURL(file);
                    console.log(typeof(url));
                    this.files.push(url);
                }
            }
        },
        onDragOver(e) {
            this.dragInfo = "Drop files";
        },
        onDragLeave(e){
            this.dragInfo = "Drag files here";
        },
        onDragStart(e){
            this.srcImgIndex = this.files.findIndex( file => file.toString() == e.target.src );
        },
        onDragOverItem(e){
            this.newImgIndex = this.files.findIndex( file => file.toString() == e.target.src );
        },
    }
}
</script>
<template>
    <ul
        class="bg-dotted h-32 rounded border-dashed border-gray-300 border-2 flex"
        @dragover.prevent="onDragOver"
        @dragleave="onDragLeave"
        @drop.prevent="onDrop"
        :id="id"
        >
    <p v-if="!dropped">{{dragInfo}}</p>
    <li 
    v-for="(file, index) in files" 
    :key="index"
    class="h-full"
    draggable="true"
    @dragover.prevent="onDragOverItem"
    @dragstart="onDragStart"
    :index=index
    >
        <BatchImage :src="file" />
    </li>
    </ul>
</template>