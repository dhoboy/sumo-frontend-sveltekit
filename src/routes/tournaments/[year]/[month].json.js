/* Util functions */
// callers await this and get the tournament response
export const getTournament = async ({ year, month }) => {
	const url = `http://localhost:3005/tournament/details/${year}/${month}`;
	const resp = await fetch(url);
	return resp.json();
}

/* API for page components */
export async function get({ params }) {
	const { year, month } = params;

	try {
		const details = await getTournament({ year, month });

		return {
			status: 200,
			body: {
				details,
			}
		}
	} catch (err) {
    return {
      status: 500,
			body: { err },
		}
	}
}


