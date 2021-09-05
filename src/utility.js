const sortHighToLow = (arr) => [...arr].sort((a, b) => b.cases - a.cases);
const sortAlphabetically = (arr) =>
  [...arr].sort((a, b) => a.country.localeCompare(b.country));
const cuttInNine = (arr) => [...arr].slice(0, 260);

export {sortHighToLow, sortAlphabetically, cuttInNine};
