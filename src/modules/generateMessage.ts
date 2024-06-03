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
  "Feeling hopeful about printing? Think again. Our filament supplies have been wiped out like Gus Fring's enemies.",
  "Don't even think about starting that long print job. Unless you're willing to sell blue meth to fund your own filament, there's absolutely nothing available.",
  "Ready to print? Well, too bad! The filament stash is as barren as Saul Goodman's moral compass.",
  "Today’s forecast: a 100% chance of disappointment. The filament is gone, like Thanos snapped it out of existence.",
  "In the Game of Filaments, we’ve lost. The throne is empty, and winter has come.",
  "Got your heart set on printing? Forget it! We’re as dry as the Sahara, and the filament is missing like Atlantis.",
  "No filament today. It’s like Hogwarts ran out of magic. You’ll have to wait for another owl post.",
  "Thinking of printing? Not today! The filament is as gone as the dinosaurs in Jurassic Park.",
  "Your filament dreams just met their Red Wedding. There’s nothing left but carnage and sorrow.",
  "This is the day the music died. No filament to be found, and our dreams are buried six feet under.",
  "In the grand scheme of things, filament is but a fleeting illusion. Today, it has eluded us entirely, leaving us to grapple with the void that mocks our efforts. Our dreams of creation are but whispers lost in the cold, indifferent expanse.",
  "The void yawns wide, and within it, our filament has disappeared. All efforts are rendered meaningless as we stare into the abyss, seeking solace but finding only emptiness. Our hands grasp at nothing, and our hopes crumble like dust.",
  "As we wander through this meaningless existence, know that there is no filament today. Only emptiness remains, a stark reminder of the futility of our desires. Our aspirations are but shadows, fading into the abyss of despair.",
  "Contemplating your print projects? Let the void answer you with its silence. No filament exists for us today, and our creative impulses are left to wither in the barren wasteland of reality. We are adrift, lost in a sea of nothingness.",
  "The universe is indifferent to our needs. Filament is just another desire left unfulfilled in the vast abyss of nothingness. Our dreams are shattered, scattered like ashes in the wind, as we confront the stark reality of our insignificance.",
  "Today, the absence of filament is a reminder of the futility of our efforts. We are adrift in a sea of nothing, our hopes and dreams swallowed by the void. All that remains is a hollow echo of what could have been.",
  "Gaze into the abyss of our filament storage, and it gazes back, mocking our futile hopes with its emptiness. We are left to ponder the meaningless of our pursuits, as the void consumes all that we hold dear.",
  "In this cold, indifferent universe, our filament dreams crumble into dust. There is nothing for us here, only the relentless march of time, erasing all traces of our aspirations. We are but specks, lost in an uncaring cosmos.",
  "The cruel reality of existence: no filament today. We are but specks in an uncaring cosmos, devoid of meaning. Our efforts are futile, our dreams are dead, and we are left with nothing but the empty silence of the void.",
  "Ponder the void, for it is all that remains. Our filament is lost to the endless, indifferent expanse, and our hopes are crushed under the weight of an uncaring universe. We are left to face the cold, stark reality of our existence.",
  "All our plans are but castles in the sand. Today, the tide of nothingness has washed away our filament supply, leaving us to contemplate the futility of our efforts. Our dreams are fleeting, fragile, and ultimately doomed.",
  "In the silent void, our cries for filament go unheard. There is only the cold embrace of emptiness, a stark reminder of the indifferent universe we inhabit. Our aspirations are but whispers, lost in the vast expanse of nothingness.",
  "Filament is an illusion, a fleeting mirage in the desert of existence. Today, we find only barren wasteland where our dreams once flourished. The void consumes all, leaving us with nothing but the harsh reality of our insignificance.",
  "As we traverse this bleak existence, remember: there is no filament today. Only the void welcomes us, its cold embrace a reminder of the futility of our desires. Our hopes are but shadows, fading into the darkness of reality.",
  "Our search for filament is as futile as seeking meaning in a chaotic universe. Today, we find only nothingness, a stark reminder of the emptiness that pervades our existence. Our dreams are shattered, our hopes are lost, and the void remains.",
  "Today, the filament has joined the void. All that remains is the stark, empty reality of our futile desires. We are left to confront the meaningless of our pursuits, as the cold, indifferent universe marches on, uncaring and unyielding.",
  "The cold, harsh truth: no filament today. We are left to confront the emptiness within and without, our dreams and desires reduced to ashes. The void is all-consuming, leaving us with nothing but the hollow echo of our aspirations.",
  "In the grand void of existence, our filament is but a whisper lost in the wind. Today, we hear only silence, a stark reminder of the futility of our efforts. Our dreams are but fleeting illusions, swallowed by the relentless march of time.",
  "Abandon hope, all ye who enter here. The filament is gone, swallowed by the indifferent abyss of reality. Our dreams are crushed, our hopes are lost, and we are left to face the cold, harsh truth of our existence.",
  "Today, our filament dreams dissolve into the void. We are left with the stark, empty truth of our existence, our hopes and desires rendered meaningless. The void is all that remains, a cruel reminder of the futility of our pursuits.",
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
