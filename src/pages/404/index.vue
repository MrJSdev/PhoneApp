<template>
  <section id="page-404" class="text-center">
    <article>
        <h1>Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <p><el-button class="text-uppercase mt20 fw-medium" @click="$router.push('/')">{{$t('GOHOME')}}</el-button></p>

    </article>
  </section>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>