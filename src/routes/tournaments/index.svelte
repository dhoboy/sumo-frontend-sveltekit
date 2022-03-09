<script context="module">
	export async function load({ fetch }) {
		const resp = await fetch("/tournaments.json");
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
	import { slide } from 'svelte/transition';
  import { theme } from "$lib/stores/theme.js";
	import { monthMap } from "$lib/utils.js";
	import FilterSet from "$lib/filterSet.svelte";
	import TournamentSummary from "$lib/tournamentSummary.svelte";

	// passes props to the view component below
	// these have to be lets even through they're read only props, idk why
	// these have to be exports to recieve as props from module script above
	export let data;

	// Handling whether or not the filters are shown
	let filtersVisible = false;
	const toggleFiltersVisibility = () => {
		filtersVisible = !filtersVisible;
	}

	// available filter options for user to choose from
	let options = {
    month: Object.values(monthMap),
		year: data.reduce((acc, { year }) => {
			if (!acc.includes(year)) acc = acc.concat(year);
			return acc;
		}, []),
    rikishi: data.reduce((acc, { rikishiSummaries }) => {
			rikishiSummaries.forEach(({ rikishi }) => {
				if (!acc.includes(rikishi)) acc = acc.concat(rikishi);
			});
			return acc;
		}, []).sort((a, b) => a.localeCompare(b)),
	};

	// filters that user selects
	let filters = {
    month: [],   // January, ...
		year: [],    // 2022, ...
		rikishi: [], // TAKAKEISHO, ...
	};

	let filterTypes = Object.keys(filters);

  // user selects an option handler
	const toggleOption = ({ name, option }) => {
		if (filters[name].includes(option)) {
      filters[name] = filters[name].filter(d => d !== option);
		} else {
      filters[name] = filters[name].concat(option);
		}
		filteredData = data; // reset filteredData
	}

	// user clicks to clear out all filters for a given filterSet
	const clearFilterSet = ({ name }) => {
    filters[name] = [];
	}

	const clearAllFilters = () => {
		Object.keys(filters).forEach(key => {
      filters[key] = [];
    });
	}

	// build the dataset to show based on user's filter selections
	// if they don't choose any filters, show all the data
	$: filteredData = data.filter(({ year, month }) => {
		let clause = true;
		if (filters.month.length) {
			const monthName = monthMap[month];
			clause = clause && filters.month.includes(monthName);
		}
		if (filters.year.length) {
      clause = clause && filters.year.includes(year);
		}
		return clause;
	}).map(({ year, month, rikishiSummaries }) => {
		return {
      year,
			month,
			rikishiSummaries: filters.rikishi.length ? (
			  rikishiSummaries.filter(({ rikishi }) => {
					return filters.rikishi.includes(rikishi);
			  }))
			  : rikishiSummaries,
		}
	}).sort((a, b) => {
		return +b.year - +a.year || +b.month - +a.month;
	});

	// TODO: Make everything in the tables link to other pages
</script>

<div class="header">
	<h2 class={$theme} on:click={toggleFiltersVisibility}>
		<span>Apply Filters</span>
		{#if filtersVisible}
			<span>
				<i key="down" class="fas fa-solid fa-angle-down"></i>
			</span>
		{:else}
			<span>
				<i key="up" class="fas fa-solid fa-angle-up"></i>
			</span>
		{/if}
	</h2>
	<button
	  class={$theme}
	  on:click={clearAllFilters}>
		Clear All
	</button>
</div>
{#if filtersVisible}
	<div class={`tournament-filter ${$theme}`} transition:slide>
		{#each filterTypes as type}
	    <FilterSet
			  name={type}
			  searchBar={type === "rikishi"}
	      options={options[type]}
	      selected={filters[type]}
	      toggleOption={toggleOption}
			  clearFilterSet={clearFilterSet}
	    />
		{/each}
  </div>
{/if}
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
		overflow-y: auto;
	}
	.tournament-list.dark, .tournament-filter.dark, h2.dark {
    color: var(--text-gray-dk);
	}
	.header {
		display: flex;
		align-items: center;
		padding-right: 12px;
	}
	h2 {
		padding: 10px 12px 10px 0;
		cursor: pointer;
	}
	h2 span {
    padding-right: 5px;
	}
	button {
		font-size: 12px;
		margin-right: 12px;
		padding: 5px;
	}
</style>
