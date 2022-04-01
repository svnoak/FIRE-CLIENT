<script>
import BatchImageArea from './BatchImageArea.vue';

export default {
    components: {
        BatchImageArea
    },
    props: ["id", "title", "name", "suffix"]
}
</script>

<template>
    <div :id=id class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">#{{id}}</h2>
            <input type="text" :value=name class="input input-xs input-ghost w-full max-w-xs">
            <input type="text" :value=suffix class="input input-xs input-ghost w-full max-w-xs">
            <BatchImageArea />
        </div>
    </div>
</template>