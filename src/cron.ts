import { fetchFilaments } from "./modules/fetchFilaments.ts";
import { postMessageToDefaultChannel } from "./modules/postMessageToDefaultChannel.ts";

const filamentHours = "23 13 * * 1,4";
const every10Mins = "*/10 * * * *";

Deno.cron("Update default channel", every10Mins, async () => {
  const filaments = await fetchFilaments();
  await postMessageToDefaultChannel(filaments);
});
