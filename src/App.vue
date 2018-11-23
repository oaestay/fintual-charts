<template>
  <div id="app">
    <vue-drawer-layout ref="drawer" :drawer-width="800">
      <div class="app__drawer" slot="drawer">
        <img class="burger-btn burger-btn--close" src="./assets/close.svg" @click="handleToggleDrawer" />
        <ul class="app-drawer__links">
          <li class="app-drawer__link"><router-link to="/home">Home</router-link></li>
          <li class="app-drawer__link"><router-link to="/charts">Charts</router-link></li>
        </ul>
      </div>
      <div class="app__content" slot="content">
        <div class="app-content__header">
          <img class="burger-btn burger-btn--open" src="./assets/burger.svg" @click="handleToggleDrawer" />
          <h1 class="app-content-header__text">Fininci</h1>
        </div>
        <router-view></router-view>
      </div>
    </vue-drawer-layout>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    handleToggleDrawer() {
      this.$refs.drawer.toggle();
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app {
  &__drawer {
    background-color: #fff;
    height: 100%;
  }

  &-drawer {
    &__links {
      list-style: none;
    }
  }

  &-content__header {
    display: flex;
    flex-flow: row;
    width: 100%;
  }
}

.burger-btn {
  height: 64px;
  margin: 0;
  width: 64px;

  &--close {
    position: absolute;
    top: 24px;
    right: 24px;
  }
}
</style>
