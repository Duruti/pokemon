// Element du DOM
let ul = document.querySelector('.containerGrid')

let allPokemon = [];

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

getPokemon();


async function getPokemon(){
   
   let result =  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
   .then(json => json.json())
   .then(data => {
      data.results.forEach(element => {
         getStat(element.url)
      });
    
   })
}


async function getStat(url){
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
   let species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${o.name}`).then(p => p.json()).then(data =>data)

   let language = "fr"
   let frenchName = species.names.filter( array => array.language.name === language)
   o.name =frenchName[0].name
   o.color = species.color.name
   allPokemon.push(o);
   
   // Affiche si tout les pokemons ont été traité

   if (allPokemon.length === 151){
      let b= allPokemon.sort( (a,b) => {return a.id - b.id})
      for (let i=0; i<b.length ;i++){
         createElementCard(b[i])
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