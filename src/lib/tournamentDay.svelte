 <script>
  // import re-usable components and stores
	import { fade } from "svelte/transition";
  import { theme } from "$lib/stores/theme.js";
	import { monthMap } from "$lib/utils.js";
	import Table from "$lib/table.svelte";

	// passes props to the view component below
	// these have to be lets even through they're read only props, idk why
	// these have to be exports to recieve as props from module script above
	export let data;
	export let sort;

	let headers = [
		{ colKey: "east", display: "East", sortType: "string" },
		{ colKey: "east_rank", display: "East Rank", sortKey: "east_rank_value", sortType: "number" },
		{ colKey: "west", display: "West", sortType: "string" },
		{ colKey: "west_rank", display: "West Rank", sortKey: "west_rank_value", sortType: "number" },
		{ colKey: "winner", display: "Winner", sortType: "string" },
		/* { colKey: "loser", display: "Loser", sortType: "string" }, */
		{ colKey: "technique", display: "Technique", sortType: "string" },
		{ colKey: "technique_en", display: "Technique Description", sortType: "string" },
		{ colKey: "technique_category", display: "Technique Category", sortType: "string" },
		/* { colKey: "is_playoff", display: "Playoff Match", sortType: "string" }, */
	];
</script>

<div class="tournament-day">
	<Table
	  headers={headers}
	  data={data}
	  sort={sort}
	/>
</div>

