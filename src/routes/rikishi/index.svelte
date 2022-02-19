<script context="module">
	export async function load({ fetch }) {
		const resp = await fetch("http://localhost:3005/rikishi/list");
		const rikishiList = await resp.json();

	  if (resp.ok) {
			return {
				props: {
					rikishiList,
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
	export let rikishiList;

	// also have sort options to sort by rank
</script>

<div class="rikishi-list">
  <ul>
		{#each rikishiList.items as rikishi}
			<li>
				<a
			    sveltekit:prefetch
			    href={`/rikishi/${rikishi.name}`}
			  >
				  {rikishi.name}
				</a>
			</li>
		{/each}
	</ul>
</div>

