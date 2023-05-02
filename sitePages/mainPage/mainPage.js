function fetchRandomPokemon() {
  const maxPokemon = 1009;
  const randomPokeNum = Math.floor(Math.random() * maxPokemon) + 1;

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeNum}/`)
    .then(response => response.json())
    .then(data => {
      const spriteImageURL = data.sprites.front_default;
      const pokemonImg = document.getElementById('pokemonImg');
      pokemonImg.src = spriteImageURL;
      pokemonImg.classList.add('pop-out');
      let pokemonName = data.name;

      updatePokemonName(pokemonName);
    })
    .catch(error => {
      console.error(error);
    });
}

function updatePokemonName(pokemonName) {
  const pokeNameContainer = document.getElementById('pokemonNameContainer');
  pokeNameContainer.textContent = pokemonName.replace(/-/g, ' ').toUpperCase();
}

const getPokemonButton = document.getElementById('getPokemon');

getPokemonButton.addEventListener('click', () => {
  const pokemonImg = document.getElementById('pokemonImg');
  pokemonImg.style.animation = 'wiggle 0.5s';
  setTimeout(() => {
    pokemonImg.style.animation = '';
    fetchRandomPokemon();
  }, 500);
});

function fetchRandomItem() {
  const maxItem = 1010;
  const randomItemNum = Math.floor(Math.random() * maxItem) + 1;

  fetch(`https://pokeapi.co/api/v2/item/${randomItemNum}/`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Item not found');
      }
      return response.json();
    })
    .then(item => {
      const itemImg = document.getElementById('itemImg');
      itemImg.src = item.sprites.default;
      itemImg.classList.add('pop-out');
      updateItemName(item.name);
    })
    .catch(error => {
      console.error(error);
      fetchRandomItem();
    });
}

function updateItemName(itemName) {
  const itemNameContainer = document.getElementById('itemNameContainer');
  itemNameContainer.textContent = itemName.replace(/-/g, ' ').toUpperCase();
}

const getItemButton = document.getElementById('getItem');

getItemButton.addEventListener('click', () => {
  const itemImg = document.getElementById('itemImg');
  itemImg.style.animation = 'wiggle .5s';
  setTimeout(() => {
    itemImg.style.animation = '';
    fetchRandomItem();
  }, 500);
});

function fetchRandomLocation() {
  const maxLocation = 781;
  const randomLocationId = Math.floor(Math.random() * maxLocation) + 1;
  const randomNum = Math.floor(Math.random() * 3) + 1;
  const locationImgUrl = `/sdi-blended-project1-scaffold/images/building${randomNum}.png`;

  fetch(`https://pokeapi.co/api/v2/location/${randomLocationId}/`)
    .then(response => response.json())
    .then(data => {
      const locationImg = document.getElementById('locationImg');
      locationImg.src = locationImgUrl;
      locationImg.classList.add('pop-out');
      const locationName = data.name;

      updateLocationName(locationName);
    })
    .catch(error => {
      console.error(error);
    });
}

function updateLocationName(locationName) {
  const locationNameContainer = document.getElementById('locationNameContainer');
  locationNameContainer.textContent = locationName.replace(/-/g, ' ').toUpperCase();
}

const getLocationButton = document.getElementById('getLocation');

getLocationButton.addEventListener('click', () => {
  const locationImg = document.getElementById('locationImg');
  locationImg.style.animation = 'wiggle 0.5s';
  setTimeout(() => {
    locationImg.style.animation = '';
    fetchRandomLocation();
  }, 500);
});

function fetchRandomMove() {
  const maxMove = 826;
  const randomMoveId = Math.floor(Math.random() * maxMove) + 1;
  const randomNum = Math.floor(Math.random() * 23);
  const formattedRandomNum = String(randomNum).padStart(3, '0');
  const moveImgUrl = `/sdi-blended-project1-scaffold/images/tile${formattedRandomNum}.png`;

  fetch(`https://pokeapi.co/api/v2/move/${randomMoveId}/`)
    .then(response => response.json())
    .then(data => {
      const moveImg = document.getElementById('moveImg');
      moveImg.src = moveImgUrl;
      moveImg.classList.add('pop-out');
      const moveName = data.name;

      updateMoveName(moveName);
    })
    .catch(error => {
      console.error(error);
    });
}

function updateMoveName(moveName) {
  const moveNameContainer = document.getElementById('moveNameContainer');
  moveNameContainer.textContent = moveName.replace(/-/g, ' ').toUpperCase();
}

const getMoveButton = document.getElementById('getMove');

getMoveButton.addEventListener('click', () => {
  const moveImg = document.getElementById('moveImg');
  moveImg.style.animation = 'wiggle 0.5s';
  setTimeout(() => {
    moveImg.style.animation = '';
    fetchRandomMove();
  }, 500);
});

// Function to toggle the visibility of the search input pop-out
function popOut() {
  const popOuts = document.getElementById('searchInput');
  const suggestionsDropdown = document.getElementById('suggestionsDropdown');

  if (popOuts.style.display === 'block') {
    suggestionsDropdown.style.display = 'none';
    popOuts.style.display = 'none';
    popOuts.classList.remove('open');
    popOuts.value = '';
  } else {
    popOuts.style.display = 'block';
    popOuts.classList.add('open');
  }
}

// Function to filter the search bar based on user input
function searchBarFilter() {
  const input = document.getElementById('searchInput').value.toLowerCase();

  const movePromise = fetch(`https://pokeapi.co/api/v2/move/${input}/`)
    .then(response => response.json())
    .then(moveData => {
      return {name: moveData.name, id: moveData.id};
    })
    .catch(error => {
      console.error(error);
    });

  const pokemonPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${input}/`)
    .then(response => response.json())
    .then(pokemonData => {
      return {name: pokemonData.name, id: pokemonData.id};
    })
    .catch(error => {
      console.error(error);
    });

  const locationPromise = fetch(`https://pokeapi.co/api/v2/location/${input}/`)
    .then(response => response.json())
    .then(locationData => {
      return {name: locationData.name, id: locationData.id};
    })
    .catch(error => {
      console.error(error);
    });

  const itemPromise = fetch(`https://pokeapi.co/api/v2/item/${input}/`)
    .then(response => response.json())
    .then(itemData => {
      return {name: itemData.name, id: itemData.id};
    })
    .catch(error => {
      console.error(error);
    });

  Promise.all([movePromise, pokemonPromise, locationPromise, itemPromise])
    .then(([move, pokemon, location, item]) => {
      const suggestionsDropdown = document.getElementById('suggestionsDropdown');
      suggestionsDropdown.innerHTML = '';
      suggestionsDropdown.style.display = 'none';
      const suggestions = [move, pokemon, location, item];
      suggestions.forEach(suggestion => {
        if (suggestion) {
          suggestionsDropdown.style.display = 'flex'
          console.log(suggestionsDropdown.style.display)
          const suggestionItem = document.createElement('li');
          const {name, id} = suggestion;
          console.log(suggestion)
          if (suggestion === item) {
            suggestionItem.classList.add('item')
          } else if (suggestion === move) {
            suggestionItem.classList.add('move')
          } else if (suggestion === pokemon) {
            suggestionItem.classList.add('pokemon')
          } else if (suggestion === location) {
            suggestionItem.classList.add('location')
          }
          suggestionItem.textContent = name;
          suggestionsDropdown.appendChild(suggestionItem)
          suggestionItem.addEventListener('click', () => {
            if (suggestionItem.classList.contains('item')) {
              window.location.href = `/sdi-blended-project1-scaffold/sitePages/itemsPage/itemsPage.html?search=${suggestion.id}`;
            } else if (suggestionItem.classList.contains('move')) {
              window.location.href = `/sdi-blended-project1-scaffold/sitePages/movesPage/movesPage.html?search=${suggestion.id}`;
            } else if (suggestionItem.classList.contains('pokemon')) {
              window.location.href = `/sdi-blended-project1-scaffold/sitePages/pokemonPage/pokemonPage.html?search=${suggestion.id}`;
            } else if (suggestionItem.classList.contains('location')) {
              window.location.href = `/sdi-blended-project1-scaffold/sitePages/locationsPage/locationsPage.html?search=${suggestion.id}`;
            }
          });
        }
      })
    })
}