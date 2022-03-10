<script>
  import { theme } from "$lib/stores/theme.js";
	import { page } from "$app/stores";
	$: pathname = $page?.url?.pathname || "";
</script>

<h1 class={$theme}>
	Sumo
</h1>
<div class={$theme}>
	<a href="/rikishi"
	   sveltekit:prefetch
		 class={pathname.includes("/rikishi") ? "active" : ""}>
		Rikishi
	</a>
	<a href="/tournaments"
	   sveltekit:prefetch
		 class={pathname.includes("/tournaments") ? "active" : ""}>
		Tournaments
	</a>
	<a href="/techniques"
	   sveltekit:prefetch
		 class={pathname.includes("/techniques") ? "active" : ""}>
		Techniques
	</a>
	<a href="/matchups"
		 sveltekit:prefetch
		 class={pathname.includes("/matchups") ? "active" : ""}>
		Matchups
	</a>
</div>

<style>
	h1 {
		font-family: "Secular One", sans-serif;
		letter-spacing: 0.1em;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px solid #ccc;
		color: black;
	}
	div {
    display: flex;
		justify-content: space-around;
		padding: 15px 0;
	}
	a {
		font-family: "Secular One", sans-serif;
    text-decoration: none;
		font-size: 22px;
		padding-bottom: 2px;
	}
	a.active {
    border-bottom: 1px solid;
	}

	h1.dark {
    border-bottom-color: var(--red-dk);
	}
	h1.dark, div.dark a {
		color: var(--text-gray-dk);
	}
</style>
