<template>
  <div
    class="relative bg- border border-slate-100 ronded-3xl p-8 cursor-pointer hover:-translate-y-2 hover: shadow-xl transition">
    <img v-if="visibleFavoriteButton" @click="onClickFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" class="absolute top-8 left-8">
    <img :src="imageUrl" alt="Sneaker">
    <p class="mt-2"> {{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>

      <img v-if="visibleFavoriteButton" @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="">
    </div>
  </div>
</template>

<script setup>
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

 
const visibleFavoriteButton = Boolean(props.onClickAdd)

</script>

<style></style>