import { fetchFilaments } from "./src/modules/fetchFilaments.ts";
import { postMessageToDefaultChannel } from "./src/modules/postMessageToDefaultChannel.ts";

Deno.cron("Update default channel", "23 13 * * 1,4", async () => {
  const filaments = await fetchFilaments();
  await postMessageToDefaultChannel(filaments);
});
