<script context="module">
	export async function load({ fetch }) {
		const resp = await fetch("/rikishi.json");
		const { data } = await resp.json();

	  if (resp.ok) return { props: { data }};

		return {
		  status: resp.status,
			error: new Error("IDK, handle errors later")
		}
	}
</script>

<script>
	// import re-usable components and stores
  import { theme } from "$lib/stores/theme.js";

	export let data;

	// also have sort options to sort by rank
</script>

<div class={`rikishi-list ${$theme}`}>
  <ul>
		{#each data.items as rikishi}
			<li>
				<a
			    class={$theme}
			    sveltekit:prefetch
			    href={`/rikishi/${rikishi.name}`}
			  >
				  {rikishi.name}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	li {
    padding: 15px;
	}

	a {
    text-decoration: none;

	}

  /* dark theme */
	.rikishi-list.dark {
	}

	a.dark {
    color: var(--text-gray-dk);
	}

</style>

