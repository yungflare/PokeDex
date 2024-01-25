  let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll() {
      return pokemonList;
    }


    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
      });
    }


    function showModal(title, text, img) {
      let name = document.querySelector("#pokemonModalLabel");
      let height = document.querySelector("#modal-height");
      let image = document.createElement("img");
      image.src = img;

      name.innerHTML = "";
      height.innerHTML = "";
      name.innerHTML = title;
      height.innerHTML = `Height: ${text}`;
      height.appendChild(image);
    }


    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let newPokemon = document.createElement("li");
      newPokemon.classList.add("list-group-item")
      let button = document.createElement("button");

      button.setAttribute("data-toggle", "modal")
      button.setAttribute("data-target", "#pokemonModal");
      button.innerText = pokemon.name;
      button.classList.add("btn", "btn-primary", "btn-lg", "btn-block");



      button.addEventListener("click", function () {
        showDetails(pokemon);
      });

      newPokemon.append(button);
      pokemonList.append(newPokemon);

    }

    function showLoadingMessage() {
      let loadingMessage = document.createElement('p');
      loadingMessage.textContent = "Loading...";

      document.body.appendChild(loadingMessage);
    }

    // using hideLoadingMessage

    function hideLoadingMessage() {
      let loadingMessage = document.querySelector('p');
      if (loadingMessage) {
        loadingMessage.remove();
      }
    }

    // adding loadList function 

    function loadList() {
      showLoadingMessage();
      return fetch(apiUrl)
        .then(function (response) {
          hideLoadingMessage();
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        })
        .catch(function (e) {
          hideLoadingMessage();
          console.error(e);
        });
    }

    // adding loadDetails function 

    function loadDetails(pokemon) {
      showLoadingMessage();
      let url = pokemon.detailsUrl;
      return fetch(url)
        .then(function (response) {
          hideLoadingMessage();
          return response.json();
        })
        .then(function (details) {
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.types = details.types;
        })
        .catch(function (e) {
          hideLoadingMessage();
          console.error(e);
        });
    }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });

  });