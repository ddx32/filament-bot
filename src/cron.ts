import { postMessageToDefaultChannel } from "./modules/postMessageToDefaultChannel.ts";
import { fetchFilaments } from "./modules/fetchFilaments.ts";

Deno.cron("Update default channel", "*/15 * * * *", async () => {
  const filaments = await fetchFilaments();
  await postMessageToDefaultChannel(filaments);
});
