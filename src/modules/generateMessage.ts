import { FilamentObject } from "../types.ts";

function generateBlocks(filaments: FilamentObject[]) {
  return filaments.map((filament) => ({
    type: "section",
    text: {
      type: "mrkdwn",
      text:
        `*${filament.name}*\n\nStock amount: *${filament.stockAmount.toString()}*`,
    },
    accessory: {
      type: "image",
      image_url: filament.imageUrl,
      alt_text: filament.name,
    },
  }));
}

function getInitialBlocks(scheduled: boolean) {
  const welcomeMessage = scheduled
    ? ":clock2: Hey, it's almost time to go get some new filament spools. Here's what's available today:"
    : ":man-raising-hand: Hello, here's what's currently available:";

  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: welcomeMessage,
      },
    },
    {
      type: "divider",
    },
  ];
}

export function generateMessage(
  filaments: FilamentObject[],
  scheduled = false,
) {
  if (filaments.length <= 0) {
    return {
      text: "Today, life is not good.",
    };
  }

  return {
    blocks: [...getInitialBlocks(scheduled), ...generateBlocks(filaments)],
  };
}
