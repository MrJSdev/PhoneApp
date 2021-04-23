<template>
  <section>
    <header>Consent</header>
    <article>
      <form action="#">
        <label for="consent">To move forward, please agree</label>
        <input type="checkbox" @change="onConsent" v-model="isConsent" name="consent" id="consent">
      </form>
    </article>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        isConsent: false
      }
    },
    methods: {
      onConsent() {
        if (this.isConsent) {
          localStorage.setItem('isConsent', true)
          this.$router.push('/phones')
        }
        console.log(localStorage.getItem('isConsent'))
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>