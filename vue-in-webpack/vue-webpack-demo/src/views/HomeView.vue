<template>
  <div class="home">
    <!-- sfhsjd -->
    <h1>HomeView</h1>
    <!-- sdijgfohvshfsfhpui 
     sdkfhsfgsbsdijgfohvshfsfhpui sdijgfohvshfsfhpui sdijgfohvshfsfhpui sdijgfohvshfsfhpui -->
    <p>这是主页</p>
    <div class="imgGroup">
      <img src="../assets/images/pexels-photo-1036623.webp" alt="" />
      <img src="../assets/images/pexels-photo-1043474.webp" alt="" />
      <img src="../assets/images/pexels-photo-1222271.jpeg" alt="" />
      <img src="../assets/images/pexels-photo-614810.webp" alt="" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  p {
    font-size: 16px;
    color: #666;
    line-height: 1.5;
  }
  .imgGroup {
    display: flex;
    justify-content: space-around;
    width: 100%;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
