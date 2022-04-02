<script>
import BatchImage from './BatchImage.vue';

export default {
    components: {
        BatchImage
    },
    props: ['batch'],
    data() {
        return{
            dropped: false,
            files: [],
            dragInfo: "Drag files here",
            srcImgIndex: -1,
            newImgIndex: -1,
            imgSrc: "",
            batchId: this.batch,
            srcBatch: ""
        }
    },
    methods: {
        onDrop(e) {
            if( e.target.tagName == "UL" || e.target.tagName == "P" ){
                this.dropped = true;
                let files = e.dataTransfer.files
                if( files.length > 1 ){
                    for ( let i = 0; i < files.length; i++ ){
                        let url = URL.createObjectURL(files[i]);
                        this.files.push({url: url, index: i});
                    }
                } else{
                    let exists = this.files.findIndex( file => file.url.toString() == this.imgSrc );
                    if ( !exists ){
                        this.files.push(this.imgSrc);
                    }
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
            this.srcImgIndex = this.files.findIndex( file => file.url.toString() == e.target.src );
            this.imgSrc = e.target.src;
            this.$emit('handleBatchId', this.batchId);
        },
        onDragOverItem(e){
/*             if( this.batchId == e.target.dataset.batch ){
                this.newImgIndex = this.files.findIndex( file => file.url.toString() == e.target.src );
                let src = this.srcImgIndex;
                let dest = this.newImgIndex;
                [this.files[src], this.files[dest]] = [this.files[dest], this.files[src]];
                this.srcImgIndex = this.newImgIndex;
            } */
        },
        onDragEnd(e){
            this.srcImgIndex = -1;
            this.newImgIndex = -1;
        }
    },
}
</script>
<template>
    <ul
        class="bg-dotted h-32 rounded border-dashed border-gray-300 border-2 flex"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        :data-batch=batch
        draggable="false"
        >
    <p v-if="!dropped">{{dragInfo}}</p>
    <li 
        v-for="(file, index) in files" 
        :key="index"
        class="h-full"
        draggable="true"
        @dragover="onDragOverItem"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @drag="onDrag"
        :index=index
        :data-batch="batch"
        :ref="batch"
    >
        <BatchImage :src="file.url" :data-batch=batch />
    </li>
    </ul>
</template>