<script context="module">
	export async function load({ fetch }) {
		const resp = await fetch("/tournaments.json");
		const { data } = await resp.json();

	  if (resp.ok) {
			return {
				props: { data }
			};
		}

		return {
		  status: resp.status,
			error: new Error("IDK, handle errors later")
		}
	}
</script>

<script>
	// import re-usable components and stores
  import { theme } from "$lib/shared/stores/theme.js";
	import TournamentSummary from "$lib/tournamentSummary.svelte";

	// passes props to the view component below
	// these have to be lets even through they're read only props, idk why
	// these have to be exports to recieve as props from module script above
	export let data;

	// TODO: need some sort of way to select an arbitrary tournament
	// to go to its detail style page?
</script>

<div class={`tournament-list ${$theme}`}>
	{#each data as {year, month, rikishiSummaries}}
		<TournamentSummary
			year={year}
			month={month}
			rikishiSummaries={rikishiSummaries}
		/>
	{/each}
</div>

<style>
	.tournament-list :global(.tournament-summary) {
		max-height: 250px;
		overflow-y: scroll;
	}
	.tournament-list.dark {
    color: var(--text-gray-dk);
	}
</style>
