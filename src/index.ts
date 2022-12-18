import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { load } from "https://deno.land/std@0.168.0/dotenv/mod.ts";

import { generateMessage } from "./modules/generateMessage.ts";
import { postMessageToDefaultChannel } from "./modules/postMessageToDefaultChannel.ts";
import { FilamentObject } from "./types.ts";

await load({ export: true });

const filaments: FilamentObject[] = [
  {
    name: "Prusament Gentlemans blue PLA",
    stockAmount: 25,
    imageUrl: "https://cdn.prusa3d.com/content/images/product/default/4704.png",
  },
  {
    name: "Prusament PLA Blend My Silverness",
    stockAmount: 15,
    imageUrl: "https://cdn.prusa3d.com/content/images/product/default/4629.jpg",
  },
];

serve(async (_req) => {
  const requestUrl = new URL(_req.url);

  if (requestUrl.pathname === "/get-current" && _req.method === "POST") {
    const responseMessage = {
      ...generateMessage(filaments),
      "response_type": "in_channel",
    };
    return new Response(JSON.stringify(responseMessage), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (requestUrl.pathname === "/update-channel") {
    await postMessageToDefaultChannel(filaments);
    return new Response(
      "Successfully posted an update to the default channel.",
      {
        headers: {
          "content-type": "text/plain",
        },
      },
    );
  }

  return new Response("Error: invalid request", {
    headers: {
      "content-type": "text/plain",
    },
    status: 500,
  });
});
