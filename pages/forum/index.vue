<template>
  <Header :transparent="false"/>
  <h1>Hello forum</h1>
  <article v-for="post in posts" :key="post.id">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body.slice(0, 1000) }}</p>
    <p>
      <NuxtLink :to="`/forum/${post.id}`">Lire la suite</NuxtLink>
    </p>
  </article>
</template>

<script setup>
import Header from "@/components/layout/Header.vue";

const {data: posts} = await useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
</script>