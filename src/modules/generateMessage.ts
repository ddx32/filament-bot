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
  "How many kilograms of spools can you carry with your bare hands? Today's offer is extra spicy, don't you think?",
];

const noFilamentMessages = [
  "Today, life is not good. It seems that the polymers team has a whole bunch of nothing for us today.",
  "Do you feel the void? No filaments are available. What a scam.",
  "Were you already headed to get some filaments? Not so fast! There's nothing available for us peasants today.",
  "You might wanna reconsider printing that 20+ hour flower pot this weekend. Unless you want to buy your own filament, cause there's nothing for ya today.",
  "Brace yourself for disappointment. The polymers team has left us high and dry, with no filaments in sight. The abyss of nothingness awaits.",
  "Feel the creeping dread? The void has consumed our filaments. The shelves are as empty as a horror story.",
  "Were you about to grab some filament? Hold your horses! The cupboards are bare, leaving us starving for material.",
  "Dreaming of that long print? Think again! Unless you fancy sacrificing your own wallet, there's not a shred of filament to be found.",
  "Another day, another disappointment. Our filaments are gone, vanished into the ether. It's a wasteland out there.",
  "Walter White couldn't cook up any filament for us today. We're left with nothing but shattered dreams and empty spools.",
  "Feeling hopeful about printing? Think again. Our filament supplies have been wiped out like Gus Fring's enemies.",
  "Don't even think about starting that long print job. Unless you're willing to sell blue meth to fund your own filament, there's absolutely nothing available.",
  "Our filament reserves are as empty as the desert sky. The only thing breaking bad here is our supply chain.",
  "Ever feel like the universe is conspiring against you? No filaments today. It's like Heisenberg himself took our supply.",
  "Ready to print? Well, too bad! The filament stash is as barren as Saul Goodman's moral compass.",
  "You wanted filament? Tough luck. It's all gone, disappeared like Jesse Pinkman's hope for a normal life.",
  "Today’s forecast: a 100% chance of disappointment. The filament is gone, like Thanos snapped it out of existence.",
  "The dark side has won today. No filament available. It’s a Sith lord's dream come true.",
  "Avengers assemble… to mourn the loss of filament. We’re as empty as Tony Stark’s heart after Endgame.",
  "In the Game of Filaments, we’ve lost. The throne is empty, and winter has come.",
  "Got your heart set on printing? Forget it! We’re as dry as the Sahara, and the filament is missing like Atlantis.",
  "No filament today. It’s like Hogwarts ran out of magic. You’ll have to wait for another owl post.",
  "Thinking of printing? Not today! The filament is as gone as the dinosaurs in Jurassic Park.",
  "Your filament dreams just met their Red Wedding. There’s nothing left but carnage and sorrow.",
  "This is the day the music died. No filament to be found, and our dreams are buried six feet under.",
];

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
    "https://media.giphy.com/media/3o6Ztrk67E3iKaZyiA/giphy.gif",
  ];

  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": getRandomStringFromArray(noFilamentMessages),
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
