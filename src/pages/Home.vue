<script setup>
  import CardList from '@/components/CardList.vue';
  import axios from 'axios';
  import { inject, onMounted, reactive, ref, watch } from 'vue';
  import debounce from 'lodash.debounce'
  const {cart, addToCart, removeFromCart} = inject('cart')
  
  const items = ref([]);
  

  const filters = reactive({
    sortBy: 'title',
    searchQuery: '',

  })
  
  const onChangeSelect = (event) => {
    filters.sortBy = event.target.value;
  }

  const onChangeSearchInput = debounce((event) => {
    filters.searchQuery = event.target.value;
    console.log(filters.searchQuery)
  }, 500)

  const addToFavorite = async (item) => {
    try {
      console.log(item);
      if (!item.isFavorite) {
        const obj = {
          item_id: item.id,
        };

        item.isFavorite = true;

        const { data } = await axios.post('https://ff7217dc3a197507.mokky.dev/favorities', obj)
  
        item.favoriteId = data.id 
      } 
      else {
        item.isFavorite = false;
        await axios.delete(`https://ff7217dc3a197507.mokky.dev/favorities/${item.favoriteId}`)
        item.favoriteId = null;
      }

    } catch (err) {

    }
  }

  const fetchFavorites = async () => {
    try {
      const { data:  favorites } = await axios.get(`https://ff7217dc3a197507.mokky.dev/favorities`)
      items.value = items.value.map(item => {
        const favorite = favorites.find((favorite) => favorite.item_id === item.id);
        if (!favorite) {
          return item;
        }

        return {
          ...item,
          isFavorite: true,
          favoriteId: favorite.id
        };
      })



    } catch (e) {
      console.log(e)
    }

  }

  const fetchItems = async () => {
    try {
      const params = {
        sortBy: filters.sortBy,
      }

      if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`;
      }

      const {data} = await axios.get(`https://604781a0efa572c1.mokky.dev/items`, {
        params
      } );

      items.value = data.map(obj => ({
        ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false}));
    } catch(e) {
      console.log(e)
    }
  }


  const onClickAddPlus  = (item) => {
    if (!item.isAdded) {
      addToCart(item)
    }
    else {
      removeFromCart(item)
    }
    console.log(cart); 
  }

  watch(filters, fetchItems)

  watch(cart, () => {
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: false
    }))
  })
  
  // 
  onMounted( async () => {
    const localCart = localStorage.getItem('cart');
    cart.value = localCart ? JSON.parse(localCart) : []

    await fetchItems();
    await fetchFavorites();

    items.value = items.value.map((item) => ({
      ...item,
      isAdded: cart.value.some((cartItem) => cartItem.id === item.id) 
    }))
  })

</script>


<template>
  <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
          <div class="flex gap-4">
            <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none ">
              <option value="name">По названию</option>
              <option value="price">По цене (дешевые)</option>
              <option value="-price">По цене (дорогие)</option>
            </select>

            <div class="relative">
              <img
              class="absolute left-4 top-3"
              src="/search.svg" alt="">
              <input @input="onChangeSearchInput" placeholder="Поиск..." type="text" class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400">
            </div>
          </div>

        </div>
        <div class="mt-10">
          <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus"/>
        </div>
</template>



<style>

</style>