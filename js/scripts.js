let pokemonList = [
  {name:'Pidgeot', height: 1.5, types: ['flying', 'normal']},
  {name:'Butterfree', height: 1.1, types: ['bug','flying']},
  {name:'Parasect', height: 1, types: ['grass','bug']}
];

// Task 1.5 Use a forEach() function instead of the for loop you have to iterate over the Pokémon in your pokemonList array in order to print the details of each one. 
pokemonList.forEach(function(pokemons) {

  if (pokemons.height >= 1.5) {
 document.write(`<p> ${pokemons.name} (${pokemons.height}) - Wow that's big! <br>`);
} else {
 document.write(`<p> ${pokemons.name} (${pokemons.height}) <br>`);
 }
});
