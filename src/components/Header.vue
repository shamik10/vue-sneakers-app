<template>
  <header class="flex justify-between border-b border-state-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" class="w-10">
          <div>
            <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
            <p class="text-slate-500">Магазин лучших кроссовок</p>
          </div>
        </div>
    </router-link>  

     <ul class="flex items-center gap-10">
      <li @click="() => emit('openDrawer')" class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black">
        <img src="/cart.svg" alt="Cart">
        <b>{{ totalPrice }}</b>
     </li>
     <router-link to="/favorities">
       <li class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black">
         <img src="/heart.svg" alt="Cart">
         <span>Закладки</span>
      </li>
     </router-link>
      <li class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black">
        <img src="/profile.svg" alt="Cart">
        <span>Профиль</span>
     </li>
    </ul>



    </header>
</template>

<script setup>
  const emit = defineEmits(['openDrawer'])

  const props = defineProps({
    totalPrice: Number
  })
</script>

<style>

</style>