<template>
  <div v-if="posts.length > 0">
    <h3>Список пользователей</h3>
    <post-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @remove="$emit('remove', post)"
    />
  </div>
  <h2 v-else="posts.length  === 0" style="color: red">Список пользователей пуст</h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
>
