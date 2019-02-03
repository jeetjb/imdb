<template>
  <div id="app">
    <div id="nav">
      <hr><h2>
      <router-link to="/">Home</router-link> |
      <router-link to="/add">Add</router-link></h2>
      <hr>
    </div>
    <router-view/>
  </div>
</template>

<style  scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: #2c3e50;
  color: #2c3e50;
  background-color:#ddffd3;
  min-height: 100vh;
}
#nav {
  padding: 10px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
