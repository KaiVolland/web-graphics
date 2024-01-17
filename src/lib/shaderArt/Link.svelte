<script lang="ts">
  import { link, location } from 'svelte-spa-router'
  export let href = "";
</script>

<a href={href} use:link class:active={$location === href}>
  <slot />
</a>

<style lang="less">
  a {
    color: var(--text-color);
    text-decoration: none;

    &.active {
      font-weight: bold;
      color: var(--text-color-active);
    }
  }
</style>