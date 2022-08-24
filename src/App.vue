<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app__btns">
      <my-button @click="showDialog"> Создать пост </my-button>
      <my-select v-model="selectedSort" :options="sortOptions"> </my-select>
    </div>

    <my-dialog v-model:show="dialogVisable">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="sortedPosts" @remove="removePost" v-if="!isPostsLoading" />
    <div v-else>Идёт загрузка</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisable: false,
      isPostsLoading: false,
      selectedSort: "",
      sortOptions: [
        {
          value: "title",
          name: "По названию",
        },
        {
          value: "body",
          name: "По описанию",
        },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisable = false;
    },
    showDialog() {
      this.dialogVisable = true;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    async fetchPostst() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        this.posts = response.data;
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isPostsLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPostst();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1,post2) =>{
        return post1[this.selectedSort] ?.localeCompare(post2[this.selectedSort])
      })
    },
  },
  watch: {
  },
};
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
}
</style>
