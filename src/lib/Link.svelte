<script lang="ts">
  import { link, location } from 'svelte-spa-router'
  export let href = "";
</script>

<a href={href} use:link class:active={$location === href}>
  <slot />
</a>

<style lang="less">
  a {
    color: var(--text-color-light);
    text-decoration: none;

    &:hover {
      color: var(--text-color-dark);
    }

    &.active {
      font-weight: bold;
    }
  }
</style>
