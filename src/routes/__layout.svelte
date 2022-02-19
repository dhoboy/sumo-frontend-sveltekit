<script>
  import "@fortawesome/fontawesome-free/js/all.js";
	import "../styles/colors.css";
	import "../styles/global.css";
  import Title from "$lib/title.svelte";
</script>

<header>
	<Title />
</header>
<main>
	<slot></slot>
</main>

