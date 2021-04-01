const poke_container = document.getElementById('poke-container')
var pokemon_count = 8;
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
    for(let i = pokemon_count-7; i <= pokemon_count; i++ ) {
        await getPokemon(i)
    }
}

const range = document.getElementById('range');

range.addEventListener('input', (e) => {
    const value = +e.target.value;
    const label = e.target.previousElementSibling ;
    pokemon_count = value;

    const range_width = getComputedStyle(e.target).getPropertyValue('width');

    const label_width = getComputedStyle(label).getPropertyValue('width');

    const num_width = +range_width.substring(0, range_width.length - 2);
    const num_label_width = +label_width.substring(0, label_width.length - 2);

    const max = +e.target.max;
    const min = +e.target.min;

    const left = ((value+48) * (num_width / max ) - num_label_width / 2 + scale((value+48), min, max, 10, -10));

    label.style.left = `${left}px`;

    label.innerHTML = value;
})

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
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

function removeCardsElt() {

    var elements = document.getElementsByClassName("pokemon-card");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

fetchPokemons()