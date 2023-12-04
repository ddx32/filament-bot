import { fetchFilaments } from "./modules/fetchFilaments.ts";
import { postMessageToDefaultChannel } from "./modules/postMessageToDefaultChannel.ts";

const filamentHours = "23 12 * * 2,5";
const every10Mins = "*/10 * * * *";

Deno.cron("Update default channel", filamentHours, async () => {
  const filaments = await fetchFilaments();
  await postMessageToDefaultChannel(filaments);
});
