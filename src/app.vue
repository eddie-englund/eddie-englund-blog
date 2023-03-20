<template>
  <div class="app-wrapper">
    <main-header />
    <nuxt-page />
  </div>
</template>

<style lang="scss">
@use '@/scss/colors.scss' as c;
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap');

body, body::before, body::after {
  margin: 0;
  padding: 0;
}

body {
  background: c.$bg;
}

h1, h2, h3, p, a {
  font-family: 'Noto Sans', sans-serif;
  color: c.$text;
}

.app-wrapper {
  padding: 2rem 16rem;
}
</style>
