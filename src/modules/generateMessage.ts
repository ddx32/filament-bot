import { FilamentObject } from "../types.ts";

function generateBlocks(filaments: FilamentObject[]) {
  return filaments.map((filament) => ({
    type: "section",
    text: {
      type: "mrkdwn",
      text:
        `*${filament.name}*\n\nMaterial: ${filament.type}\n\nStock amount: *${filament.stockAmount.toString()}*`,
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

function getRandomStringFromArray(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getNoStockMessageBlocks() {
  const images = [
    "https://media.giphy.com/media/Az1CJ2MEjmsp2/giphy.gif",
    "https://media.giphy.com/media/26hkhPJ5hmdD87HYA/giphy.gif",
    "https://media.giphy.com/media/giXLnhxp60zEEIkq8K/giphy-downsized-large.gif",
    "https://media.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif",
    "https://media.giphy.com/media/baPIkfAo0Iv5K/giphy.gif"
  ];

  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text":
          "Today, life is not good. It seems that the polymers team has a whole bunch of nothing for us today. Try fetching the inventory status closer to the official pick-up time (Tuesday, Thursday 13:30 - 14:30).",
      },
    },
    {
      "type": "image",
      "image_url": getRandomStringFromArray(images),
      "alt_text": "empty stock",
    },
  ];
}

export function generateMessage(
  filaments: FilamentObject[],
  scheduled = false,
) {
  if (filaments.length <= 0) {
    return {
      blocks: getNoStockMessageBlocks(),
    };
  }

  return {
    blocks: [...getInitialBlocks(scheduled), ...generateBlocks(filaments)],
  };
}
