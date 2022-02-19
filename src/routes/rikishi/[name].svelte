<script context="module">
	export async function load({ fetch, params }) {
	  const { name } = params;
		const resp = await fetch(`/rikishi/${name}.json`)
		const data = await resp.json()

		console.log("data: ", data)

	  if (resp.ok) {
			return {
			  props: {
			    data,
				}
			};
		}

		return {
		  status: resp.status,
			error: new Error("IDK, handle errors later")
		}
	}
</script>

<script>
	// this line gets the props from the above script into this script
	export let data;

	// any variables or functions here are available in the html below
	const {
		currentRank,
		details,
		rankOverTime,
		resultsOverTime,
	} = data;

	const imageUrl = `https://www3.nhk.or.jp${details.image}`;
</script>

<div class="rikishi-detail">
	{details.name}
	<div class="img" style="background-image: url('{imageUrl}')" />
	{currentRank.rank}
</div>

<style>
	.img {
		width: 60px;
		height: 60px;
		border-radius: 90px;
		background-size: contain;
		background-position: left;
		border: 1px solid black;
	}
</style>
