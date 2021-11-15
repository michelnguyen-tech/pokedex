const result = document.getElementById('result');
const filter = document.getElementById('filter');
const listItems = [];

getData();

filter.addEventListener('input', (e) => filterData(e.target.value));

function getData() {
    var myInit = { method:'GET',
    headers: {
        'Content-type': 'application/json'
    },
    mode:'cors',
    cache: 'default' };

    let request = new Request("./pokelist.json", myInit);

    fetch(request)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            var myData = Object.keys(data).map(key => {
                return data[key];
            })
            myData.forEach(poke => {
                const li = document.createElement('li');
                listItems.push(li);

                li.innerHTML = `
                    <div class="poke-info">
                        <h4>${poke.id}</h4> <p>${poke.name}</p>
                    </div>
                `
                if(poke.id == 1) {
                    li.style.backgroundColor = "rgb(211 211 211)";
                    li.setAttribute("id", "focus"); 
                }
                result.appendChild(li);
            })
        })
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    })
}

document.getElementById('result').addEventListener('click',function(e) {
    setTimeout(function()
    {
        if(e.target.nodeName == "LI") {
            var list = document.getElementsByTagName("li");
            for (let i = 0; i < list.length; i++) {
                list[i].style.backgroundColor = "rgb(230 230 230)";
                list[i].removeAttribute('id');
              }
           var test = e.target.getElementsByTagName('div');
           removeCardsElt();
           getPokemon(test[0].firstElementChild.innerHTML);
           test[0].parentElement.style.backgroundColor = "rgb(211 211 211)";
           test[0].parentElement.setAttribute("id", "focus");  
        }
        if(e.target.nodeName == "H4" || e.target.nodeName == "P"){
            var list = document.getElementsByTagName("li");
            for (let i = 0; i < list.length; i++) {
                list[i].style.backgroundColor = "rgb(230 230 230)";
                list[i].removeAttribute('id');
              }
            var parent = e.target.parentElement;
            removeCardsElt();
            getPokemon(parent.firstElementChild.innerHTML);
            e.target.parentElement.parentElement.style.backgroundColor = "rgb(211 211 211)";
            e.target.parentElement.parentElement.setAttribute("id", "focus");     
        } 
    },300);
});

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
    poison: '#e2c5e2',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#c99ec2',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: 'F5F5F5',
    steel: '#dbdbe7',
    ghost: '#c3b7d6',
    dark: '#bda798',
    ice: '#98D8D8'

}

const types = {
    fire: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/240px-Pok%C3%A9mon_Fire_Type_Icon.svg.png',
    grass: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/240px-Pok%C3%A9mon_Grass_Type_Icon.svg.png',
    electric: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/240px-Pok%C3%A9mon_Electric_Type_Icon.svg.png',
    water: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/240px-Pok%C3%A9mon_Water_Type_Icon.svg.png',
    ground: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/240px-Pok%C3%A9mon_Ground_Type_Icon.svg.png',
    rock: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/240px-Pok%C3%A9mon_Rock_Type_Icon.svg.png',
    fairy: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/240px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png',
    poison: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/240px-Pok%C3%A9mon_Poison_Type_Icon.svg.png',
    bug: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/240px-Pok%C3%A9mon_Bug_Type_Icon.svg.png',
    dragon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/240px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png',
    psychic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/240px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png',
    flying: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/240px-Pok%C3%A9mon_Flying_Type_Icon.svg.png',
    fighting: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/240px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png',
    normal: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/240px-Pok%C3%A9mon_Normal_Type_Icon.svg.png',
    steel: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/240px-Pok%C3%A9mon_Steel_Type_Icon.svg.png',
    ghost: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/240px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png',
    dark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/240px-Pok%C3%A9mon_Dark_Type_Icon.svg.png',
    ice: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/240px-Pok%C3%A9mon_Ice_Type_Icon.svg.png'
}

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    await getPokemon(pokemon_count);
}

const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

leftBtn.addEventListener('click', () => {
    leftBtn.disabled = true;
    setTimeout(function(){leftBtn.disabled = false;},350);
    filter.value = "";
    filterData("");
    var list = document.getElementsByTagName("li");
    var value = +document.getElementById("focus").firstElementChild.getElementsByTagName('h4')[0].innerHTML;

    if (value > 1) {
        for (let i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "rgb(230 230 230)";
            list[i].removeAttribute('id');
          }
        value = --value;
        list[value-1].setAttribute("id", "focus")
        list[value-1].style.backgroundColor = "rgb(211 211 211)";
        var elmnt = document.getElementById("focus");
        elmnt.scrollIntoView();
        removeCardsElt();
        getPokemon(value);
    }
})

rightBtn.addEventListener('click', () => {
    rightBtn.disabled = true;
    setTimeout(function(){rightBtn.disabled = false;},350);
    filter.value = "";
    filterData("");
    var list = document.getElementsByTagName("li");
    var value = +document.getElementById("focus").firstElementChild.getElementsByTagName('h4')[0].innerHTML;

    if (value < 898) {
        for (let i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "rgb(230 230 230)";
            list[i].removeAttribute('id');
          }
        value = ++value;
        list[value-1].setAttribute("id", "focus")
        list[value-1].style.backgroundColor = "rgb(211 211 211)";
        var elmnt = document.getElementById("focus");
        elmnt.scrollIntoView();
        removeCardsElt();
        getPokemon(value);
    }
})

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

    getAbilities(res).then(([m1, m2]) => {
        res.push(m1, m2);
        createPokemonCard(res);
        addPokemontype(res);
    }).catch(error => {
        console.log(error);
    });
}

const getAbilities = async (data) => {
    const url = [];

    if (data[0].id < 808) {
        url.push(data[0].moves[0], data[0].moves[1]);

        const [move1Res, move2Res] = await Promise.all([
            fetch(url[0].move.url),
            fetch(url[1].move.url)
        ]);

        const move1 = await move1Res.json();
        const move2 = await move2Res.json();

        return [move1, move2];
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
    const icon = types[type];

    const dest_texts = pokemon[1].flavor_text_entries;
    const ab_text_1 = pokemon[2].flavor_text_entries;
    const ab_text_2 = pokemon[3].flavor_text_entries;

    const desc_text = dest_texts.find( text => text.language.name == "en").flavor_text.replace(//g, ' ');

    var abilities_text1 = "";
    var abilities_text2 = "";
    
    if (id < 808) {
        abilities_text1 = ab_text_1.find( text => text.language.name == "en").flavor_text.replace(//g, ' ');
        abilities_text2 = ab_text_2.find( text => text.language.name == "en").flavor_text.replace(//g, ' ');
    }
   
    const pokemon_type = pokemon[1].genera[7].genus;

    const pokemonInnerHtml = `
    <div class="front" style="background-color:${color};">   
        <div class="header-section">
           <small id="basic-text">Basic Pokemon</small>
           <b id="pokemon-text">${name}</b>
           <small id="hptxt">${pokemon[0].stats[0].base_stat}HP 
           <img id="icon" src=${icon} alt=""></small>
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
        <div class=desc-section>
            <small>${desc_text}</small>
        </div>
        <br>
        <div class=bottom-card-section>
            <p><small><b>Illus. Mitsushira Arita</b> &copy1995, 96, 98 Nintendo, Creatures, GAMEFREAK, &copy1999 Wizards. </small></p>
        </div>
    </div>
    <div class="back" style="background-color:${color};">
        <div class="back-header-section">
           <div><b>${name}</b></div> 
           <div id="back-img"><img src="${pokemon[0].sprites.front_default}" alt="img" width="130px" height="130px"></div>
        </div>
        <br>
        <div class="stat-section">
            <small> hp: </small>
            <div id="Progress_Status">
                <div class="myprogressBar">${pokemon[0].stats[0].base_stat}</div>
            </div>
        </div>
        <div class="stat-section">
            <small> attack: </small>
            <div id="Progress_Status">
                <div class="myprogressBar">${pokemon[0].stats[1].base_stat}</div>
            </div>
        </div>
        <div class="stat-section">
            <small> defence: </small>
            <div id="Progress_Status">
                <div class="myprogressBar">${pokemon[0].stats[2].base_stat}</div>
            </div>
        </div>
        <div class="stat-section">
            <small> special-attack: </small>
            <div id="Progress_Status">
                <div class="myprogressBar">${pokemon[0].stats[3].base_stat}</div>
            </div>
        </div>
        <div class="stat-section">
            <small> special-defence: </small>
            <div id="Progress_Status">
                <div class="myprogressBar">${pokemon[0].stats[4].base_stat}</div>
            </div>
        </div>
        <div class="stat-section">
            <small> speed: </small>
            <div id="Progress_Status">
                <div class="myprogressBar">${pokemon[0].stats[5].base_stat}</div>
            </div>
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
        fire: '#f12626',
        grass: '#82f789',
        electric: '#F7D02C',
        water: '#4abdf4',
        ground: '#cc8f52',
        rock: '#9b9b98',
        fairy: '#eb74ff',
        poison: '#b469b4',
        bug: '#f8d5a3',
        dragon: '#5885d7',
        psychic: '#F95587',
        flying: '#a7a7a7',
        fighting: '#ac9871',
        normal: 'A8A77A',
        steel: '#9595b8',
        ghost: '#8f79b2',
        dark: '#9e7e68',
        ice: '#5fc2c2'
    }

    const poke_type_container = document.getElementById('type-section');
    const pokemonTp = document.createElement('div');
    pokemonTp.classList.add('pokemon-type');

    const poke_abilities_container = document.getElementById('ab-section');
    const pokemonAb = document.createElement('div');
    pokemonAb.classList.add('pokemon-abilities');

    const poke_types = pokemon[0].types.map(type => type.type.name);

    pokemonTp.innerHTML += `
        <div class="type_text">
            <small>Types: </small>     
        </div>
        `

    for (i = 0; i < poke_types.length; i++) {
        const type = poke_types[i];
        const color = colors[type];
        pokemonTp.innerHTML += `
        <div class="chip" style="background-color:${color};>
            <div class="chip__content">
                <div class="hover_effect"></div>
                <small>${type}</small>
            </div>
        </div>
        `
    }

    const poke_abilities = pokemon[0].abilities.map(ab => ab.ability.name);

    pokemonAb.innerHTML += `
        <div class="ab_text">
            <small>Abilities: </small>
        </div>
        `

    for (i = 0; i < poke_abilities.length; i++) {
        const ab = poke_abilities[i];
        pokemonAb.innerHTML += `
        <div class="chip" style="background-color: #f2f2f2;>
            <div class="chip__content">
                <div class="hover_effect"></div>
                <small>${ab}</small>
            </div>
        </div>
        `
    }

    poke_type_container.appendChild(pokemonTp);
    poke_abilities_container.appendChild(pokemonAb);

    const chips = document.getElementsByClassName('chip');

    for (var i = 0; i < chips.length; i++) {
        chips[i].addEventListener("mouseenter", (e) => {
            e.target.childNodes[1].style.transform = "rotate(-20deg) translateX(-118px)"
            });

            
        chips[i].addEventListener("mouseleave", (e) => {
            e.target.childNodes[1].style.transform = "";
            });
    }

    var elements = document.querySelectorAll(".myprogressBar");
    for (var i = 0; i < elements.length; i++) {
        var width = +elements[i].innerHTML;
        elements[i].style.width = width/200*100 + '%';
    }
    handleToggle(document.getElementById("checkbox").checked == true); 
}

function removeCardsElt() {

    var elements = document.getElementsByClassName("pokemon-card");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    var chips = document.getElementsByClassName("chip");
    while (chips.length > 0) {
        chips[0].parentNode.removeChild(chips[0]);
    }
}

const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', function(event)  {
    handleToggle(event.currentTarget.checked);
});

function handleToggle(isToggled) {
    const element = document.getElementsByClassName('pokemon-card');
    const frontcard = document.getElementsByClassName("front");
    const backcard = document.getElementsByClassName("back");

    if(isToggled) { 
        frontcard[0].style.transform = "perspective(600px) rotateY(180deg)";
        backcard[0].style.transform = "perspective(600px) rotateY(0deg)"

        element[0].addEventListener("mouseenter", () => {
            frontcard[0].style.transform = "perspective(600px) rotateY(0deg)";
            backcard[0].style.transform = "perspective(600px) rotateY(-180deg)";
        })
        element[0].addEventListener("mouseleave", () => {
            frontcard[0].style.transform = "perspective(600px) rotateY(180deg)";
            backcard[0].style.transform = "perspective(600px) rotateY(0deg)";
        })
    } else {
        frontcard[0].style.transform = "perspective(600px) rotateY(0deg)";
        backcard[0].style.transform = "perspective(600px) rotateY(-180deg)";
        
        element[0].addEventListener("mouseenter", () => {
            frontcard[0].style.transform = "perspective(600px) rotateY(180deg)";
            backcard[0].style.transform = "perspective(600px) rotateY(0deg)";
        })
        element[0].addEventListener("mouseleave", () => {
            frontcard[0].style.transform = "perspective(600px) rotateY(0deg)";
            backcard[0].style.transform = "perspective(600px) rotateY(-180deg)";
        })
    }
}

getPokemon(1);