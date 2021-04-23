import { shallowMount, createLocalVue } from '@vue/test-utils'
import Phones from '@/pages/Phones/Phones.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()
describe('Phones.vue.vue', () => {
  let getters
  let mutations
  let actions
  let state
  let store
  beforeEach(() => {
    state = {
      brands: {},
      phones: [],
      filter: {}
    }
    getters = {
      phoneList: () => [],
      brandList: () => { 
        return { 
          options: []
        }
      }
    }
    mutations = {
      filterPhones: () => [],
      removePhone: () => [],
    }
    actions = {
      fetchPhones: jest.fn(),
      fetchBrands: jest.fn(),
    }

    store = new Vuex.Store({
      state,
      getters,
      mutations,
      actions
    })
  })
  let getPhones = jest.fn()
  let wrapper
  it('Components rendered', () => {
    wrapper = shallowMount(Phones, { store, router, localVue, methods: {getPhones}})
    expect(wrapper.exists()).toBe(true)
  })
  it('getPhones method called', () => {
    expect(getPhones).toHaveBeenCalled()
  })

})
