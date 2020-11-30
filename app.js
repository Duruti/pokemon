let allPokemon = [];

getPokemon();
//console.log(allPokemon)

async function getPokemon(){

   let result =  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1`)
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
}
