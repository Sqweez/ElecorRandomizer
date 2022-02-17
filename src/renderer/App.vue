<template>
  <div id="app">
    <div class="app">
      <img src="./assets/logo.png" alt="" class="background-logo">
      <header>
        <div class="header-container">
          <div class="logo-container">
            <img src="./assets/logo.png" alt="">
          </div>
          <h1>
            Рандомайзер от <span class="bold">"ELECOR"</span>
          </h1>
        </div>
      </header>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'elecor-randomizer'
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
  }

  .app {
    width: 100%;
    background-color: #363636;
    min-height: 100vh;
  }

  .background-logo {
    position: absolute;
    top: -23%;
    left: -9%;
    width: 700px;
    height: auto;
    user-select: none;
    opacity: 0.05;
  }

  header {
    padding-top: 30px;
  }

  .logo-container {
    width: 200px;
    height: 200px;
    background-color: transparent;
    margin-left: 30px;
  }

  .header-container {
    width: 40%;
    background-color: #252525;
    height: 150px;
    position: relative;
    display: flex;
    align-items: center;
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    border-left-color: #4e4e4e;
  }

  .logo-container img {
    object-fit: contain;
    object-position: center;
    top: 0;
    left: 0;
    width: 100%;
    user-select: none;
    height: 100%;
  }

  h1 {
    color: #e3bf8a;
    margin-left: 30px;
    user-select: none;
    cursor: default;
  }

  .bold {
    font-weight: 700;
  }
</style>
