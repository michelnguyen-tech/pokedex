const poke_container = document.getElementById('poke-container');
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
        return data;
    }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
    });

    getAbilities(res).then(([m1,m2]) => {
      res.push(m1,m2);
        createPokemonCard(res);
        addPokemontype(res);
    }).catch(error => {
        console.log(error);
    });
}

const getAbilities = async (data) => {
    const url = [];

    if (data[0].id<808) {
        url.push(data[0].moves[0], data[0].moves[1]);

        const[move1Res, move2Res] = await Promise.all([
            fetch(url[0].move.url),
            fetch(url[1].move.url)
        ]);
    
        const move1 = await move1Res.json();
        const move2 = await move2Res.json();
    
        return [move1,move2];  
    }

    return [" ", " "];
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon-card');

    const name = pokemon[0].name[0].toUpperCase() + pokemon[0].name.slice(1);

    const id = pokemon[0].id.toString().padStart(3, '0')

    const poke_types = pokemon[0].types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    
    const color = colors[type];

    const desc_text = pokemon[1].flavor_text_entries[0].flavor_text.replace(//g, ' ');

    var abilities_text1 = "undefined";
    var abilities_text2 = "undefined";

    if (id < 808) {
        abilities_text1 = (pokemon[2].flavor_text_entries[0].flavor_text == undefined) ? " " : pokemon[2].flavor_text_entries[0].flavor_text.replace(//g, ' ');
        abilities_text2 = (pokemon[2].flavor_text_entries[1].flavor_text == undefined) ? " " : pokemon[2].flavor_text_entries[1].flavor_text.replace(//g, ' ');
    }
    
    const pokemon_type = pokemon[1].genera[7].genus;

    //const test = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/240px-Pok%C3%A9mon_Poison_Type_Icon.svg.png"
    const pokemonInnerHtml = `
    <div class="front" style="background-color:${color};">
        <div class="header-section">
           <b>${name}</b>
           <small id="hptxt">${pokemon[0].stats[0].base_stat}HP</small>
        </div>
        <div class="img-container">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon[0].id}.png" alt="">
        </div>
        <div class="dimension-section">
            <small>${pokemon_type}. length:${pokemon[0].height}, Weight:${pokemon[0].weight}</small>
        </div>
        <br>
        <div class=abilities-section>
            <small><b>${pokemon[2].name} </b>${(abilities_text1 === undefined) ? "unavailable" : abilities_text1}</small>
        </div>
        <div class=abilities-section>
            <small><b>${pokemon[3].name} </b>${(abilities_text2 === undefined) ? "unavailable" : abilities_text2}</small>
        </div>
        <br>
        <div class=desc-section>
            <small>${desc_text}</small>
        </div>
    </div>
    <div class="back" style="background-color:${color};">
        <div class="back-header-section">
           <div><b>${name}</b></div> 
           <div id="back-img"><img src="${pokemon[0].sprites.front_default}" alt="img" width="130px" height="130px"></div>
        </div>
        <br>
        <div class="exp-section">
            <small> exp: ${pokemon[0].base_experience}</small>
        </div>
        <br>
        <div class="hp-section">
            <small> hp: ${pokemon[0].stats[0].base_stat}</small>
        </div>
        <br>
        <div class="attack-section">
            <small> attack: ${pokemon[0].stats[1].base_stat}</small>
        </div>
        <br>
        <div class="defence-section">
            <small> defence: ${pokemon[0].stats[2].base_stat}</small>
        </div>
        <br>
        <div class="spatt-section">
            <small> special-attack: ${pokemon[0].stats[3].base_stat}</small>
        </div>
        <br>
        <div class="spdef-section">
            <small> special-defence: ${pokemon[0].stats[4].base_stat}</small>
        </div>
        <br>
        <div class="speed-section">
            <small> speed: ${pokemon[0].stats[5].base_stat}</small>
        </div>
        <br>
        <div id="type-section">
        </div>
        <br>
        <div id="ab-section">
        </div>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHtml

    poke_container.appendChild(pokemonEl)
}


const addPokemontype = (pokemon) => {
    const colors = {
        fire: '#EE8130',
        grass: '#7AC74C',
        electric: '#F7D02C',
        water: '#6390F0',
        ground: '#E2BF65',
        rock: '#B6A136',
        fairy: '#D685AD',
        poison: '#A33EA1',
        bug: '#A6B91A',
        dragon: '#6F35FC',
        psychic: '#F95587',
        flying: '#A98FF3',
        fighting: '#C22E28',
        normal: 'A8A77A'
    }

    const poke_type_container = document.getElementById('type-section');
    const pokemonTp = document.createElement('div');
    pokemonTp.classList.add('pokemon-type');

    const poke_abilities_container = document.getElementById('ab-section');
    const pokemonAb = document.createElement('div');
    pokemonAb.classList.add('pokemon-abilities');

    const poke_types = pokemon[0].types.map(type => type.type.name);

    for (i = 0; i < poke_types.length; i++) {
        const type = poke_types[i];
        const color = colors[type];
        pokemonTp.innerHTML += `
        <div class="chip" style="background-color:${color};>
            <div class="chip__content">
                <small>${type}</small>
            </div>
        </div>
        `
      }

      const poke_abilities = pokemon[0].abilities.map(ab => ab.ability.name);

    for (i = 0; i < poke_abilities.length; i++) {
        const ab = poke_abilities[i];
        pokemonAb.innerHTML += `
        <div class="chip" style="background-color: #f2f2f2;>
            <div class="chip__content">
                <small>${ab}</small>
            </div>
        </div>
        `
    }

    poke_type_container.appendChild(pokemonTp);
    poke_abilities_container.appendChild(pokemonAb)
}

function removeCardsElt() {

    var elements = document.getElementsByClassName("pokemon-card");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

getPokemon(1);