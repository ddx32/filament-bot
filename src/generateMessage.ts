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

const startingBlocks = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":man-raising-hand: Hello, today's filament menu is:",
    },
  },
  {
    type: "divider",
  },
];

export function generateMessage(filaments: FilamentObject[]) {
  if (filaments.length <= 0) {
    return {
      text: "Today, life is not good.",
    };
  }

  return {
    blocks: [...startingBlocks, ...generateBlocks(filaments)],
  };
}
