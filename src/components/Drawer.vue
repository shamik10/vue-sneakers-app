<script setup>
  import axios from "axios";
  import { computed, inject, ref, watch } from "vue";
  import CartItemList from "./CartItemList.vue";
  import DrawerHead from "./DrawerHead.vue";
  import InfoBlock from "./InfoBlock.vue";
  

 const props = defineProps({
    totalPrice: Number,
    vatPrice: Number,
  })
  const isCreating = ref(false)
  const orderId = ref(null)

  const cartIsEmpty = computed(() => cart.value.length === 0);

  const {
    cart,
    closeDrawer
  } = inject('cart')

  const buttonDisabled = computed(() => 
    isCreating.value || cartIsEmpty.value)

  const createOrder = async () => {
    try {
      isCreating.value = true;
      const { data } = await axios.post(`https://ff7217dc3a197507.mokky.dev/orders`, {
        items: cart.value,
        totalPrice: props.totalPrice.value
      })

      cart.value = [];

      orderId.value = data.id;
    }
    catch(err) {
      console.log(err)
    }
    finally {
      isCreating.value = false;
    }
  }

  const emit = defineEmits(['createOrder'])

</script>


<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
      <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
        <DrawerHead />

        

        <div v-if="!totalPrice || orderId" class="flex h-full items-center">
          <InfoBlock v-if="!totalPrice && !orderId " 
            title="Корзина пустая" 
            description="Добавьте хотья бы одну пару кроссовок, чтобы сделать заказ" 
            image-url="/package-icon.png"
           />
          
          <InfoBlock v-if="orderId" 
            title="Заказ оформлен" 
            :description="`Ваш заказ №${orderId} скоро будет курьерской доставке`"
            image-url="/order-success-icon.png"
           />
        </div>

    

        <div v-else>
          <CartItemList />

          <div  class="flex flex-col gap-4 mt-7">
            <div class="flex gap-2 ">
              <span>Итого: </span>
              <div class="flex-1 border-b border-dashed "></div>
              <b>{{ totalPrice }} руб.</b>
            </div>

            <div class="flex gap-2 ">
              <span>Налог: 5%</span>
              <div class="flex-1 border-b border-dashed "></div>
              <b>{{ vatPrice }} руб.</b>
            </div>
            <button
              :disabled="buttonDisabled"
              @click="createOrder"
              class="mt-7 bg-lime-500 w-full rounded-xl py-3 text-white cursor-pointer disabled:bg-slate-300 hover:bg-lime-600 transition active:bg-lime-700">
                Оформить заказ
            </button>
          </div>
        </div>
      </div>
  </div>
</template>


<style></style>