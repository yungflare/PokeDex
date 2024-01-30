// POKEDEX 
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
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl, pokemon.types, pokemon.abilities);
          });
        }


        function showModal(title, height, img, types, abilities) {
          let name = document.querySelector("#pokemonModalLabel");
          let heightElement = document.querySelector("#modal-height");
          let typesElement = document.querySelector("#modal-types");
          let abilitiesElement = document.querySelector("#modal-abilities");
          let image = document.createElement("img");
          image.src = img;
          image.classList.add("img");

          name.innerHTML = "";
          heightElement.innerHTML = "";
          typesElement.innerHTML = "";
          abilitiesElement.innerHTML= "";
          name.innerHTML = title;
          heightElement.innerHTML= `Height: ${height}m `;

          let typeNames = types.map(function(type) {
            return type.type.name;
          }).join (",");
          typesElement.innerHTML = `Type: ${typeNames}`;

          let abilityNames = abilities.map(function(ability){
            return ability.ability.name;
          }).join(",")
          abilitiesElement.innerHTML = `Abilities: ${abilityNames}`;
          heightElement.appendChild(image);
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
              pokemon.abilities = details.abilities;
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
