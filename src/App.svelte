<script lang="ts">
  import {link} from 'svelte-spa-router'
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import ShaderArt from './routes/shaderart/ShaderArt.svelte';

  const routes = {
    '/': Home,
    // Exact path
    '/shaderart': ShaderArt,
  };
</script>

<div class="content">
  <header>
    <nav>
      <a href="/home" use:link>Home</a>
      <a href="/shaderart" use:link>Shader Art</a>
    </nav>
  </header>
  <main>
    <Router {routes} />
  </main>
</div>

<style lang="less">
  div.content {
    height: 100%;
    display: flex;
    flex-direction: column;

    header {
      height: 3em;
    }
    main {
      flex: 1;
      overflow: auto;
    }
  }
</style>
