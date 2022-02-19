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
	import { monthMap } from "$lib/shared/utils.js";
	import TournamentSummary from "$lib/tournamentSummary.svelte";

	// passes props to the view component below
	// these have to be lets even through they're read only props, idk why
	// these have to be exports to recieve as props from module script above
	export let data;

	let months = Object.keys(monthMap);
	let monthsFilter = [];

	const toggleMonth = ({ month }) => {
		if (monthsFilter.includes(month)) {
      monthsFilter = monthsFilter.filter(m => m !== month);
		} else {
      monthsFilter = monthsFilter.concat(month);
		}
		filteredData = data; // reset filteredData
	}

	// build the dataset to show based on user's filter selections
	// if they don't choose any filters, show all the data
	$: filteredData = data.filter(({ year, month, rikishiSummaries }) => {
		let clause = true;
		if (monthsFilter.length) {
			clause = clause && monthsFilter.includes(month);
		}
		return clause;
	}).sort((a, b) => {
		return +b.year - +a.year || +b.month - +a.month;
	});

	// TODO: need some sort of way to select an arbitrary tournament
	// to go to its detail style page?
	// TODO: Build out filters by year and by rikishi
	// TODO: Make everything in the tables link to other pages
</script>

<div class={`tournament-filter ${$theme}`}>
	<h2>Filter</h2>
	<div class="date-filter">
		<span>By Month: </span>
		{#each months as month}
			<span
		    class={`month-tag${monthsFilter.includes(+month) ? " selected" : ""}`}
			  on:click={() => toggleMonth({ month: +month })}>
		    {monthMap[month]}
			</span>
		{/each}
	</div>
</div>
<div class={`tournament-list ${$theme}`}>
	{#each filteredData as {year, month, rikishiSummaries}}
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
	.tournament-list.dark, .tournament-filter.dark {
    color: var(--text-gray-dk);
	}
	.tournament-filter {
    display: flex;
		padding: 20px 0;
	}
	.month-tag {
	  padding: 5px 10px;
		margin: 10px;
		cursor: pointer;
		border-radius: 4px;
		user-select: none;
	}
	.month-tag.selected {
    background-color: var(--selected-item);
		color: var(--background-gray-dk);
	}
</style>
