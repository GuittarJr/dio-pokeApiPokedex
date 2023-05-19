const pokeApi = {}

function convertPokemonDetailToPokemon(pokemonDetail){
    const pokemon = {}
    pokemon.order = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;
    const types = pokemonDetail.types.map(typeSlot=> typeSlot.type.name);

    const [type] = types;
    pokemon.type = type;

    pokemon.types = types;
    pokemon.photo = pokemonDetail.sprites.other.home.front_default;

    return pokemon
}
pokeApi.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url)
    .then(response=> response.json())
    .then(pokemon=> convertPokemonDetailToPokemon(pokemon)) 
           
}

pokeApi.getPokemon = (offset,limit)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons)=> pokemons.map(pokemon=> pokeApi.getPokemonDetail(pokemon)))
    .then(detailRequest=>Promise.all(detailRequest))
    .then(pokemonDetail => pokemonDetail)
    .catch((error) => console.log(error));
}