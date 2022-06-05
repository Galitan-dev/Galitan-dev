<template>
  <div class="container block">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <h1 class="navbar-item title">
          Bulma Demo
        </h1>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">
            Home
          </router-link>
          <router-link to="/about" class="navbar-item">
            About
          </router-link>
          <router-link to="/demo" class="navbar-item">
            Demo
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <router-link to="/" class="navbar-item">
                Home
              </router-link>
              <router-link to="/about" class="navbar-item">
                About
              </router-link>
              <router-link to="/demo" class="navbar-item">
                Demo
              </router-link>
              <hr class="navbar-divider">
              <router-link to="/notfound" class="navbar-item">
                Explore the depths
              </router-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>

    </nav>
  </div>
</template>

<script lang="ts">
export default {
  name: 'About',
}
</script>
