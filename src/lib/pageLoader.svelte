<script>
  import { theme } from "$lib/stores/theme.js";
	import rikishiSvg_dark from "$lib/assets/rikishi-dark.svg"

  let asset = $theme === "dark" ? rikishiSvg_dark : null;
</script>

<img src={asset} />

<style>
  img {
    --size: 300px;
    height: var(--size);
    position: fixed;
    inset: calc(50% - calc(var(--size) / 2));
    animation: move 2s infinite alternate;
  }

  @keyframes move {
    from {
      transform: translate3d(100px, 0, 0)
    }
    to {
      transform: translate3d(-100px, 0, 0)
    }
  }
</style>
