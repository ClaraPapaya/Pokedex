//IIFE
let pokemonRepository = (function() {
  //Empty array will be filled with Pokémon objects from an API
  let pokemonList = [];
  //defines the API url in a variable
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // defines variable to use for modal pop-up window with details
  let modalContainer = document.querySelector('#modal-container');
  //returns the list of Pokémon
  function getAll() {
    return pokemonList;
  }
  //adds a new pokemon item to the list
  function add(pokemons) {
    if (typeof pokemons === 'object' && 'name' in pokemons) {
      pokemonList.push(pokemons);
    } else {
      /* eslint-disable no-console */
      console.error("Not the right Pokémon!");
      /* eslint-enable no-console */
      }
  }
  //creates an unordered list and buttons in the DOM for each Pokémon
  function addListItem(pokemon) {
    let pokemonListUl = document.querySelector('.pokemon-list');
    //creates the list
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    //creates the button
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-block');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
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
  //loads the details of the Pokémons from the API using fetch
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = [];
      details.types.forEach(function(object) {
        return item.types.push(object.type.name);
      });
    }).then(function() {
      hideLoadingMessage();
    }).catch(function(e) {
      console.error(e);
    });
    hideLoadingMessage();
  }

  //filter/search function
  let searchPokemonList = document.querySelector(".pokemon-list");
  let searchBar = document.forms["filter"].querySelector("input");
  searchBar.addEventListener("keyup", function(e) {
    let term = e.target.value.toLowerCase();
    let searchPokemons = searchPokemonList.getElementsByTagName("li");
    Array.from(searchPokemons).forEach(function(searchPokemons) {
          let poke = searchPokemons.firstElementChild.textContent;
          if (poke.toLowerCase().indexOf(term) != -1) {
            searchPokemons.style.display = "block";
          } else {
            searchPokemons.style.display = "none";
          }
    })
  })

  //shows the loading image
  function showLoadingMessage() {
    loadImage = document.querySelector(".loadingImage");
    loadImage.classList.add("showImg");
  }

  //hides the loading image
  function hideLoadingMessage() {
    loadImage = document.querySelector(".loadingImage");
    loadImage.classList.remove("showImg");
  }

  //shows the Pokémon details like type, height, etc. fetched from the details url of the API
  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
      showModal(pokemon);
      })
    };

  //modal that shows the Pokemon listItems details
  function showModal(pokemon) {

    //adds the modal content details to modal header and body
    let modalTitle = document.getElementById("modalTitle");
    modalTitle.innerText = pokemon.name;

    let pokemonHeight = document.getElementById("heightDetail");
    pokemonHeight.innerText = "Height: " + pokemon.height;
    pokemonHeight.classList.add("modal-body");

    let pokemonType = document.getElementById("typeDetail");
    pokemonType.innerText = "Type: " + pokemon.types;
    pokemonType.classList.add("modal-body");

    let modalImage = document.getElementById("imgDetail");
    modalImage.src = pokemon.imageUrl;
  }

  //needed to close the modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  //to close modal when esc key is pressed
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //key values to use the local variables outside of the IIEF function
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
    hideModal: hideModal
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
