import { getTournament } from './[year]/[month].json.js';

/* Util functions */
// callers await this and get the tournaments response
export const getTournamentsList = async () => {
  const resp = await fetch("http://localhost:3005/tournament/list");
	return resp.json();
}

// callers await this and get data appended to each tournament where it exists
export const getTournamentsData = async ({ tournamentsList = { items: [] } }) => {
	const calls = tournamentsList.items.map(async ({ month, year }) => {
		return {
			year,
			month,
			dataObj: await getTournament({ year, month }),
		};
	});
	return Promise.all(calls);
}

// TODO: Update Backend to not return stuff like 'rank-value' to the JS frontend
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
