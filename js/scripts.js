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
    //creates the list
    let listItem = document.createElement('li');
    //creates the button
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
    //adds them to the DOM
    listItem.appendChild(button);
    pokemonListUl.appendChild(listItem);
  }

  //loads the list of Pokémons from the API
  function loadList() {
    showLoadingMessage();
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
    }).then(function(){
      hideLoadingMessage();
    }).catch(function(e) {
      console.error(e);
    })
    hideLoadingMessage();
  }
  //loads the details of the Pokémons from the API
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).then(function() {
      hideLoadingMessage();
    }).catch(function(e) {
      console.error(e);
    });
    hideLoadingMessage();
  }

  //shows the Pokémon details like type, height, etc. fetched from the details url of the API
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  //shows the loading image
  function showLoadingMessage() {
    loadImage = document.querySelector(".loadingImage");
    loadImage.classList.add("show");
  }

  //hides the loading image
  function hideLoadingMessage() {
    loadImage = document.querySelector(".loadingImage");
    loadImage.classList.remove("show");
  }

  //key values to use the locla variables outside of the IIEF function
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
}());

//calls and executes the pokemonRepository
pokemonRepository.loadList().then(function() {
  //shows loading image in browser
  pokemonRepository.showLoadingMessage();
  //timer to simulate the time it takes to load
  setTimeout(function() {
    pokemonRepository.getAll().forEach(function(pokemons) {
      pokemonRepository.addListItem(pokemons);
    })
    pokemonRepository.hideLoadingMessage();
  }, 1000)
});
