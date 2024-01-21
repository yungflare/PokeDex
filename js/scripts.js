// Task 1.2 - Pokedex 
// Wrapping pokemonList array in an IIFE 
let pokemonRepository = (function() {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 

   let pokemonModal = document.querySelector('#pokemon-modal');
 
   function showModal (title, text, img) {
    pokemonModal.innerHTML = '';

   let modal = document.createElement('div');
   modal.classList.add('modal');

   let closeButtonElement = document.createElement('button');
   closeButtonElement.classList.add('modal-close');
   closeButtonElement.innerText = 'Close';
   closeButtonElement.addEventListener('click', hideModal);

   let titleElement = document.createElement('h1');
   titleElement.innerText = title;

   let contentElement = document.createElement('p');
   contentElement.innerText = text; 

   let imageElement = document.createElement("img");
   imageElement.setAttribute("src", img);
   imageElement.setAttribute("width", "304");
   imageElement.setAttribute("height", "228");
   imageElement.setAttribute("alt", "Pokemon Image");

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    pokemonModal.appendChild(modal);

    pokemonModal.classList.add('is-visible');
   }
   
   function hideModal() {
    pokemonModal.classList.remove('is-visible');
   }

   window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pokemonModal.classList.contains('is-visible')) {
      hideModal();
    }
   });

   pokemonModal.addEventListener('click', (e) => {
    let target = e.target;
    if (target === pokemonModal) {
      hideModal;
    }
   }); 

   
   function add(pokemon) {
     pokemonList.push(pokemon);
   }
 
   function getAll() {
     return pokemonList;
   }






















   // adding addListItem with Pokemon
   function addListItem(pokemon) {
    addListenerToButton( button, pokemon);
    pokemonList.appendChild(newPokemon);

   }
    
//     // using showLoadingMessage

    function showLoadingMessage() {
      let loadingMessage = document.createElement("p");
      loadingMessage.textContent = "Loading..."; 

      document.body.appendChild(loadingMessage);
    }

   // using hideLoadingMessage
  
   function hideLoadingMessage() {
    let loadingMessage = document.querySelector("p");
    if (loadingMessage) {
      loadingMessage.remove();
    }
   }

    // adding loadList function 

//     function loadList() {
//       showLoadingMessage();
//       return fetch(apiUrl)
//       .then(function (response) {
//         hideLoadingMessage(); 
//         return response.json(); 
//       })
//       .then(function(json) {
      
//         json.results.forEach(function (item) {
//           let pokemon = {
//             name: item.name,
//             detailsUrl: item.url
//           };
//           add (pokemon);
//           console.log(pokemon)
//         })
//       }).catch(function (e) {
//         hideLoadingMessage();
//         console.error(e);
//       });
//       }

//       // adding loadDetails function 

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
  
//  function showDetails(pokemon) {
//   pokemonRepository.loadDetails(pokemon).then(function () {
//     let typesString = pokemon.types.map(type => type.type.name).join(`,`);
//    showModal(pokemon.name,`Height: ${pokemon.height} Type: ${typesString}`, pokemon.imageUrl); 
//   });
// }

   return {
     add: add,
     getAll: getAll,
     addListItem: addListItem,
      loadList: loadList, 
      loadDetails: loadDetails,
    //  showDetails: showDetails
   };

// }

})();

   pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemonList) {
  pokemonRepository.addListItem(pokemonList);
 });
})
