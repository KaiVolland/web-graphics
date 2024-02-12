<script lang="ts">
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import ShaderArt from './routes/shaderart/ShaderArt.svelte';
  import Link from './lib/Link.svelte';
  import Engine from './routes/Engine.svelte';

  const routes = {
    '/': Home,
    // Exact path
    '/shaderart': ShaderArt,
    '/engine': Engine
  };
</script>

<div class="content">
  <header>
    <nav>
      <Link href="/engine">Engine</Link>
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
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    nav {
      font-size: 1.2em;

      :global(a) {
        padding: 0.6em;
      }
    }

    main {
      position: relative;
      height: 100%;
      flex: 1;
      overflow: auto;
    }
  }
</style>
