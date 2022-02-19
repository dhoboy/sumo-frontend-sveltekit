<script>
  // import re-usable components and stores
  import { theme } from "$lib/shared/stores/theme.js";
	import { monthMap } from "$lib/shared/utils.js";
	import Table from "$lib/table.svelte";

	// passes props to the view component below
	// these have to be lets even through they're read only props, idk why
	// these have to be exports to recieve as props from module script above
	export let year;
	export let month;
	export let rikishiSummaries;

	let headers = [
		{ colKey: "rikishi", display: "Rikishi", sortType: "string" },
		{ colKey: "rank", display: "Rank", sortKey: "rank_value", sortType: "number" },
		{ colKey: "wins", display: "Wins", sortType: "number" },
		{ colKey: "losses", display: "Losses", sortType: "number" },
		{ colKey: "result", display: "Result", sortType: "string" },
	];

	let sort = {
		colKey: "wins", // column key to sort on
		direction: "desc", // or "asc"
	};
</script>


<a
	class={$theme}
	href={`/tournaments/${year}/${month}`}
	sveltekit:prefetch
>
 <h2>{monthMap[+month]} {year}</h2>
</a>
<div class="tournament-summary">
	<Table
	  headers={headers}
	  data={rikishiSummaries}
	  sort={sort}
	/>
</div>


<style>
	.tournament-summary {
		border: 1px solid;
		border-radius: 4px;
		margin-bottom: 50px;
	}
	a {
		font-size: 22px;
		text-decoration: none;
	}
	h2 {
    margin: 15px 0;
	}
</style>
