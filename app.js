// https://pokeapi.co/

// Element du DOM
let ul = document.querySelector('.containerGrid')
let searchInput = document.querySelector('#searchInput')

let allPokemon = [];
let pokemons = [];
let index = 10
let inputFocus = false
const color = {
   red : '#F58271',
   blue : '#6390F0',
   yellow : '#F7D02C',
   green : '#78c850',
   black : '#000',
   brown : '#E2BF65',
   purple : '#7151c2',
   gray : '#D9D5D8',
   white : '#f1f1f1',
   pink : '#D685AD',
   
}

getPokemon(151);
window.addEventListener('scroll', () => {
   if (inputFocus) return;
   const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
   if ((Math.trunc(scrollHeight-scrollTop)-(clientHeight+100)) <= 0 ){
      console.log('en bas ' + index )
      index = index + 4
      drawCard()
   }
})
const searchPokemon = function(e){
  // getPokemon(151)
  e.preventDefault();
  console.log(e)
   const input = searchInput.value.toUpperCase()
  // ul = document.querySelector('.containerGrid')
   let result = []
//   let pokemons = document.querySelectorAll('li')
   for(i=0; i<allPokemon.length ; i++){
      let name = allPokemon[i].name.toUpperCase();
      
      if (name.indexOf(input)> -1) {
         console.log(name);
         result.push(allPokemon[i])
         //  pokemons[i].style.display = 'flex'
      }
      else {
        // pokemons[i].style.display = 'none'
      }
   }
   ul.innerHTML = ""
   for (let i=0; i<result.length ;i++){
      createElementCard(result[i])
    //  console.log(i)
   }
   console.log('-------');

}

searchInput.addEventListener('keyup',searchPokemon);
searchInput.addEventListener('focus',() =>{
   inputFocus = true
});
searchInput.addEventListener('blur',(e) =>{
   inputFocus = false
   searchInput.value =""
   drawCard();

});
async function getPokemon(nbSearch){
   allPokemon = [];
   ul.innerHTML =""
   let result =  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${nbSearch}`)
   .then(json => json.json())
   .then(data => {
      data.results.forEach(element => {
         getStat(element.url,nbSearch)
      });
   })
  
}
let drawCard = function(){
   pokemons = allPokemon.slice(0,index)
   ul.innerHTML = ""

   for (let i=0; i<pokemons.length ;i++){
      createElementCard(pokemons[i])
   }
}

async function getStat(url,nbSearch){
   // recupère les stat du pokemon
   let result =  await fetch(url)
      .then(json => json.json())
      .then(data => data)
   
   let o = {
      id : result.id,
      color : '',
      name : result.name,
      types : [],
      pathImg : result.sprites.front_default
   }
   // récupère les types
   result.types.forEach(e => o.types.push(e.type.name));

   // récupère les spécifications
   let species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${o.id}`)
   .then(p => p.json())
   .then(data =>data)
   .catch(()=>console.log('name : '+o.name + ' id ' + o.id))

   let language = "fr"
   let frenchName = species.names.filter( array => array.language.name === language)
   o.name =frenchName[0].name
   o.color = species.color.name
   allPokemon.push(o);
   
   // Affiche si tout les pokemons ont été traité
   if (allPokemon.length === nbSearch){
      allPokemon = allPokemon.sort( (a,b) => {return a.id - b.id})
      pokemons = allPokemon.slice(0,10)
      console.log(allPokemon.length)
      
      for (let i=0; i<pokemons.length ;i++){
         createElementCard(pokemons[i])
       //  console.log(i)
      }
   }
}

let createElementCard = function(o){
   // creation de l'élément 
   let card = document.createElement('li')
   card.style.backgroundColor = color[o.color]
   card.classList.add('card')

   // nom du pokemon
   let name = document.createElement('h1')
   name.innerText = o.name
   card.appendChild(name)
   
   // id
   let idContainer = document.createElement('div');
   idContainer.classList.add('id');
   let idText = document.createElement('p');
   idText.innerText = o.id
   idContainer.appendChild(idText);
   card.appendChild(idContainer)

   // sprite
   let sprite = document.createElement('img')
   sprite.classList.add('sprite')
   sprite.src = o.pathImg
   card.appendChild(sprite)
   
   // type

   let types = document.createElement('div');
   types.classList.add('type');
   for (let i=0 ; i<o.types.length ; i++){
      let type = document.createElement('p');
      type.innerText = o.types[i]
      types.appendChild(type);
      
   }
   card.appendChild(types)


   ul.appendChild(card)

}