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
    //for(let i = pokemon_count-7; i <= pokemon_count; i++ ) {
        //await getPokemon(i)
    //}
    await getPokemon(pokemon_count);
}

const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
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

leftBtn.addEventListener('click', () => {
    const e = document.getElementById('range');
    var value = +e.value;
    const label = document.getElementById('slider-label');
    
    const range_width = getComputedStyle(e).getPropertyValue('width');

    const label_width = getComputedStyle(label).getPropertyValue('width');

    const num_width = +range_width.substring(0, range_width.length - 2);
    const num_label_width = +label_width.substring(0, label_width.length - 2);

    const max = +e.max;
    const min = +e.min;

    const left = ((value+48) * (num_width / max ) - num_label_width / 2 + scale((value+48), min, max, 10, -10));

    label.style.left = `${left}px`;

    if (value > 1) {
        document.getElementById('range').value = --value;
        label.innerHTML = value;
        removeCardsElt();
        getPokemon(value);
      }
})

rightBtn.addEventListener('click', () => {
    const e = document.getElementById('range');
    var value = +e.value;
    const label = document.getElementById('slider-label');

    const range_width = getComputedStyle(e).getPropertyValue('width');

    const label_width = getComputedStyle(label).getPropertyValue('width');

    const num_width = +range_width.substring(0, range_width.length - 2);
    const num_label_width = +label_width.substring(0, label_width.length - 2);

    const max = +e.max;
    const min = +e.min;

    const left = ((value+48) * (num_width / max ) - num_label_width / 2 + scale((value+48), min, max, 10, -10));

    label.style.left = `${left}px`;

    if (value < 898) {
        document.getElementById('range').value = ++value;
        label.innerHTML = value;
        removeCardsElt();
        getPokemon(value);
      }
})

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const url2 = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    const res = await Promise.all([
        fetch(url),
        fetch(url2)
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        createPokemonCard(data);
    }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
    });

}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon-card');

    const name = pokemon[0].name[0].toUpperCase() + pokemon[0].name.slice(1);

    const id = pokemon[0].id.toString().padStart(3, '0')

    const poke_types = pokemon[0].types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    
    const color = colors[type];
    pokemonEl.style.backgroundColor = color;

    const desc_test = pokemon[1].flavor_text_entries[0].flavor_text.replace(//g, ' ');


    const pokemonInnerHtml = `
    <div class="header-section">
        <small>${pokemon[0].name}</small>
        <small>${pokemon[0].stats[0].base_stat}HP</small>
    </div>
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon[0].id}.png" alt="">
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
        <small>${desc_test}</small>
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

//fetchPokemons()
getPokemon(1);