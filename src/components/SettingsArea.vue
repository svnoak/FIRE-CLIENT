<template>
<div class="min-h-full w-80 bg-base-100 fixed px-10 py-5">
    <h1 class="font-bold text-5xl text-center">FiRe</h1>
    <div class="divider"></div>
    <h2 class="text-3xl text-center">Settings</h2>
    <form action="" method="post">
        <h3 class="text-2xl"> Batch</h3>
        <label class="label">Filenames for this batch</label>
        <input type="text" placeholder="Filename" id="batch-name" class="input input-sm input-bordered w-full max-w-xs">
        <label class="label">Suffix for this batch</label>
        <input type="text" placeholder="Filesuffix" id="batch-suffix" class="input input-sm input-bordered w-full max-w-xs">
    </form>
    <button class="btn btn-block mt-3">Add Batch</button>
  </div>
</template>