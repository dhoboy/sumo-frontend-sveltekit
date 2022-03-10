<script context="module">
  export async function load({ fetch, params }) {
    const { year, month } = params;
		const resp = await fetch(`/tournaments/${year}/${month}.json`);
		const { data } = await resp.json();

	  if (resp.ok) return { props: { year, month, data }};

		return {
		  status: resp.status,
			error: new Error("IDK, handle errors later")
		}
	}
</script>

<script>
	// import re-usable components and stores
	import { fade } from "svelte/transition";
  import { theme } from "$lib/stores/theme.js";
	import { monthMap } from "$lib/utils.js";
	import TournamentDay from "$lib/tournamentDay.svelte";

	// passes props to the view component below
	export let year;
	export let month;
	export let data;

	let monthName = monthMap[month];

	let days = Object.keys(data).map(dayKey => {
		const [_, day] = dayKey.split("day");
		return day;
	}).sort((a, b) => {
		return +a - +b;
	});

	let selectedDay = 1;

	let sort = {
		colKey: "east_rank", // column key to sort on
	  direction: "asc",    // or "asc"
		default: true,       // false when user applies a sort
	};

	// TODO: update route with a /day part when you click to change the day
	const setSelectedDay = ({ day }) => {
	  selectedDay = day;
		sort.default = true;
	}
</script>

<div class="tournament-detail">
	<h2 class={$theme}>{`${monthName} ${year}`}</h2>
	<div class={`day-list ${$theme}`}>
		{#each days as day}
			<span
			  class={`${$theme} day-list-tag${+selectedDay === +day ? " selected" : ""}`}
		    on:click={() => setSelectedDay({ day })}>
				Day {day}
			</span>
		{/each}
	</div>
	<TournamentDay
	  data={data[`day${selectedDay}`]}
	  sort={sort}
	/>
</div>

<style>
	.tournament-detail {
		padding-top: 20px;
	}

	h2 {
    padding-bottom: 10px;
	}

	.day-list {
    display: flex;
		justify-content: space-between;
		padding: 15px 15px 25px 15px;
		border-top: 1px solid;
	}

	.day-list-tag {
	  padding: 5px 10px;
		margin: 10px;
		cursor: pointer;
		border-radius: 4px;
		user-select: none;
		text-align: center;
	}

  /* dark theme */
	h2.dark {
    color: var(--text-gray-dk);
	}

	.day-list.dark {
    color: var(--text-gray-dk);
	}

  .day-list-tag.selected.dark {
		color: var(--background-gray-dk);
    background-color: var(--selected-item);
	}
</style>
