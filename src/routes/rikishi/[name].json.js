
export async function get(things) {
  // call the sumo backend here
	// TODO: re-work backend so I dont call 5 things for one FE page
	console.log("things: ", things)
	const { name } = things.params;
	try {
		const detailsResp = await fetch(`http://localhost:3005/rikishi/details/${name}`);
		const currentRankResp = await fetch(`http://localhost:3005/rikishi/current_rank/${name}`);
		const rankOverTimeResp = await fetch(`http://localhost:3005/rikishi/rank_over_time/${name}`);
		const resultsOverTimeResp = await fetch(`http://localhost:3005/rikishi/results_over_time/${name}`);
		// const techniqueBreakdownResp = await fetch(`http://localhost:3005/rikishi/technique_breakdown/${name}`);

		const details = await detailsResp.json();
		const currentRank = await currentRankResp.json();
		const rankOverTime = await rankOverTimeResp.json();
		const resultsOverTime = await resultsOverTimeResp.json();
		// const techniqueBreakdown = await techniqueBreakdownResp.json();

		return {
			status: 200,
			body: {
				details: details.items?.[0],
				currentRank: currentRank.items?.[0],
				rankOverTime: rankOverTime.items,
				resultsOverTime: resultsOverTime.items,
				// techniqueBreakdown,
			}
	  }
	} catch (err) {
		console.log("err: ", err)
    return {
      status: 500,
			body: { err },
		}
	}
}
