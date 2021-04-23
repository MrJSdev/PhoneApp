import PhoneData from './api/phones.json'
module.exports = {
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
    // setting the total from filtered Phones
    state.total = filteredPhones.length
    state.phones = filteredPhones
  }
}