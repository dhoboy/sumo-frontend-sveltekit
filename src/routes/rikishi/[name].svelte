<script context="module">
	export async function load({ fetch, params }) {
	  const { name } = params;
		const resp = await fetch(`/rikishi/${name}.json`)
		const data = await resp.json()

	  if (resp.ok) {
			return { props: { data } };
		}

		return {
		  status: resp.status,
			error: new Error("IDK, handle errors later")
		}
	}
</script>

<script>
  import { theme } from "$lib/stores/theme.js";
	import TournamentSummary from "$lib/tournamentSummary.svelte";
	import { monthMap } from "$lib/utils";

	// this line gets the props from the above script into this script
	export let data;

	// any variables or functions here are available in the html below
	const {
		currentRank,
		details,
		rankOverTime,
		resultsOverTime,
	} = data;

	const { name, image } = details;
	const { rank, rank_value, tournament } = currentRank;

	const imageUrl = `https://www3.nhk.or.jp${image}`;
	const lastActiveTournament = `${monthMap[tournament.month]} ${tournament.year}`;

	// formatting this the way TournamentSummary takes in data
	const resultSummaries = resultsOverTime.map(({
		month,
		year,
		rank,
		rank_value,
		results,
	}) => {
		return {
      month,
			year,
			rikishiSummaries: [{
				id: name,
        rikishi: name,
				rank,
				rank_value,
				...results,
			}],
		}
	});
</script>

<div class="rikishi-detail">
	<div class="header">
		<div class="img" style="background-image: url('{imageUrl}')"></div>
		<div class="header-details">
			<h2>{details.name}</h2>
			<span>{rank}</span>
			<span>{`Last Active Tournament: ${lastActiveTournament}`}</span>
		</div>
	</div>
	<div class={`tournament-list ${$theme}`}>
		{#each resultSummaries as {year, month, rikishiSummaries}}
			<TournamentSummary
		    year={year}
		    month={month}
		    rikishiSummaries={rikishiSummaries}
		  />
		{/each}
	</div>
</div>

<style>
	.rikishi-detail {
    color: var(--text-gray-dk);
		padding-top: 40px;
	}

	.rikishi-detail :global(.tournament-summary) {
    margin-bottom: 25px;
	}

	.img {
		width: 150px;
		height: 150px;
		border-radius: 90px;
		background-size: contain;
		background-position: left;
		border: 1px solid black;
	}

	.header {
    display: flex;
	}

	.header-details {
		display: flex;
		flex-direction: column;
		padding: 15px 0 0 25px;
	}

	h2 {
    padding-bottom: 15px;
	}
</style>
