<script lang="ts">
  import { speedFactor } from "../../store/shaderart/speedFactor.js";
  export let id = "speed-slider";
</script>

<input
  type="number"
  min="100"
  max="3000"
  bind:value={$speedFactor}
>
<input
  id={id}
  type="range"
  min="100"
  max="3000"
  bind:value={$speedFactor}
>
