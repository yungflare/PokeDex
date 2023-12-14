// Task 1.2 - Pokedex 
// Wrapping pokemonList array in an IIFE 
let pokemonRepository = (function() {
   let pokemonList = [
     {
       name: 'Bulbasaur',
       height: 7,
       type: ['grass', 'poison']
     },
     {
       name: 'Charmander',
       height: 6,
       type: 'fire'
     },
     {
       name: 'Squirtle',
       height: 5,
       type: 'water'
     },
     {
       name: 'Weedle',
       height: 3,
       type: ['bug', 'poison']
     },
     {
       name: 'Pikachu',
       height: 4,
       type: 'electric'
     },
     {
       name: 'Snorlax',
       height: 2.1,
       type: 'normal'
     }
   ];
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
 function showDetails(pokemon) {
  console.log(pokemon);
 }
   return {
     add: add,
     getAll: getAll,
     addListItem: addListItem,
     showDetails: showDetails
   };
   
 })();
 
 pokemonRepository.getAll().forEach(item => {
   document.write(item.name + ' || Height: ' + item.height + ' ||' + ' Type: ' + item.type + '<br>');
 });

 
