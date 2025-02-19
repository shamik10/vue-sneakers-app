<script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  import CardList from '@/components/CardList.vue';

  const favorities = ref([])

  onMounted(async () => {
    try {
      const {data} = await axios.get(`https://ff7217dc3a197507.mokky.dev/favorities?_relations=items`)

      favorities.value = data.map((obj) => obj.item);

    } catch (err) {
      console.log(err);
    }
  })
</script>


<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>

  <CardList :items="favorities" is-favorite/> 

</template>


<style>

</style>