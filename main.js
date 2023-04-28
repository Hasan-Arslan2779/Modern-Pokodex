const searchInput = document.querySelector("#poke-input");
const searchBtn = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");
const pokeCount = 151;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#F4E7DA",
  rock: "#D5D5D4",
  fairy: "#FCEAFF",
  poison: "#D6B3FF",
  bug: "#F8D5A3",
  dragon: "#97B3E6",
  psychic: "#EAEDA1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#FSFSFS",
  ice: "#E0F5FF",
};

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonBox(data);
};

const createPokemonBox = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokeId = pokemon.id.toString().padStart(3, "0");
  const weight = pokemon.weight;
  const type = pokemon.types[0].type.name;
  const color = colors[type];

  pokemonEl.style.backgroundColor = `${color}`;

  pokemonEl.innerHTML = `
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name} image " />
  <h4 class="poke-name">${name}</h4>
  <p class="poke-id">#${pokeId}</p>
  <p class="poke-weight">${weight} kg</p>
  <p class="poke-type">Type: ${type}</p>
  `;
  pokeContainer.appendChild(pokemonEl);
};

initPokemon();

searchInput.addEventListener("input", function (e) {
  const pokeNames = document.querySelectorAll(".poke-name");
  const search = searchInput.value.toLowerCase();

  pokeNames.forEach((pokeName) => {
    pokeName.parentElement.style.display = "block";

    if (!pokeName.innerHTML.toLowerCase().includes(search)) {
      pokeName.parentElement.style.display = "none";
    }
  });
});
