<script setup>
  import { onMounted, provide, computed,  ref, watch } from 'vue';
  import axios from 'axios';
  import Header from '@/components/Header.vue';
  import Drawer from './components/Drawer.vue';
  import CartItemList from './components/CartItemList.vue';
  import Home from '@/pages/Home.vue';

  const drawerOpen = ref(false);


  const cart = ref([]);


  const totalPrice = computed(
    () => cart.value.reduce((acc, item) => acc + item.price, 0)
  )

  const vatPrice = computed(
    () => Math.round(totalPrice.value / 100 * 5)
  )


  const closeDrawer = () => {
    drawerOpen.value = false
  }

  const openDrawer = () => {
    drawerOpen.value = true
  }

  const addToCart = (item) => {
    cart.value.push(item)
    item.isAdded = true
  }

  const removeFromCart = (item) => {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
  }

  


  // async () => {
  //   fetch('https://604781a0efa572c1.mokky.dev/items')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data)
  //   })
  // }


  watch(cart, () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
    },
    {deep: true}
  )


  provide('cart', {
    cart,
    closeDrawer,
    openDrawer,
    addToCart,
    removeFromCart
  } )
</script>


<template>
  <div>
    <Drawer v-if="drawerOpen" :total-price="totalPrice" :vatPrice="vatPrice"/>
    <div class="bg-white w-4/5 m-auto  rounded-xl shadow-xl mt-14">
      <Header :total-price="totalPrice" @openDrawer="openDrawer" />
      <div class="p-10">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<style scoped>



</style>
