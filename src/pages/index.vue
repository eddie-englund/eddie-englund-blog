<script lang="ts" setup>
import { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";

interface Article extends MarkdownParsedContent {
  author: string;
  img?: string;
  title: string;
  date: string;
  subtitle: string;
}

const { data } = await useAsyncData("articles", () => queryContent<Article>("/articles").find());

console.log(data);
</script>

<template>
  <div class="home-container">
    <article-meta
      v-for="article in data"
      :to="article._path || 'articles/changing-grids-hell'"
      :title="article.title"
      :img="article.img"
      :date="article.date"
      :subtitle="article.subtitle"
    />
  </div>
</template>
