// Function to fetch and add background placeholders for a given number of moves
function movesCaller(numOfMoves) {
  let currentIndex = 1;
  const batchSize = 50;

  const loadBatch = () => {
    const movesPromises = [];
    for (let i = currentIndex; i < currentIndex + batchSize && i <= numOfMoves; i++) {
      movesPromises.push(fetchMoves(i));
    }

    Promise.all(movesPromises)
      .then(spriteResponses => {
        spriteResponses.forEach(response => {
          addSpritesToBackground(response.id, response.name, response.damageClass, response.accuracy, response.power, response.pp, response.type, response.effect, response.shortEffect, response.pokemonNames, response.flavor);
        });
      })
      .catch(error => {
        console.error(error);
      });

    currentIndex += batchSize;
    if (currentIndex > numOfMoves) {
      clearInterval(intervalId);
    }
  };

  const intervalId = setInterval(loadBatch, 100);
}

// Function to fetch move data and return a promise
function fetchMoves(moveId) {
  return fetch(`https://pokeapi.co/api/v2/move/${moveId}/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Move not found for ID ${moveId}`);
      }
      return response.json();
    })
    .then(data => {
      const moveId = data.id;
      const moveName = data.name;
      const damageClass = data.damage_class.name;
      const accuracy = data.accuracy;
      const power = data.power;
      const pp = data.pp;
      const typeName = data.type.name;
      const effect = data.effect_entries[0].effect;
      const shortEffect = data.effect_entries[0].short_effect;
      const pokemonNames = data.learned_by_pokemon.map(pokemon => pokemon.name);
      const flavorText = data.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text;
      const cleanedText = flavorText.replace(/[^\w\s\n]/g, '').replace(/\f/g, ' ');

      return {
        id: moveId,
        name: moveName,
        damageClass: damageClass,
        accuracy: accuracy,
        power: power,
        pp: pp,
        type: typeName,
        effect: effect,
        shortEffect: shortEffect,
        pokemonNames: pokemonNames,
        flavor: cleanedText,
      };
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to add details to the background
function addSpritesToBackground(id, name, damageClass, accuracy, power, pp, type, effect, shortEffect, pokemonNames, flavor) {
  let backgroundElement = document.querySelector('.pp__movesPageContainer');
  let spriteElement = document.createElement('div');

  let nameTextObj = document.createElement('p');
  const cleanName = name.replace(/-/g, ' ').toUpperCase()
  let nameText = document.createTextNode(`Name: ${cleanName}`);
  nameTextObj.appendChild(nameText);

  let typeTextObj = document.createElement('p');
  const cleanType = type.replace(/-/g, ' ').toUpperCase()
  let typeText = document.createTextNode(`Type: ${cleanType}`);
  typeTextObj.appendChild(typeText);

  spriteElement.classList.add('sprite', `${name}`, `${type}`);

  backgroundElement.appendChild(spriteElement);
  spriteElement.appendChild(nameTextObj);
  spriteElement.appendChild(typeTextObj);


  spriteElement.addEventListener('click', () => {
    createDynamicPage(cleanName, damageClass, accuracy, power, pp, type, effect, shortEffect, pokemonNames, flavor);
  });
}

// Function to create a dynamic page for a moves with detailed information
function createDynamicPage(name, damageClass, accuracy, power, pp, type, effect, shortEffect, pokemonNames, flavor) {
  let searchBar = document.querySelector('.pp__movesPageHeader-searchBar');
  searchBar.style.display = 'none';

  let popOuts = document.getElementById('searchInput');
  popOuts.style.display = 'none';

  const spritesDivs = document.querySelectorAll('.sprite');
  const containerElement = document.querySelector('body');

  const detailContainer = document.createElement('div');
  detailContainer.classList.add('details');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('details');
  headerContainer.classList.add('details-header');

  const nameObj = document.createElement('h1');
  const nameText = document.createTextNode(name.toUpperCase());
  nameObj.appendChild(nameText);

  const flavorTextObj = document.createElement('p');
  const flavorText = document.createTextNode(`${flavor}`);
  flavorTextObj.appendChild(flavorText);

  const effectTextObj = document.createElement('p');
  const effectText = document.createTextNode(`Effect: ${effect}`);
  effectTextObj.appendChild(effectText);

  const attributesContainer = document.createElement('div');
  attributesContainer.classList.add('attributes');
  const attributesHeader = document.createElement('h3');
  const attributesHeaderText = document.createTextNode('Attributes:');
  attributesHeader.appendChild(attributesHeaderText);
  attributesContainer.appendChild(attributesHeader);

  const pokemonContainer = document.createElement('div');
  pokemonContainer.classList.add('attributes');
  const pokemonHeader = document.createElement('h3');
  const pokemonHeaderText = document.createTextNode('Pokémon with Move Compatibility:');
  pokemonHeader.appendChild(pokemonHeaderText);
  pokemonContainer.appendChild(pokemonHeader);

  pokemonNames.forEach(pokemonNames => {
    const pokemonObj = document.createElement('p');
    const pokemonText = document.createTextNode(`${pokemonNames.replace(/-/g, ' ').toUpperCase()}`);
    pokemonObj.appendChild(pokemonText);
    pokemonContainer.appendChild(pokemonObj);
  })

  const damageClassObj = document.createElement('p');
  const damageClassText = document.createTextNode(`Damage Class: ${damageClass}`);
  damageClassObj.appendChild(damageClassText);
  attributesContainer.appendChild(damageClassObj);

  const accuracyObj = document.createElement('p');
  const accuracyText = document.createTextNode(`Accuracy: ${accuracy}`);
  accuracyObj.appendChild(accuracyText);
  attributesContainer.appendChild(accuracyObj);

  const powerObj = document.createElement('p');
  const powerText = document.createTextNode(`Power: ${power}`);
  powerObj.appendChild(powerText);
  attributesContainer.appendChild(powerObj);

  const ppObj = document.createElement('p');
  const ppText = document.createTextNode(`PP: ${pp}`);
  ppObj.appendChild(ppText);
  attributesContainer.appendChild(ppObj);

  const typeObj = document.createElement('p');
  const typeText = document.createTextNode(`Type: ${type}`);
  typeObj.appendChild(typeText);
  attributesContainer.appendChild(typeObj);

  const backButton = document.createElement('input');
  backButton.type = 'button';
  backButton.classList.add('backButton');
  backButton.value = 'Back';
  backButton.onclick = backToSearch;

  spritesDivs.forEach(sprite => {
    sprite.remove();
  });

  const oldContainer = document.querySelector('.pp__movesPageContainer');
  if (oldContainer) {
    oldContainer.remove();
  }

  scroll(0,0)

  headerContainer.appendChild(nameObj);
  detailContainer.appendChild(flavorTextObj);
  detailContainer.appendChild(effectTextObj);
  detailContainer.appendChild(attributesContainer);
  detailContainer.appendChild(pokemonContainer);
  detailContainer.appendChild(backButton);

  containerElement.appendChild(headerContainer);
  containerElement.appendChild(detailContainer);
}

// Call the movesCaller function with the number of moves to fetch and add
movesCaller(1000);

// Function to go back to the search page
function backToSearch() {
  location.reload();
}

// Function to toggle the visibility of the search input pop-out
function popOut() {
  let popOuts = document.getElementById('searchInput');

  if (popOuts.style.display === 'block') {
    popOuts.style.display = 'none';
    popOuts.classList.remove('open');
  } else {
    popOuts.style.display = 'block';
    popOuts.classList.add('open');
  }
}

// Function to filter the search bar based on user input
function searchBarFilter() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toUpperCase();
  const spriteElements = document.querySelectorAll('.sprite');

  spriteElements.forEach(sprite => {
    const id = sprite.classList[1];
    const name = sprite.classList[2];
    const type = sprite.classList[3];

    const searchData = [id, name, type].join(' ').toUpperCase();
    if (searchData.indexOf(filter) > -1) {
      sprite.style.display = '';
    } else {
      sprite.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fromMainPageSearch();
});

function fromMainPageSearch() {
  const urlQuery = new URLSearchParams(window.location.search);
  const fromSearch = urlQuery.get('search');
  if (fromSearch) {

    // Call the pokemonCaller function with the number of pokemon to fetch and add
    const moveId = Number(fromSearch);
    fetchMoves(moveId).then(response => {
      addSpritesToBackground(response.id, response.name, response.damageClass, response.accuracy, response.power, response.pp, response.type, response.effect, response.shortEffect, response.pokemonNames, response.flavor);
      createDynamicPage(response.id, response.name, response.damageClass, response.accuracy, response.power, response.pp, response.type, response.effect, response.shortEffect, response.pokemonNames, response.flavor);
    });

  } else {
    // Call the pokemonCaller function with the number of pokemon to fetch and add
    movesCaller(1009);
  }
}