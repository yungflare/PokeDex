  let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll(){
      return pokemonList;
    }

    function showDetails (pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon.name, pokemon.height);
      });
    }

    function hideModal() { 
      let modalContainer = document.querySelector("#mo")
    }
   
    
















  });