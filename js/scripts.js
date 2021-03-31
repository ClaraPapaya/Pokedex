let pokemonRepository = (function() {
  let pokemonList = [
    {name:'Pidgeot', height: 1.5, types: ['flying', 'normal']},
    {name:'Butterfree', height: 1.1, types: ['bug','flying']},
    {name:'Parasect', height: 1, types: ['grass','bug']}
  ]
  function getAll() {
    return pokemonList;
  }
  function add(pokemons) {
    pokemonList.push(pokemons)
  }
  return {
    getAll: getAll,
    add: add
  };
}());

(pokemonRepository.getAll()).forEach(function(pokemons) {

  if (pokemons.height >= 1.5) {
 document.write(`<p> ${pokemons.name} (${pokemons.height}) - Wow that's big! <br>`);
} else {
 document.write(`<p> ${pokemons.name} (${pokemons.height}) <br>`);
 }
});
