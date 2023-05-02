function locationCaller(numOfLocations) {
  let currentIndex = 1;
  const batchSize = 50;

  const loadBatch = () => {
    const locationPromises = [];
    for (let i = currentIndex; i < currentIndex + batchSize && i <= numOfLocations; i++) {
      locationPromises.push(fetchLocation(i));
    }

    Promise.all(locationPromises)
      .then(locationResponses => {
        locationResponses.forEach(response => {
          addSpritesToBackground(response.name, response.region, response.encounters, response.pokemon);
        });
      })
      .catch(error => {
        console.error(error);
      });

    currentIndex += batchSize;
    if (currentIndex > numOfLocations) {
      clearInterval(intervalId);
    }
  };

  const intervalId = setInterval(loadBatch, 100);
}

function fetchLocation(locationId) {
  return fetch(`https://pokeapi.co/api/v2/location/${locationId}/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Location not found for ID ${locationId}`);
      }
      return response.json();
    })
    .then(data => {
      const locationName = data.name;
      const locationRegion = data.region.name;

      return fetch(`https://pokeapi.co/api/v2/location-area/${locationId}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Location area details not found for location ID ${locationId}`);
          }
          return response.json();
        })
        .then(data => {
          const encounterMethods = data.encounter_method_rates.map(method => method.encounter_method.name);
          const pokemonEncounters = data.pokemon_encounters.map(encounter => encounter.pokemon.name);

          return {
            name: locationName,
            region: locationRegion,
            encounters: encounterMethods,
            pokemon: pokemonEncounters,
          };
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
}

function addSpritesToBackground(name, region, encounters, pokemon) {
  let backgroundElement = document.querySelector('.pp__locationsPageContainer');
  let spriteElement = document.createElement('div');

  let nameTextObj = document.createElement('p');
  const cleanName = name.replace(/-/g, ' ').toUpperCase()
  let nameText = document.createTextNode(`Name: ${cleanName}`);

  let regionTextObj = document.createElement('p');
  const cleanRegion = region.toUpperCase()
  let regionText = document.createTextNode(`Region: ${cleanRegion}`);

  spriteElement.classList.add('sprite', `${region}`, `${name}`);

  backgroundElement.appendChild(spriteElement);
  spriteElement.appendChild(nameTextObj);
  nameTextObj.appendChild(nameText);
  spriteElement.appendChild(regionTextObj);
  regionTextObj.appendChild(regionText);

  spriteElement.addEventListener('click', () => {
    createDynamicPage(cleanName, region, encounters, pokemon);
  });
}

function createDynamicPage(name, region, encounters, pokemon) {
  let searchBar = document.querySelector('.pp__locationsPageHeader-searchBar');
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

  const regionTextObj = document.createElement('p');
  const regionText = document.createTextNode(`This location is in the ${region} region!`);
  regionTextObj.appendChild(regionText);

  const backButton = document.createElement('input');
  backButton.type = 'button';
  backButton.classList.add('backButton');
  backButton.value = 'Back';
  backButton.onclick = backToSearch;

  spritesDivs.forEach(sprite => {
    sprite.remove();
  });

  const oldContainer = document.querySelector('.pp__locationsPageContainer');
  if (oldContainer) {
    oldContainer.remove();
  }

  scroll(0,0)

  headerContainer.appendChild(nameObj);
  containerElement.appendChild(headerContainer);
  detailContainer.appendChild(regionTextObj);
  containerElement.appendChild(detailContainer);

  const encounterMethodsContainer = document.createElement('div');
  encounterMethodsContainer.classList.add('encounter');
  const encounterTitle = document.createElement('h2');
  encounterTitle.textContent = 'Encounter Methods:';
  encounterMethodsContainer.appendChild(encounterTitle);

  encounters.forEach(encounter => {
    const methodName = document.createElement('p');
    methodName.textContent = encounter.replace(/-/g, ' ').toUpperCase();
    encounterMethodsContainer.appendChild(methodName);
  });

  const pokemonEncountersContainer = document.createElement('div');
  pokemonEncountersContainer.classList.add('encounter');
  const pokemonTitle = document.createElement('h2');
  pokemonTitle.textContent = 'Pokémon Encounters:';
  pokemonEncountersContainer.appendChild(pokemonTitle);

  pokemon.forEach(pokemonName => {
    const pokemonNameObj = document.createElement('p');
    pokemonNameObj.textContent = pokemonName.replace(/-/g, ' ').toUpperCase();
    pokemonEncountersContainer.appendChild(pokemonNameObj);
  });

  detailContainer.appendChild(encounterMethodsContainer);
  detailContainer.appendChild(pokemonEncountersContainer);
  detailContainer.appendChild(backButton);
}

locationCaller(1006);

function backToSearch() {

  location.reload();
}

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
    const pokemonId = Number(fromSearch);
    pokemon(pokemonId).then(response => {
      addSpritesToBackground(response.imageURL, response.id, response.name, response.type, response.flavor, response.baseStats, response.evolutionNames, response.firstEvolution, response.capture, response.gender, response.growth, response.legendary, response.mythical, response.exp, response.games);
      createDynamicPage(response.imageURL, response.id, response.name, response.type, response.flavor, response.baseStats, response.evolutionNames, response.firstEvolution, response.capture, response.gender, response.growth, response.legendary, response.mythical, response.exp, response.games);
    });

  } else {

    // Call the pokemonCaller function with the number of pokemon to fetch and add
    pokemonCaller(1009);

  }
}