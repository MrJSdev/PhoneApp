import Vue from 'vue'
import Vuex from 'vuex'
import PhoneData from './api/phones.json'
import BrandData from './api/brands.json'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phones: [],
    brands: {},
    filter: {}
  },
  getters: {
    phoneList (state) {
      return state.phones
    },
    brandList (state) {
      return state.brands
    }
  },
  mutations: {
    filterPhones (state, payload) {
      let phones = [...PhoneData]
      state.filter = Object.assign(state.filter, payload)
      // delete the property if brand values are all
      if (payload.brand === 'all') delete state.filter.brand
      let filteredPhones = phones.filter(searchByKeys, state.filter);
      // function loop all the filter property for filtering in a deep level
      function searchByKeys(phone) {
        return Object.keys(this).every((key) => {
          // check if it match
          return phone[key] === this[key]
        })
      }
      state.phones = filteredPhones
    },
    removePhone(state, payload) {
      state.phones.splice(payload.index, 1);
    }
  },
  actions: {
    fetchPhones ({ state }) {
      state.phones = PhoneData
    },
    fetchBrands ({ state }) {
      state.brands = BrandData
    }
  }
})
