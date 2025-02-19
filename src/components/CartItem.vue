<script setup>

  const emit = defineEmits(['onClickRemove'])

  const props = defineProps({
    id: Number,
    imageUrl: String,
    title: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickAdd: Function,
    onClickFavorite: Function,
  })
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" alt="Sneaker">
    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }}</b>
        <img @click="emit('onClickRemove')" class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" alt="">
      </div>
    </div>
  </div>
</template>



<style>

</style>