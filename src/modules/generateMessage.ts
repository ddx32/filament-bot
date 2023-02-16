import { FilamentObject } from "../types.ts";

function generateBlocks(filaments: FilamentObject[]) {
  return filaments.map((filament) => ({
    type: "section",
    text: {
      type: "mrkdwn",
      text:
        `*${filament.name}*\n>Material: *${filament.type}*\n>*${filament.stockAmount.toString()}* available`,
    },
    accessory: {
      type: "image",
      image_url: filament.imageUrl,
      alt_text: filament.name,
    },
  }));
}

function getRandomStringFromArray(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

const scheduledMessages = [
  ":clock2: Hey, it's almost time to go get some new filament spools. Here's what's available today:",
  "Is your office running out of filament? Show your workmates some gratitude by fetching some fresh spools now! Currently on tap:",
  "Don't forget to help the Polymers team get rid of some 2nd grade filament spools! Feel free to choose from these beauties:",
  "Time to get up and stretch, it's good for your body, mind, and productivity. AND you can get some free filaments! Here's what's available right now:",
  "Not ready to spend those Prusameters for the perfect spool yet? Bridge the gap with some 2nd grade stuff. Now available:",
  "How many kilograms of spools can you carry with your bare hands? Today's offer is extra spicy, don't you think?"
]

const noFilamentMessages = [
  "Today, life is not good. It seems that the polymers team has a whole bunch of nothing for us today.",
  "Do you feel the void? No filaments are available. What a scam.",
  "Were you already headed to get some filaments? Not so fast! There's nothing available for us peasants today.",
  "You might wanna reconsider printing that 20+ hour flower pot this weekend. Unless you want to buy your own filament, cause there's nothing for ya today."
]

function getInitialBlocks(scheduled: boolean) {
  const welcomeMessage = scheduled
    ? getRandomStringFromArray(scheduledMessages)
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

function getNoStockMessageBlocks() {
  const images = [
    "https://media.giphy.com/media/Az1CJ2MEjmsp2/giphy-downsized.gif",
    "https://media.giphy.com/media/26hkhPJ5hmdD87HYA/giphy-downsized.gif",
    "https://media.giphy.com/media/giXLnhxp60zEEIkq8K/giphy-downsized.gif",
    "https://media.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy-downsized.gif",
    "https://media.giphy.com/media/baPIkfAo0Iv5K/giphy-downsized.gif",
    "https://media.giphy.com/media/iGpkO05xWTl17Vhq6Y/giphy.gif",
    "https://media.giphy.com/media/7SF5scGB2AFrgsXP63/giphy-downsized.gif",
    "https://media.giphy.com/media/W0c3xcZ3F1d0EYYb0f/giphy-downsized.gif",
    "https://media.giphy.com/media/SUzPI5wAkp6UXMEkok/giphy.gif",
    "https://media.giphy.com/media/3o6Ztrk67E3iKaZyiA/giphy.gif"
  ];

  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": getRandomStringFromArray(noFilamentMessages)
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
