/* Util functions */
export const getTournamentBouts = async ({ year, month }) => {
  const url = `http://localhost:3005/bout/list?year=${year}&month=${month}`;
	const resp = await fetch(url);
	return resp.json();
}


/* API for page components */
export async function get({ params }) {
	const { year, month } = params;

	try {
		const boutList = await getTournamentBouts({ year, month });

		// just getting every day's bouts here for now; grouping by day
		const boutsByDay = boutList.reduce((acc, bout) => {
			const dayKey = `day${bout.day}`;
      if (!acc[dayKey]) acc[dayKey] = [];

			acc[dayKey] = acc[dayKey].concat(bout);
			return acc;
		}, {});

		return {
			status: 200,
			body: {
				data: boutsByDay || {},
			}
		}
	} catch (err) {
    return {
      status: 500,
			body: { err },
		}
	}
}


