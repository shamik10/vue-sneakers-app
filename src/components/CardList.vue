<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
    v-for="item in items"
    :id = "item.id"
    :key = "item.id"
    :title="item.title"
    :imageUrl="item.imageUrl"
    :price="item.price"
    :onClickFavorite="isFavorite ?  null : () => emit('addToFavorite', item)"
    :onClickAdd="isFavorite ? null : () => emit('addToCart', item)"
    :isFavorite="item.isFavorite"
    :isAdded="item.isAdded"
    />

  </div>
</template>

<script setup>
import Card from "./Card.vue";

defineProps({
  items: Array,
  isFavorite: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])





</script>

<style></style>