export function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0;
}

export async function fetcher(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return res.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}
