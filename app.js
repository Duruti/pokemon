// Element du DOM
let ul = document.querySelector('.containerGrid')

let allPokemon = [];
// grass: '#78c850',
// ground: '#E2BF65',
// dragon: '#6F35FC',
// fire: '#F58271',
// electric: '#F7D02C',
// fairy: '#D685AD',
// poison: '#966DA3',
// bug: '#B3F594',
// water: '#6390F0',
// normal: '#D9D5D8',
// psychic: '#F95587',
// flying: '#A98FF3',
// fighting: '#C25956',
//  rock: '#B6A136',
//  ghost: '#735797',
//  ice: '#96D9D6'
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
//console.log(allPokemon)

async function getPokemon(){

   let result =  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then(json => json.json())
      .then(data => {
         data.results.forEach(element => {
            getStat(element.url)
         });
      })
   console.log(result)
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
      //console.log(`pokemon ${name} et type : ${types}`)
      
   }
   // récupère les types
   result.types.forEach(e => o.types.push(e.type.name));

   // récupère les spécifications
   let species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${o.name}`).then(p => p.json()).then(data =>data)
   allPokemon.push(o)
   console.log(result)
   console.log(species)
   let language = "ja"
   let frenchName = species.names.filter( array => array.language.name === language)
   console.log(frenchName[0].name)
   o.color = species.color.name
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
      console.log(o.types[i])
      types.appendChild(type);
      
   }
   card.appendChild(types)


   ul.appendChild(card)

}
