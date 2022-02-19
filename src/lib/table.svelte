<script>
import { theme } from "$lib/shared/stores/theme.js";

/*
 *	Renders out a Table.
 */
// [{ colKey: "rank", display: "Rank", sortKey: "rank_value", sortType: "number" ... }, ...]
// sortKey defaults to colKey if one isn't passed in
export let headers = [];

// [ { name: "Takakeisho", ... }, ... ]
export let data = [];

// { colKey: "name", direction: "asc" }
export let sort = {};

const handleSortClick = ({ colKey }) => {
	sort.colKey = colKey;
	sort.direction = sort.direction === "asc" ? "desc" : "asc";
}

// sorts by strings and numbers; dates later...
$: displayData = data.sort((a, b) => {
	const { colKey, direction } = sort;
	const header = headers.find(h => h.colKey === colKey);
	const sortKey = header?.sortKey || header?.colKey;
	const sortType = header?.sortType;

	const aVal = a[sortKey];
	const bVal = b[sortKey];

	if (sortType === "string") {
		return direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
	} else if (sortType === "number") {
		return direction === "asc" ? aVal - bVal : bVal - aVal;
	}
});

// NB: there was an issue getting something like this to re-render
// <i className={`fas fa-sort-alpha-${sort.direction === "asc" ? "up" : "down-alt"}`}></i>
</script>

<div class={`table ${$theme}`}>
	<!-- HEADERS -->
	<ul class={`table-headers ${$theme}`}>
		<li class="header-row">
			{#each headers as {colKey, display}}
				<div key={colKey} class="header-entry" on:click={() => handleSortClick({ colKey })}>
	        <span>{display}</span>
					{#if sort.colKey === colKey && sort.direction === "asc"}
            <span key={sort.direction}>
							<i key="asc" class="fas fa-sort-alpha-up"></i>
            </span>
					{:else if sort.colKey === colKey && sort.direction === "desc"}
            <span key={sort.direction}>
						  <i key="desc" class="fas fa-sort-alpha-down-alt"></i>
						</span>
	        {/if}
				</div>
			{/each}
		</li>
	</ul>
	<!-- ROWS -->
	<ul class="table-rows">
		{#each displayData as item}
			<li class="data-row">
				{#each headers as {colKey}}
					{#if colKey === "image"}
					  <span>img here...</span>
					{:else}
						<div key={`${item.rikishi}-${colKey}`} class="data-entry">
					    {item?.[colKey] || ""}
					  </div>
					{/if}
				{/each}
			</li>
		{/each}
	</ul>
</div>


<style>
  .table {
		color: var(--gray-black);
    display: table;
    width: 100%;
    margin: 0;
    padding: 0;
	}
  .table-headers {
    display: table-header-group;
		position: sticky;
		top: 0;
		background-color: #ccc; /* do light theme later ... */
  }
  .table-rows {
    display: table-row-group;
  }
  ul {
		margin: 0;
	}
  li.header-row, li.data-row {
    display: table-row;
	}
	.header-entry, .data-entry {
		display: table-cell;
		padding: 15px;
		vertical-align: middle;
		text-transform: capitalize;
	}
	.header-entry {
		font-weight: bold;
		border-bottom: 1px solid;
	}
	.header-entry span:first-child {
		padding-right: 5px;
	}

	.table.dark {
    color: var(--text-gray-dk);
	}
	.table-headers.dark {
		background-color: var(--header-dk);
	}
</style>
