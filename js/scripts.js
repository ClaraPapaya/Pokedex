let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemons = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemons);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
}());

pokemonRepository.loadList().then(function() {
  (pokemonRepository.getAll()).forEach(function(pokemons) {
    pokemonRepository.addListItem(pokemons);
  });
});
