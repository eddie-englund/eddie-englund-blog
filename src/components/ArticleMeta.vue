<script lang="ts" setup>
defineProps({
  title: { type: String, default: "Loading..." },
  img: { type: String, default: "/eddie-englund.jpg" },
  date: { type: String, default: "Loading..." },
  to: { type: String, required: true },
  subtitle: { type: String, default: "Loading..." },
});
</script>

<template>
  <nuxt-link :to="to" class="article-meta">
    <article>
      <h3>{{ title }}</h3>
      <div class="bottom-container">
        <p>{{ subtitle }}</p>
        <p>{{ date }}</p>
      </div>
    </article>
  </nuxt-link>
</template>

<style lang="scss" scoped>
@use "@/scss/colors.scss" as c;

.article-meta {
  text-decoration: none;

  article {
    background-color: c.$card;
    padding: 2rem 2rem;
    border-radius: 4px;
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }

  p,
  h3 {
    padding: 0;
    margin: 0;
  }

  p {
    color: c.$text-secondary;
    font-weight: 400;
  }

  h3 {
    font-weight: 500;
  }

  .bottom-container {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    align-items: end;

    p:nth-child(2) {
      font-size: 0.7em;
      font-weight: 300;
    }
  }
}
</style>
