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
    if (typeof pokemons === 'object' && object.keys(pokemonList)) {
      pokemonList.push(pokemons)
    }
  }

  function addListItem(pokemon) {
    let pokemonListUl = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.addEventListener('click', function(event) {
      showDetails(pokemon.name);
    });
    listItem.appendChild(button);
    pokemonListUl.appendChild(listItem);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
}());

(pokemonRepository.getAll()).forEach(function(pokemons) {
  pokemonRepository.addListItem(pokemons);
});
