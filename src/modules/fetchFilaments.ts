import { FilamentObject } from "../types.ts";

type IResponseItem = {
  img_url: string;
  title: string;
  type: string;
  key1: string;
  val1: number;
  right_color: string;
};

export async function fetchFilaments(): Promise<FilamentObject[]> {
  const factorifyUrl = Deno.env.get("FACTORIFY_URL");
  const endpoint = Deno.env.get("FILAMENTS_ENDPOINT");

  if (!endpoint || !factorifyUrl) {
    throw new Error("Factorify endpoint was not provided");
  }

  const jsonResponse = await fetch(`${factorifyUrl}${endpoint}`);
  const responseData = await jsonResponse.json() as IResponseItem[];
  const filamentItems: FilamentObject[] = responseData.map((item) => ({
    name: item.title,
    type: item.type,
    stockAmount: item.val1,
    imageUrl: `${factorifyUrl}/${item.img_url}`,
  }));

  return filamentItems;
}
