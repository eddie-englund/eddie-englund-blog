<template>
  <header class="main-header">
    <nuxt-link to="/" class="logo">
      <h3>Eddie Englund</h3>
    </nuxt-link>
    <nuxt-link to="/about">About</nuxt-link>
  </header>
</template>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as c;
.main-header {
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    text-decoration: none;
    color: c.$text;
    transition: all .3s ease;

    &:hover {
      color: c.$success;
    }
  }
}
</style>
