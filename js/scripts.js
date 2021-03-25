let pokemonList = [
  {name:'Pidgeot', height: 1.5, types: ['flying', 'normal']},
  {name:'Butterfree', height: 1.1, types: ['bug','flying']},
  {name:'Parasect', height: 1, types: ['grass','bug']}
];

// Task 1.3 write names, heights in brackets, and add text for one specific height.
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 1.5) {
  document.write(`${pokemonList[i].name} (${pokemonList[i].height}) - Wow that's big! <br>`);
} else {
  document.write(`${pokemonList[i].name} (${pokemonList[i].height}) <br>`);
}
}
