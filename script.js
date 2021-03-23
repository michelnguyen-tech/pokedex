const poke_container = document.getElementById('poke-container')
const pokemon_count = 29
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7E0',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7e6',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: 'F5F5F5'
}

const main_types = Object.keys(colors);

const fetchPokemons = async ()  => {
    for(let i = 1; i <= pokemon_count; i++ ) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon-card');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    
    const color = colors[type];
    pokemonEl.style.backgroundColor = color;


    const pokemonInnerHtml = `
    <div class="header-section">
        <small>${pokemon.name}</small>
        <small>100HP</small>
    </div>
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="dimension-section">
        <small>Seed pokemon. length:6'7, Weight: 221lbs</small>
    </div>
    <br>
    <div class=abilities-section>
        <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae blanditiis nobis eum eaque qui sapiente. Cupiditate suscipit hic adipisci repudiandae, delectus consequatur! Beata</small>
    </div>
    <br>
    <div class=desc-section>
        <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, saepe.</small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHtml

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()