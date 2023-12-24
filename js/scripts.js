// Task 1.2 - Pokedex 
// Wrapping pokemonList array in an IIFE 
let pokemonRepository = (function() {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 

   function add(pokemon) {
     pokemonList.push(pokemon);
   }
 
   function getAll() {
     return pokemonList;
   }

   // adding addListItem with Pokemon

   function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

     // using addListener pass throught pokemon and button 

     addListenerToButton (button, pokemon); 
    }
    function addListenerToButton(button, pokemon) {
     button.addEventListener("click", function () {
       showDetails(pokemon);
     });
    }

    // adding loadList function 

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json(); 
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add (pokemon);
          console.log(pokemon)
        });
      }).catch(function (e) {
        console.error(e);
      })
      }

      // adding loadDetails function 

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
        
  //   // using addListener pass throught pokemon and button 

  //   addListenerToButton (button, pokemon); 
  //  }
  //  function addListenerToButton(button, pokemon) {
  //   button.addEventListener("click", function () {
  //     showDetails(pokemon);
  //   });
  //  }
 function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function ()
 {
 console.log(item);
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

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

});



//  pokemonRepository.add({name: "Eve", height: 1, type: ["normal"] });

//  pokemonRepository.getAll().forEach(function(pokemon) {
//   pokemonRepository.addListItem(pokemon);
 
// });


 
