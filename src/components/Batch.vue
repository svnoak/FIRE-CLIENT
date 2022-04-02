<script>
import BatchImage from './BatchImage.vue';

export default {
    components: {
        BatchImage
    },
    props: ["id", "title", "name", "suffix", "srcBatch"],
    emits: ["handleBatch"],
    data(){
        return{
            batchId: this.id,
            nameInput: "",
            suffixInput: "",
            dropped: false,
            files: [],
            dragInfo: "Drag files here",
            srcImgIndex: -1,
            newImgIndex: -1,
            imgSrc: "",
            batchId: "batch-"+this.id,
        }
    },
    emits: ['nameInput', 'suffixInput'],
    methods: {
        changeName(e){
            this.nameInput = e.target.value;
            this.$emit('changeName', {id: this.batchId, name: this.nameInput});
        },
        changeSuffix(e){
            this.suffixInput = e.target.value;
            this.$emit('changeSuffix', {id: this.batchId, suffix: this.suffixInput});
        },
        onDrop(e) {
            console.log(this.srcBatch);
            if( !this.srcBatch ){
                if( e.target.tagName == "UL" || e.target.tagName == "P" ){
                    this.dropped = true;
                    let files = e.dataTransfer.files
                    if( files.length ){
                        for ( let i = 0; i < files.length; i++ ){
                            let url = URL.createObjectURL(files[i]);
                            this.files.push({url: url, index: i});
                        }
                    }
                }
            } else{
                this.dragInfo = "Drag files here";
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
            this.$emit("handleBatch", this.batchId);
        },
        onDragOverItem(e){
                if( this.batchId == this.srcBatch){
                    this.newImgIndex = this.files.findIndex( file => file.url.toString() == e.target.src );
                    let src = this.srcImgIndex;
                    let dest = this.newImgIndex;
                    [this.files[src], this.files[dest]] = [this.files[dest], this.files[src]];
                    this.srcImgIndex = this.newImgIndex;
                }
        },
        onDragEnd(){
            this.srcImgIndex = -1;
            this.newImgIndex = -1;
            this.$emit("handleBatch", false);
        }
    },
    /* watch: {
        dragInfo(){
            this.files 
            ? this.dragInfo = "Drag files here"
            : this.dragInfo = "Drop files here"
        }
    } */
}
</script>

<template>
    <div :id='"batch-"+id' class="card bg-base-100 shadow-xl m-4 w-9/12">
        <div class="card-body">
            <h2 class="card-title">#{{id}}</h2>
            <input type="text"
            :value=name
            placeholder="Filename" 
            class="input border input-xs" 
            :class="{'input-bordered border-error': !name}"
            @change="changeName"
            >
            
            <input type="text" 
            :value=suffix 
            placeholder="File suffix" 
            class="input input-xs" 
            :class="{'input-bordered': !suffix}"
            @change="changeSuffix"
            >

            <ul
        class="bg-dotted h-32 rounded border-dashed border-gray-300 border-2 flex"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        draggable="false"
        >
    <p v-if="!dropped">{{dragInfo}}</p>

    <li 
        v-for="(file, index) in files" 
        :key="index"
        class="h-full w-fit flex justify-end items-start cursor-move"
        draggable="true"
        @dragover="onDragOverItem"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @drag="onDrag"
        :index=index
        
    >
        <button class="block absolute h-0 m-0">
            <ion-icon name="close-circle-outline" class="cursor-pointer relative"></ion-icon>
        </button>
        <BatchImage :src="file.url" />
    </li>
    </ul>
        </div>
    </div>
</template>