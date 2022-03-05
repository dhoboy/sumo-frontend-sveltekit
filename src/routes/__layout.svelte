<script>
  import "@fortawesome/fontawesome-free/js/all.js";
	import "../styles/colors.css";
	import "../styles/global.css";
	import { navigating } from "$app/stores";
	import PageLoader from "$lib/pageLoader.svelte";
  import Title from "$lib/title.svelte";

	// basic page loader
	$: pageLoading = !!$navigating;
</script>

<header>
	<Title />
</header>
<main>
	{#if pageLoading}
		<PageLoader />
	{:else}
		<slot></slot>
	{/if}
</main>

