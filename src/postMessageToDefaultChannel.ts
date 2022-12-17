import { generateMessage } from "./generateMessage.ts";

const SLACK_TOKEN = Deno.env.get("SLACK_TOKEN");
const CHANNEL_ID = Deno.env.get("CHANNEL_ID");
const API_BASE = 'https://slack.com/api'

export async function postMessageToDefaultChannel(filaments: FilamentObject[]) {
  const message = {
    channel: CHANNEL_ID,
    ...generateMessage(filaments, true),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SLACK_TOKEN}`,
    },
    body: JSON.stringify(message),
  };

  const response = await fetch(
    `${API_BASE}/chat.postMessage`,
    options
  );

  const responseJson = await response.json();
  console.log(responseJson)
}
