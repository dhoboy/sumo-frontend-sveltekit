import { monthMap } from "$lib/utils.js";
import { getTournamentsList } from "../tournaments/index.json.js";

/* Util functions */
export const getRikishiList = async () => {
  const url = `http://localhost:3005/rikishi/list`;
	const resp = await fetch(url);
	return resp.json();
}

/* API for page components */
export async function get() {
  try {
    const rikishiList = await getRikishiList();
	  const tournamentsList = await getTournamentsList();

    // rikishi are active if they have data for the latest tournament
    const { month: latestMonth, year: latestYear } = tournamentsList?.items?.[0];
    const latestTournament = `${monthMap[latestMonth]} ${latestYear}`;

    const data = (rikishiList?.items || []).map(item => {
      const { rank, tournament: { year, month }, rank_value } = item.rank;
      return {
        ...item,
        rank,
        rank_value,
        lastTournamentActive: `${monthMap[month]} ${year}`,
        lastTournamentActive_date: new Date(year, month - 1, 15), // used for sorting
        imageUrl: `https://www3.nhk.or.jp${item.image}`,
      };
    });

    return {
			status: 200,
			body: {
        data,
        latestTournament,
			}
    }
	} catch (err) {
    return {
      status: 500,
      body: { err },
    }
  }
}
