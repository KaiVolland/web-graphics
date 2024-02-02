<script lang="ts">
  import { density } from "../../store/shaderArt/density.js";
  export let id = "density-slider";
</script>

<input
  type="number"
  min="1"
  max="30"
  bind:value={$density}
>
<input
  id={id}
  type="range"
  min="1"
  max="30"
  bind:value={$density}
>
