<template>
  <main>
    <header>
      <h2 class="text-center">Phones</h2>
    </header>
    <section class="filter">
      <select name="brands" class="" @change="onBrand" id="brands">
        <option value="all">All</option>
        <option :value="brand.id" v-for="brand in brandList.options" :key="brand.id">{{brand.displayName}}</option>
      </select>
    </section>
    <section class="phone-list" role="list">
      <ul>
        <li role="contentinfo" :tabindex="index" class="phone--item col-4" v-for="(phone, index) in phoneList" :key="phone.contentKey">
          <div class="phone--details background--white pos-relative">
            <img role="img" :src="phone.imgUrl" class="width-100" :alt="phone.displayName">
            <h3>{{ phone.displayName }}</h3>
            <p class="phone--price font-bold">{{ phone.price }}</p>
            <button type="button" class="remove-btn" @click="removePhone({phone, index})" role="removephone"><font-awesome-icon icon="times" /></button>
            
            <button class="heart" @click="addOnWishList(phone)" :class="wishKeys[phone.contentKey] ? 'heart--active' : ''"><font-awesome-icon icon="heart" /></button>
            <span class="inline-block color--box" v-for="color in phone.colorOptions" :key="color.name" :style="{ backgroundColor: color.hex }"></span>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        wishList: [],
        wishKeys: {},
        brand: null
      }
    },
    computed: {
      ...mapGetters(['phoneList', 'brandList']),

    },
    created () {
      this.getPhones()
      this.fetchBrands()
      this.getAndSetWishListData()
    },
    methods: {
      ...mapMutations(['removePhone', 'filterPhones']),
      ...mapActions(['fetchPhones', 'fetchBrands']),
      getPhones () {
        console.log(this.$route, 'route')
        if (Object.keys(this.$route.query).length > 0) {
          this.filterPhones(this.$route.query)
        } else if (Object.keys(this.$route.params).length > 0) {
          this.filterPhones(this.$route.params)
        } else this.fetchPhones();
      },
      getAndSetWishListData() {
        if (localStorage.getItem('wishKeys')) this.wishKeys = JSON.parse(localStorage.getItem('wishKeys'))
        if (localStorage.getItem('wishList')) this.wishList = JSON.parse(localStorage.getItem('wishList'))
      },
      onBrand (event) {
        console.log(event.target.value, 'brand')
        this.filterPhones({brand: event.target.value})
      },
      addOnWishList (phone) {
        if (phone) {
          if (this.wishKeys[phone.contentKey]) {
            // remove
            return
          }
          this.$set(this.wishKeys, phone.contentKey, true)
          this.wishList.push(phone)
          localStorage.setItem('wishKeys', JSON.stringify(this.wishKeys))
          localStorage.setItem('wishList', JSON.stringify(this.wishList))
        }
      }
    },
  }
</script>

<style scoped>
.heart, .remove-btn{
  color: #ddd;
  border: none;
  border: none;
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  background-color: transparent;
  z-index: 2;
  font-size: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
}
.phone--price{
  color: orangered;
}
.heart:hover, .heart:focus{
  transform: scale(1.2);
  color: purple;
}
.heart--active{
  color: purple;
}
.phone-list{

}
.remove-btn{
  color: red;
  top: 3rem;
  right: 0.7rem;
}
.remove-btn:hover, .remove-btn:focus{
  color: darkred;
}
.phone--item{
  list-style: none;
  float: left; 
  padding: .5rem;
}
.phone--details{
  padding: 1rem;
  border-radius: 0.3rem;
  box-shadow: 0 3px 2px #ddd;
}
.color--box{
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
</style>