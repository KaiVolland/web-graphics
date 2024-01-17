<script lang="ts">
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import ShaderArt from './routes/shaderart/ShaderArt.svelte';
  import Link from './lib/shaderArt/Link.svelte';

  const routes = {
    '/': Home,
    // Exact path
    '/shaderart': ShaderArt,
  };
</script>

<div class="content">
  <header>
    <nav>
      <Link href="/home">Home</Link>
      <Link href="/shaderart">Shader Art</Link>
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
