//IIFE
let pokemonRepository = (function() {
  //Empty array will be filled with Pokémon objects from an API
  let pokemonList = [];
  //defines the API url in a variable
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //returns the list of Pokémon
  function getAll() {
    return pokemonList;
  }
  //adds a new pokemon item to the list
  function add(pokemons) {
    if (typeof pokemons === 'object' && 'name' in pokemons) {
      pokemonList.push(pokemons)
    } else {"Not the right Pokémon!"
      }
  }
  //creates an unordered list and buttons in the DOM for each Pokémon
  function addListItem(pokemon) {
    let pokemonListUl = document.querySelector('.pokemon-list');
    //creats the list
    let listItem = document.createElement('li');
    //creates the button
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.addEventListener('click', function(event) {
      showDetails(pokemon.name);
    });
    //adds them to the DOM
    listItem.appendChild(button);
    pokemonListUl.appendChild(listItem);
  }
  //shows the Pokémon details like type, height, etc. fetched from the details url of the API
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  //loads the list of Pokémons from the API
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
  //loads the details of the Pokémons from the API
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
  //key values to use the locla variables outside of the IIEF function
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
}());

//calls and executes the pokemonRepository
pokemonRepository.loadList().then(function() {
  (pokemonRepository.getAll()).forEach(function(pokemons) {
    pokemonRepository.addListItem(pokemons);
  });
});
