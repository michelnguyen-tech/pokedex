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
                    li.style.backgroundColor = "rgb(240, 238, 238)";
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
    if(e.target.nodeName == "LI") {
        var list = document.getElementsByTagName("li");
        for (let i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "white";
            list[i].removeAttribute('id');
          }
       var test = e.target.getElementsByTagName('div');
       removeCardsElt();
       getPokemon(test[0].firstElementChild.innerHTML);
       test[0].parentElement.style.backgroundColor = "rgb(240, 238, 238)";
       test[0].parentElement.setAttribute("id", "focus");  
    }
    if(e.target.nodeName == "H4" || e.target.nodeName == "P"){
        var list = document.getElementsByTagName("li");
        for (let i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "white";
            list[i].removeAttribute('id');
          }
        var parent = e.target.parentElement;
        removeCardsElt();
        getPokemon(parent.firstElementChild.innerHTML);
        e.target.parentElement.parentElement.style.backgroundColor = "rgb(240, 238, 238)";
        e.target.parentElement.parentElement.setAttribute("id", "focus");     
    } 
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
    poison: '#98d7e6',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: 'F5F5F5'
}

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    await getPokemon(pokemon_count);
}

const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

leftBtn.addEventListener('click', () => {
    var list = document.getElementsByTagName("li");
    var value = +document.getElementById("focus").firstElementChild.getElementsByTagName('h4')[0].innerHTML;

    if (value > 1) {
        for (let i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "white";
            list[i].removeAttribute('id');
          }
        value = --value;
        list[value-1].setAttribute("id", "focus")
        list[value-1].style.backgroundColor = "rgb(240, 238, 238)";
        var elmnt = document.getElementById("focus");
        elmnt.scrollIntoView();
        removeCardsElt();
        getPokemon(value);
    }
})

rightBtn.addEventListener('click', () => {
    var list = document.getElementsByTagName("li");
    var value = +document.getElementById("focus").firstElementChild.getElementsByTagName('h4')[0].innerHTML;

    if (value < 898) {
        for (let i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "white";
            list[i].removeAttribute('id');
          }
        value = ++value;
        list[value-1].setAttribute("id", "focus")
        list[value-1].style.backgroundColor = "rgb(240, 238, 238)";
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
    poke_abilities_container.appendChild(pokemonAb);
    
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