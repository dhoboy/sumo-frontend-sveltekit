<script>
import { theme } from "$lib/stores/theme.js";
import { fade } from "svelte/transition";

/*
 *	Renders out a Table.
 */

// [{ colKey: "rank",
//    display: "Rank",
//    imageKey: "image",           - optional, defaults to draw no image
//    linkFn: (entry) => `/path/`, - optional, takes column value and returns anchor link
//    sortKey: "rank_value",       - optional, defaults to colKey
//    sortType: "number" }, ...]
export let headers = [];

// [ { name: "Takakeisho", ... }, ... ]
export let data = [];

// { colKey: "name", direction: "asc", default: true }
export let sort = {};

const handleSortClick = ({ colKey }) => {
	sort.colKey = colKey;
	sort.direction = sort.direction === "asc" ? "desc" : "asc";
	sort.default = false; // don't fade the user sorting
}

// sorts by strings, numbers, and dates
$: displayData = data.sort((a, b) => {
	const { colKey, direction } = sort;
	const header = headers.find(h => h.colKey === colKey);
	const sortKey = header?.sortKey || header?.colKey;
	const sortType = header?.sortType;

	const aVal = a[sortKey];
	const bVal = b[sortKey];

	if (sortType === "string") {
		return direction === "asc" ? aVal?.localeCompare(bVal) : bVal?.localeCompare(aVal);
	} else if (sortType === "number") {
		return direction === "asc" ? aVal - bVal : bVal - aVal;
	} else if (sortType === "date") {
		const aDate = new Date(aVal);
		const bDate = new Date(bVal);
		return direction === "asc" ? aDate - bDate : bDate - aDate;
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
				<div key={colKey} class={`header-entry ${colKey}`} on:click={() => handleSortClick({ colKey })}>
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
		{#each displayData as item (item.id)}
			<li class="data-row" in:fade={{ duration: sort.default ? 500 : 0 }}>
				{#each headers as {colKey, imageKey, linkFn}}
					<div class="data-entry">
						{#if imageKey}
							<a href={linkFn ? linkFn(item?.[colKey]): null} class={`photo-entry ${$theme}`} sveltekit:prefetch>
								<img class="img" src={item?.[imageKey]} />
								<span>{item?.[colKey] || ""}</span>
							</a>
						{:else}
							<a href={linkFn ? linkFn(item?.[colKey]): null} class={$theme} sveltekit:prefetch>
								{item?.[colKey] || ""}
							</a>
						{/if}
					</div>
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
	}

	a {
		text-transform: capitalize;
		text-decoration: none;
		width: fit-content;
	}

	.header-entry {
		font-weight: bold;
		border-bottom: 1px solid;
		cursor: pointer;
	}

	.header-entry span:first-child {
		padding-right: 5px;
	}

	.photo-entry {
    display: flex;
		align-items: flex-start;
	}

	.photo-entry span {
		margin: auto 0;
		padding-left: 15px;
	}

	.img {
		width: 60px;
		height: 60px;
		border-radius: 90px;
		background-size: contain;
		background-position: left;
		border: 2px solid;
	}

  /* dark theme */
	.table.dark, a.dark {
    color: var(--text-gray-dk);
	}

	.table-headers.dark {
		background-color: var(--header-dk);
	}
</style>
