<script context="module">
	export async function load({ fetch }) {
		const resp = await fetch("/rikishi.json");
		const { data, latestTournament } = await resp.json();

	  if (resp.ok) return { props: { data, latestTournament }};

		return {
		  status: resp.status,
			error: new Error("IDK, handle errors later")
		}
	}
</script>

<script>
	// import re-usable components and stores
  import { theme } from "$lib/stores/theme.js";
	import FilterSet from "$lib/filterSet.svelte";
	import Table from "$lib/table.svelte";
	import { monthMap } from "$lib/utils.js"

	export let data;
	export let latestTournament;

	let headers = [{
		colKey: "name",
		display: "Rikishi",
		sortType: "string",
		imageKey: "imageUrl",
		linkFn: (name) => `/rikishi/${name}`,
	}, {
		colKey: "rank",
		display: "Rank",
		sortKey: "rank_value",
		sortType: "number",
	}, {
		colKey: "lastTournamentActive",
		display: "Last Tournament Active",
		sortKey: "lastTournamentActive_date",
		sortType: "date",
		linkFn: (str) => {
			const [month, year] = str.split(" ");
			return `/tournaments/${year}/${monthMap?.[month]}`;
		}
	}];

	let sort = {
		colKey: "rank", // column key to sort on
		direction: "asc", // or "asc"
	};

	// filter text functions
	let searchText = "";

	const clearSearchText = () => {
		searchText = "";
	}

	// filterSet functions
	let filters = [];

	const clearFilterSet = () => filters = [];

	const options = [
		"Sanyaku",
		"Maegashira",
		"Juryo",
		"Active",
		"Inactive",
	];

  // user selects an option handler
	const toggleOption = ({ option }) => {
		if (filters.includes(option)) {
      filters = filters.filter(d => d !== option);
		} else {
      filters = filters.concat(option);
		}
		filteredData = data; // reset filteredData
	}

	// build the dataset to show based on user's filter selections
	// if they don't choose any filters, show all the data
	// TODO: Maybe break these into rank and active/inactive groups
	// TODO: AND / OR ? disticnction
	$: filteredData = data.filter(item => {
		let clause = true;
		// rank is a little messy, b/c there are a different number of Maegashira each basho AFAIK
		if (filters.includes("Sanyaku")) {
			clause = clause && +item.rank_value <= 4;
		}
		if (filters.includes("Maegashira")) {
			const [rankClass, val] = item.rank.split("#");
      clause = clause && rankClass.trim() === "Maegashira";
		}
		if (filters.includes("Juryo")) {
			const [rankClass, val] = item.rank.split("#");
      clause = clause && rankClass.trim() === "Juryo";
		}
		if (filters.includes("Active")) {
      clause = clause && item.lastTournamentActive === latestTournament;
		}
		if (filters.includes("Inactive")) {
      clause = clause && item.lastTournamentActive !== latestTournament;
		}
		if (searchText.length) {
		  // only options that start with user-entered text, case insensitive
			const regex = new RegExp(`^${searchText}`, 'i');
			clause = clause && regex.test(item.name);
		}
		return clause;
	});
</script>

<div class="rikishi-search-and-filters">
	<div class={`search-bar ${$theme}`}>
		<input
		  class={$theme}
		  placeholder="Search..."
	    bind:value={searchText}
	  />
		<span on:click={clearSearchText}>x</span>
	</div>
	<div class={`rikishi-filters ${$theme}`}>
		<FilterSet
			options={options}
		  selected={filters}
		  toggleOption={toggleOption}
		  clearFilterSet={clearFilterSet}
		/>
		<p>Filter: </p>
	</div>
</div>
<div class={`rikishi-list ${$theme}`}>
  <Table
		headers={headers}
		data={filteredData}
		sort={sort}
	/>
</div>

<style>
	li {
    padding: 15px;
	}

	a {
    text-decoration: none;
	}

	.rikishi-search-and-filters {
    padding: 25px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.search-bar {
    position: relative;
	}

	.search-bar span {
    position: absolute;
		right: 20px;
		top: 5px;
		font-size: 14px;
		cursor: pointer;
		line-height: 1em;
	}

	.rikishi-filters {
    display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.rikishi-filters p {
    padding: 15px;
		font-weight: 700;
	}

	.search-bar input {
    height: fit-content;
		width: 350px;
		padding: 5px 20px 5px 5px;
		border-radius: 4px;
		margin: 0 10px;
	}

	.rikishi-search-and-filters :global(.name-and-search-bar) {
    padding-top: 0px;
		margin: 15px;
	}

  /* dark theme */
	.rikishi-filters.dark {
    color: var(--text-gray-dk);
	}

	label.dark {
    color: var(--text-gray-dk);
	}

	a.dark {
    color: var(--text-gray-dk);
	}

	input.dark {
		color: var(--text-md-gray-dk);
		border: 1px solid var(--text-gray-dk);
		background-color: var(--background-md-gray-dk);
	}

	input.dark::placeholder {
		color: var(--text-md-gray-dk);
	}

	.search-bar.dark span {
		color: var(--text-gray-dk);
	}
</style>

