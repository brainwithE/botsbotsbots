export const generateBotName = name => {
  const botSuffixes = ['ator', 'X', 'roid', 'tron'];

  const suffix = botSuffixes[Math.floor(Math.random() * botSuffixes.length)];

  return `${name}${suffix}`;
};
