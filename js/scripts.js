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
 
   return {
     add: add,
     getAll: getAll
   };
 })();
 
 pokemonRepository.getAll().forEach(item => {
   document.write(item.name + ' (Height: ' + item.height + ')' + ' (Type: ' + item.type + ')' + '<br>');
 });
 
 
