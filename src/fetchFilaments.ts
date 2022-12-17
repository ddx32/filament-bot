export async function fetchFilaments() {
  const endpoint = Deno.env.get("FACTORIFY_ENDPOINT");

  if (!endpoint) {
    throw new Error("Factorify endpoint was not provided");
  }

  const jsonResponse = await fetch(endpoint);
  return await jsonResponse.json();
}
