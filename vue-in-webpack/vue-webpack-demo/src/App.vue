<template>
  <div class="main">
    <router-link to="/">Home</router-link>
    <router-link to="/webpack">在Vue里面使用webpack</router-link>
    <RouterView />
  </div>
</template>
<script setup></script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main {
  width: 80vw;
  height: 80vh;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
