const pokemonOl = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMorebutton")
const limit = 5;
let offset = 0;
const maxRecords = 1000;

function loadPokemonItens(){
    pokeApi.getPokemon(offset,limit).then((pokemons = [])=>{
        const newHtml = pokemons.map((pokemon)=> `
            <li class="pokemon ${pokemon.type}">
            <span class="number">#00${pokemon.order}</span>
            <span class="name ${pokemon.type}/">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                ${pokemon.types.map(type=>`<li class="type ${type}">${type}</li>`).join("")}
                </ol>
                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>
        `).join("");
        pokemonOl.innerHTML += newHtml
    })
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener("click",function() {
    offset +=limit
    const qtdRecordNextPage = offset + limit
    debugger
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset,newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemonItens(offset,limit)
    }

})
