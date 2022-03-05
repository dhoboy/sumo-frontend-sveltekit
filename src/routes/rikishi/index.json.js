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

    return {
			status: 200,
			body: {
				data: rikishiList || [],
			}
		}
	} catch (err) {
    return {
      status: 500,
      body: { err },
    }
  }
}
