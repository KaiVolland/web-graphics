<script lang="ts">
  import { speedFactor } from "../../store/shaderArt/speedFactor.js";
  export let id = "speed-slider";
</script>

<input
  id={id}
  type="range"
  min="100"
  max="3000"
  bind:value={$speedFactor}
>