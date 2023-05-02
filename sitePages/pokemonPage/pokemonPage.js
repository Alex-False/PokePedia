// Function to fetch and add background sprites for a given number of Pokemon
function pokemonCaller(numOfPokemon) {
  let currentIndex = 1;
  const batchSize = 50;

  const loadBatch = () => {
    const pokemonPromises = [];
    for (let i = currentIndex; i < currentIndex + batchSize && i < numOfPokemon; i++) {
      pokemonPromises.push(pokemon(i));
    }

    Promise.all(pokemonPromises)
      .then(pokemonResonses => {
        const sortedResponses = pokemonResonses.sort((a, b) => a.id - b.id);

        sortedResponses.forEach(response => {
          addSpritesToBackground(response.imageURL, response.id, response.name, response.type, response.flavor, response.baseStats, response.evolutionNames, response.firstEvolution, response.capture, response.gender, response.growth, response.legendary, response.mythical, response.exp, response.games);
        });
      })
      .catch(error => {
        console.error(error);
      });

    currentIndex += batchSize;
    if (currentIndex >= numOfPokemon) {
      clearInterval(intervalId);
    }
  };

  const intervalId = setInterval(loadBatch, 100);
}

// Function to extract evolution names from the evolution chain
function extractEvolutionNames(chain, first) {
  const evolutionNames = [];
  chain.evolves_to.forEach(evolution => {
    evolutionNames.push(evolution.species.name);
    evolutionNames.push(...extractEvolutionNames(evolution));
  });
  return evolutionNames;
}

// Function to fetch Pokemon data and return a promise
function pokemon(pokeNum) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}/`)
    .then(response => response.json())
    .then(data => {
      const spriteID = data.id;
      const spriteName = data.name;
      const spriteImageURL = data.sprites.front_default;
      const spriteTypes = data.types.map(type => type.type.name);
      const spriteTypesString = spriteTypes.join(", ");
      const baseExp = data.base_experience;
      const gameAppearence = data.game_indices.map(game => game.version.name.replace(/-/g,' ').toUpperCase());
      const spriteBaseStats = data.stats.map(stat => {
        return {
          name: stat.stat.name,
          value: stat.base_stat,
        };

      });

      return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeNum}/`)
        .then(response => response.json())
        .then(speciesData => {
          const evolutionChainID = speciesData.evolution_chain.url.split("/")[6];
          const captureRate = speciesData.capture_rate
          const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text;
          const cleanedText = flavorText.replace(/[^\w\s\n]/g, '').replace(/\f/g, ' ');
          const genderRate = speciesData.gender_rate
          const growthRate = speciesData.growth_rate
          const isLegendary = speciesData.is_legendary
          const isMythical = speciesData.is_mythical


          return fetch(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChainID}/`)
            .then(response => response.json())
            .then(evolutionData => {
              const firstEvolution = evolutionData.chain.species.name;
              const evolutionNames = extractEvolutionNames(evolutionData.chain);
              evolutionNames.unshift(firstEvolution);

              return {
                id: spriteID,
                name: spriteName,
                imageURL: spriteImageURL,
                type: spriteTypesString,
                flavor: cleanedText,
                baseStats: spriteBaseStats,
                evolutionNames: evolutionNames,
                firstEvolution: firstEvolution,
                capture: captureRate,
                gender: genderRate,
                growth: growthRate,
                legendary: isLegendary,
                mythical: isMythical,
                exp: baseExp,
                games : gameAppearence,
              };
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to add sprites and their details to the background
function addSpritesToBackground(imageURL, id, name, type, flavor, baseStats, evolutionNames, firstEvolution, capture, gender, growth, legendary, mythical, exp, games) {
  let backgroundElement = document.querySelector('.pp__pokemonPageContainer');
  let spriteElement = document.createElement('div');

  let idTextObj = document.createElement('p');
  let idText = document.createTextNode(`Pokedéx Id: ${id}`);
  idTextObj.appendChild(idText);

  let nameTextObj = document.createElement('p');
  const cleanName = name.replace(/-/g, ' ').toUpperCase()
  let nameText = document.createTextNode(`Name: ${cleanName}`);
  nameTextObj.appendChild(nameText);

  let typeTextObj = document.createElement('p');
  const cleanType = type.toUpperCase()
  let typeText = document.createTextNode(`Type: ${cleanType}`);
  typeTextObj.appendChild(typeText);

  let spriteImg = document.createElement('img');

  spriteElement.classList.add('sprite', `${id}`, `${name}`);

  const sanitizedType = type.replace(/\s/g, "");
  spriteElement.classList.add(`${sanitizedType}`);

  spriteImg.src = imageURL;
  backgroundElement.appendChild(spriteElement);
  spriteElement.appendChild(spriteImg);
  spriteElement.appendChild(idTextObj);
  spriteElement.appendChild(nameTextObj);
  spriteElement.appendChild(typeTextObj);


  spriteElement.addEventListener('click', () => {
    createDynamicPage(imageURL, id, cleanName, type, flavor, baseStats, evolutionNames, firstEvolution, capture, gender, growth, legendary, mythical, exp, games);
  });
}

// Function to go back to the search page
function backToSearch() {
  const urlQuery = new URLSearchParams(window.location.search);
  const fromSearch = urlQuery.get('search');
  if (fromSearch) {
    window.location.href = `/sdi-blended-project1-scaffold/sitePages/pokemonPage/pokemonPage.html`;

  } else {
    location.reload();

  }

}

// Function to create a dynamic page for a Pokemon with detailed information
function createDynamicPage(imageURL, id, name, type, flavor, baseStats, evolutionNames, firstEvolution, capture, gender, growth, legendary, mythical, exp, games) {
  const seachBar = document.querySelector('.pp__pokemonPageHeader-searchBar');
  seachBar.style.display = 'none';

  const popOuts = document.getElementById('searchInput');
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

  const idTextObj = document.createElement('p');
  const idText = document.createTextNode(`Pokedéx Id: ${id}`);
  idTextObj.appendChild(idText);

  const typeTextObj = document.createElement('p');
  const typeText = document.createTextNode(`Type: ${type}`);
  typeTextObj.appendChild(typeText);

  const spriteImg = document.createElement('img');
  spriteImg.src = imageURL;

  const flavorTextObj = document.createElement('p');
  const flavorText = document.createTextNode(`Flavor Text: ${flavor}`);
  flavorTextObj.appendChild(flavorText);

  const baseStatsObj = document.createElement('p');
  const baseStatsArray = baseStats.map(stat => `${stat.name.toUpperCase()}: ${stat.value}`).join(', ');
  const baseStatsText = document.createTextNode(`Base stats: ${baseStatsArray}`);
  baseStatsObj.appendChild(baseStatsText);

  const evolutionsObj = document.createElement('p');
  const evolutionsArray = evolutionNames.map(evolution => `${evolution.toUpperCase()}`).join(', ');
  const evolutionsText = document.createTextNode(`Evolution Chain: ${evolutionsArray}`);
  evolutionsObj.appendChild(evolutionsText);

  const expObj = document.createElement('p');
  const expText = document.createTextNode(`Base Experience: ${exp}`);
  expObj.appendChild(expText);

  const captureRateObj = document.createElement('p');
  const captureRateText = document.createTextNode(`Capture Rate: ${capture}`);
  captureRateObj.appendChild(captureRateText);

  const genderRateObj = document.createElement('p');
  const genderRateText = document.createTextNode(`Gender Rate: ${gender}`);
  genderRateObj.appendChild(genderRateText);

  const growthRateObj = document.createElement('p');
  const growthRateText = document.createTextNode(`Growth Rate: ${growth.name}`);
  growthRateObj.appendChild(growthRateText);

  const isLegendaryObj = document.createElement('p');
  const isLegendaryText = document.createTextNode(`Is Legendary: ${legendary}`);
  isLegendaryObj.appendChild(isLegendaryText);

  const isMythicalObj = document.createElement('p');
  const isMythicalText = document.createTextNode(`Is Mythical: ${mythical}`);
  isMythicalObj.appendChild(isMythicalText);

  const gamesContainer = document.createElement('div');
  gamesContainer.classList.add('attributes');
  const gamesHeader = document.createElement('h3');
  const gamesHeaderText = document.createTextNode('Game Appearances:');
  gamesHeader.appendChild(gamesHeaderText);
  gamesContainer.appendChild(gamesHeader);

  games.forEach(games => {
    const gamesObj = document.createElement('p');
    const gamesText = document.createTextNode(`${games}`);
    gamesObj.appendChild(gamesText);
    gamesContainer.appendChild(gamesObj);
  })

  const backButton = document.createElement('input');
  backButton.type = 'button';
  backButton.classList.add('backButton');
  backButton.value = 'Back';
  backButton.onclick = backToSearch;


  spritesDivs.forEach(sprite => {
    sprite.remove();
  });

  const oldContainer = document.querySelector('.pp__pokemonPageContainer');
  if (oldContainer) {
    oldContainer.remove();
  }

  scroll(0,0)

  headerContainer.appendChild(nameObj);
  detailContainer.appendChild(spriteImg);
  detailContainer.appendChild(idTextObj);
  detailContainer.appendChild(typeTextObj);
  detailContainer.appendChild(flavorTextObj);
  detailContainer.appendChild(baseStatsObj);
  detailContainer.appendChild(evolutionsObj);
  detailContainer.appendChild(captureRateObj);
  detailContainer.appendChild(expObj);
  detailContainer.appendChild(genderRateObj);
  detailContainer.appendChild(growthRateObj);
  detailContainer.appendChild(isLegendaryObj);
  detailContainer.appendChild(isMythicalObj);
  detailContainer.appendChild(gamesContainer);
  detailContainer.appendChild(backButton);

  containerElement.appendChild(headerContainer);
  containerElement.appendChild(detailContainer);
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

