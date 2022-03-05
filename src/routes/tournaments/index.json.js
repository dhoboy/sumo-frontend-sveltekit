/* Util functions */
// callers await this and get the tournaments response
export const getTournamentsList = async () => {
  const resp = await fetch("http://localhost:3005/tournament/list");
	return resp.json();
}

// callers await this and get tournament summary
export const getTournamentDetails = async ({ year, month }) => {
	const url = `http://localhost:3005/tournament/details/${year}/${month}`;
	const resp = await fetch(url);
	return resp.json();
}

// callers await this and get data appended to each tournament where it exists
export const getTournamentsData = async ({ tournamentsList = { items: [] } }) => {
	const calls = tournamentsList.items.map(async ({ month, year }) => {
		return {
			year,
			month,
			dataObj: await getTournamentDetails({ year, month }),
		};
	});
	return Promise.all(calls);
}

// TODO: Update Backend to not return keys named like 'rank-value' to the JS frontend
export async function get() {
	try {
	  const tournamentsList = await getTournamentsList();
    const tournamentsData = await getTournamentsData({ tournamentsList });

		return {
			status: 200,
			body: {
				data: tournamentsData.map(({ year, month, dataObj }) => {
          return {
            year,
						month,
						rikishiSummaries: (dataObj?.items || []).map(summary => {
							return {
								id: summary?.rikishi || Math.random().toString(36).slice(2),
								rikishi: summary?.rikishi || "",
								rank: summary?.rank || "",
								rank_value: summary?.["rank-value"] || "",
								...summary?.results || {},
							}
						})
					}
				})
			}
		};
	} catch(err) {
		console.log("err in tournaments/index.json.js: ", err)
		return {
      status: 500,
			body: { err },
		}
	};
}
